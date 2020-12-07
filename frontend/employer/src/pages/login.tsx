import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { Button } from "../components/button";
import { FormError } from "../components/form-error";
import { LOCALSTORAGE_TOKEN } from "../constants";
import {
  loginMutation,
  loginMutationVariables,
} from "../__generated__/loginMutation";

const LOGIN_MUTATION = gql`
    mutation loginMutation($loginInput: LoginInput!) {
        login(input: $loginInput) {
            ok
            token
            error
        }
    }
`;

interface ILoginForm {
  email: string;
  password: string;
}

export const Login = () => {
  const {
    register,
    getValues,
    errors,
    handleSubmit,
    formState,
  } = useForm<ILoginForm>({
    mode: "onChange",
  });
  const onCompleted = (data: loginMutation) => {
    const {
      login: { ok, token },
    } = data;
    if (ok && token) {
      localStorage.setItem(LOCALSTORAGE_TOKEN, `Bearer ${token}`);
      authTokenVar(`Bearer ${token}`);
      isLoggedInVar(true);
    }
  };
  const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
    loginMutation,
    loginMutationVariables
    >(LOGIN_MUTATION, {
    onCompleted,
  });
  const onSubmit = () => {
    if (!loading) {
      const { email, password } = getValues();
      loginMutation({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
    }
  };
  return (
    <div className="bg-gray-200 pt-16 pb-32">
      <Helmet>
        <title>Login | Ute Recruitment</title>
      </Helmet>
      <div className="mx-auto w-2/5">
        <h3 className="py-2 px-4 bg-gray-100">Login</h3>
        <div className="bg-white py-10 px-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-5">
              <input
                ref={register({
                  required: "Email is required",
                  pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}
                required
                name="email"
                type="email"
                placeholder="Email"
                className="focus:outline-none border px-3 py-2 w-full rounded-sm focus:border-gray-600"
              />
              {errors.email?.message && (
                <FormError errorMessage={errors.email?.message} />
              )}
              {errors.email?.type === "pattern" && (
                <FormError errorMessage={"Please enter a valid email"} />
              )}
              <input
                ref={register({ required: "Password is required" })}
                name="password"
                required
                type="password"
                placeholder="Password"
                className="focus:outline-none border px-3 py-2 w-full rounded-sm focus:border-gray-600"
              />
              {errors.password?.message && (
                <FormError errorMessage={errors.password?.message} />
              )}
              <Button
                canClick={formState.isValid}
                loading={loading}
                actionText={"Login"}
              />
              {loginMutationResult?.login.error && (
                <FormError errorMessage={loginMutationResult.login.error} />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
};
