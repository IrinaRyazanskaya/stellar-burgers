import type { FC } from "react";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { burgerAPIClient } from "../../clients/burger-api";
import { ForgotPasswordUI } from "../../components/ui/pages/forgot-password";

const ForgotPassword: FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<Error | null>(null);

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(null);
    burgerAPIClient
      .forgotPassword({ email })
      .then(() => {
        localStorage.setItem("resetPassword", "true");
        navigate("/reset-password", { replace: true });
      })
      .catch((err) => setError(err));
  };

  return (
    <ForgotPasswordUI
      errorText={error?.message}
      email={email}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
    />
  );
};

ForgotPassword.displayName = "ForgotPassword";

export { ForgotPassword };
