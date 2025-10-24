import type { FC, Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { Input, Button, PasswordInput } from "@zlden/react-developer-burger-ui-components";

import { PageUIProps } from "../common-type";

import styles from "../common.module.css";

type RegisterUIProps = PageUIProps & {
  password: string;
  userName: string;
  setPassword: Dispatch<SetStateAction<string>>;
  setUserName: Dispatch<SetStateAction<string>>;
};

const RegisterUI: FC<RegisterUIProps> = ({
  errorText,
  email,
  setEmail,
  handleSubmit,
  password,
  setPassword,
  userName,
  setUserName,
}) => (
  <main className={styles.container}>
    <div className={`pt-6 ${styles.wrapCenter}`}>
      <h3 className="pb-6 text text_type_main-medium">Регистрация</h3>
      <form className={`pb-15 ${styles.form}`} name="register" onSubmit={handleSubmit}>
        <>
          <div className="pb-6">
            <Input
              type="text"
              placeholder="Имя"
              value={userName}
              name="name"
              error={false}
              errorText=""
              size="default"
              autoComplete="name"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="pb-6">
            <Input
              type="email"
              placeholder="E-mail"
              value={email}
              name={"email"}
              error={false}
              errorText=""
              size={"default"}
              autoComplete="email"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="pb-6">
            <PasswordInput
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              name="password"
              autoComplete="new-password"
            />
          </div>
          <div className={`pb-6 ${styles.button}`}>
            <Button type="primary" size="medium" htmlType="submit">
              Зарегистрироваться
            </Button>
          </div>
          {errorText && (
            <p className={`${styles.error} text text_type_main-default pb-6`}>{errorText}</p>
          )}
        </>
      </form>
      <div className={`${styles.question} text text_type_main-default pb-6`}>
        Уже зарегистрированы?
        <Link to="/login" className={`pl-2 ${styles.link}`}>
          Войти
        </Link>
      </div>
    </div>
  </main>
);

RegisterUI.displayName = "RegisterUI";

export { RegisterUI };
export type { RegisterUIProps };
