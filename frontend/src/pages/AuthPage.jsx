import React from "react";
import SignupCard from "../components/SignupCard";
import Login from "../components/Login";
import { useRecoilValue } from "recoil";
import authScreenAtom from "../atoms/AuthAtom";

const AuthPage = () => {
  const authScreenState = useRecoilValue(authScreenAtom);
  console.log(authScreenState);
  return <>{authScreenState === "login" ? <Login /> : <SignupCard />}</>;
};

export default AuthPage;
