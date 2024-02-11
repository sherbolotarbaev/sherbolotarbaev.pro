import React from "react";
import { UserContext } from "../providers/UserProvider";

export const useMe = () => {
  const userState = React.useContext(UserContext);
  return userState;
};
