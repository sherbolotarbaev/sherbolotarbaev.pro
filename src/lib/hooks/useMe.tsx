import React from "react";
import { UserContext } from "../providers/UserProvider";

export function useMe() {
  const userState = React.useContext(UserContext);
  return userState;
}
