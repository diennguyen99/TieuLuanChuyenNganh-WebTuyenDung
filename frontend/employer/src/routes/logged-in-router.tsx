import React from "react";
import {BrowserRouter as Router, Link, Route, Switch, useRouteMatch} from "react-router-dom";

import { useMe } from "../hooks/useMe";
import { Services } from "../pages/services";
import { Packages } from "../pages/packages";
import { NotFound } from "../pages/404";
import {FindCandidateList} from "../pages/find-candidate/find-candidate-list";
import {FindCandidateCreate} from "../pages/find-candidate/find-candidate-create";
import {FindCandidateOpened} from "../pages/find-candidate/find-candidate-opened";
import {Checkout} from "../pages/checkout";

const FindCandidate = () => {
  const { path } = useRouteMatch();

  return (
    <div>
      <ul className="space-x-4 flex">
        <li>
          <Link to={`${path}`}>Index</Link>
        </li>
        <li>
          <Link to={`${path}/create`}>Create</Link>
        </li>
        <li>
          <Link to={`${path}/opened`}>Opened</Link>
        </li>
      </ul>
      <Route path={path} exact>
        <FindCandidateList />
      </Route>
      <Route path={`${path}/create`}>
        <FindCandidateCreate />
      </Route>
      <Route path={`${path}/opened`}>
        <FindCandidateOpened />
      </Route>
    </div>
  )
}

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();
  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }
  return (
    <Router>
      <ul>
        <li>
          <Link to='packages'>Packages</Link>
        </li>
      </ul>
      <Switch>
        <Route path="/resume-manager">
          <Services />
        </Route>
        <Route path="/find-candidate">
          <FindCandidate />
        </Route>
        <Route path="/job-manager">
          <Services />
        </Route>
        <Route path="/services">
          <Services />
        </Route>
        <Route path="/packages">
          <Packages />
        </Route>
        <Route path="/checkout">
          <Checkout />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
