import type { FC, FormEvent } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { LoginUI } from "../../components/ui/pages/login";
import {
  clearLoginStatus,
  loginUser,
  selectLoginError,
  selectLoginStatus,
} from "../../services/slices/profile";
import { useDispatch, useSelector } from "../../services/store";

const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginError = useSelector(selectLoginError) || undefined;
  const requestStatus = useSelector(selectLoginStatus);

  useEffect(() => {
    if (requestStatus === "succeeded") {
      navigate("/");
      dispatch(clearLoginStatus());
    }
  }, [requestStatus, navigate, dispatch]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      loginUser({
        email,
        password,
      }),
    );
  };

  return (
    <LoginUI
      errorText={loginError}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};

Login.displayName = "Login";

export { Login };
