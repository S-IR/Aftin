// hooks/useUserTier.ts
import { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { User } from "firebase/auth";
import { LoginStatus } from "../typings/typings";

export const useUserTier = (
  user: User | null | undefined,
  userLoading: boolean
): LoginStatus => {
  const [subscriptionStatus, setSubscriptionStatus] =
    useState<LoginStatus>("not logged in");

  useEffect(() => {
    if (!userLoading && user) {
      user
        .getIdTokenResult()
        .then((idTokenResult) => {
          console.log("idTokenResults claims", idTokenResult.claims);

          const status = idTokenResult.claims.tier as LoginStatus;
          setSubscriptionStatus(status);
        })
        .catch(() => setSubscriptionStatus("unauthorized"));
    }
  }, [userLoading, user]);

  return subscriptionStatus;
};
