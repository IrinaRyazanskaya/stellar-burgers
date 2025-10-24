import type { FC, FormEvent } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { RegisterUI } from "../../components/ui/pages/register";
import {
  clearRegisterStatus,
  registerUser,
  selectRegisterError,
  selectRegisterStatus,
} from "../../services/slices/profile";
import { useDispatch, useSelector } from "../../services/store";

const Register: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerError = useSelector(selectRegisterError) || undefined;
  const requestStatus = useSelector(selectRegisterStatus);

  useEffect(() => {
    if (requestStatus === "succeeded") {
      navigate("/");
      dispatch(clearRegisterStatus());
    }
  }, [requestStatus, navigate, dispatch]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      registerUser({
        name: userName,
        email,
        password,
      }),
    );
  };

  return (
    <RegisterUI
      errorText={registerError}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};

Register.displayName = "Register";

export { Register };
