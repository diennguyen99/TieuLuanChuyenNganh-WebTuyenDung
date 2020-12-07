import React from "react";
import {gql, useMutation} from "@apollo/client";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import {
  createChargeMutation,
  createChargeMutationVariables,
} from "../__generated__/createChargeMutation";

const CREATE_CHARGE_MUTATION = gql`
    mutation createChargeMutation($createChargeInput: CreateChargeInput!) {
        createCharge(input: $createChargeInput) {
            ok
            client_secret
            error
        }
    }
`;

export const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [createChargeMutation, { data: createChargeMutationResult, loading }] = useMutation<
    createChargeMutation,
    createChargeMutationVariables
    >(CREATE_CHARGE_MUTATION);

  const handleSubmit = async (event: any) => {

    event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement!,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log(paymentMethod?.id!);
      await createChargeMutation({
        variables: {
          createChargeInput: {
            email: 'dienktvn0@gmail.com',
            amount: 1099,
            token: paymentMethod?.id!,
          }
        }
      })
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
}
