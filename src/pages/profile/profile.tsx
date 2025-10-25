import type { ChangeEvent, FC, FormEvent } from "react";
import { useMemo, useState } from "react";

import { ProfileUI } from "../../components/ui/pages/profile";
import { selectUpdateError, selectUser, updateUser } from "../../services/slices/profile";
import { useDispatch, useSelector } from "../../services/store";

type FormValue = {
  name: string;
  email: string;
  password: string;
};

type FormDraft = Partial<Omit<FormValue, "password">> & {
  password: string;
};

const Profile: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const updateUserError = useSelector(selectUpdateError) || undefined;

  const normalizedUser = useMemo(
    () => ({
      name: user?.name ?? "",
      email: user?.email ?? "",
    }),
    [user?.name, user?.email],
  );

  const [formDraft, setFormDraft] = useState<FormDraft>({
    password: "",
  });

  const formValue = useMemo<FormValue>(
    () => ({
      name: formDraft.name ?? normalizedUser.name,
      email: formDraft.email ?? normalizedUser.email,
      password: formDraft.password,
    }),
    [formDraft, normalizedUser],
  );

  const isFormChanged =
    formValue.name !== normalizedUser.name ||
    formValue.email !== normalizedUser.email ||
    !!formValue.password;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(
      updateUser({
        name: formValue.name,
        email: formValue.email,
        password: formValue.password,
      }),
    );
    setFormDraft((prevState) => ({
      ...prevState,
      password: "",
    }));
  };

  const handleCancel = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormDraft({
      password: "",
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormDraft((prevState) => {
      if (name === "password") {
        return {
          ...prevState,
          password: value,
        };
      }

      if (name === "name") {
        return {
          ...prevState,
          name: value,
        };
      }

      if (name === "email") {
        return {
          ...prevState,
          email: value,
        };
      }

      return prevState;
    });
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      updateUserError={updateUserError}
    />
  );
};

Profile.displayName = "Profile";

export { Profile };
