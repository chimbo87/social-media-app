import { useRecoilValue, atom, RecoilRoot } from "recoil";
import LoginCard from "../components/LoginCard";
import SignupCard from "../components/SignupCard";


const authScreenAtom = atom({
  key: "authScreenAtom",
  default: "login",
});

const AuthPage = () => {
  const authScreenState = useRecoilValue(authScreenAtom);

  return <>{authScreenState === "login" ? <LoginCard /> : <SignupCard />}</>;
};


export default AuthPage;
