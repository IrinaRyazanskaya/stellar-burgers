import type { Dispatch, FormEvent, SetStateAction } from "react";

type PageUIProps = {
  email: string;
  errorText: string | undefined;
  setEmail: Dispatch<SetStateAction<string>>;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

export type { PageUIProps };
