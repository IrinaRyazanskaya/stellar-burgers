import type { FC, SyntheticEvent } from "react";
import { Button, Input } from "@zlden/react-developer-burger-ui-components";

import { ProfileMenu } from "../../../profile-menu";
import { ProfileUIProps } from "./type";

import commonStyles from "../common.module.css";
import styles from "./profile.module.css";

type ButtonClick = (e: SyntheticEvent) => void;

export const ProfileUI: FC<ProfileUIProps> = ({
  formValue,
  isFormChanged,
  updateUserError,
  handleSubmit,
  handleCancel,
  handleInputChange,
}) => (
  <main className={`${commonStyles.container}`}>
    <div className={`mt-30 mr-15 ${styles.menu}`}>
      <ProfileMenu />
    </div>
    <form className={`mt-30 ${styles.form} ${commonStyles.form}`} onSubmit={handleSubmit}>
      <>
        <div className="pb-6">
          <Input
            type={"text"}
            placeholder={"Имя"}
            value={formValue.name}
            name={"name"}
            error={false}
            errorText={""}
            size={"default"}
            icon={"EditIcon"}
            autoComplete="name"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            onChange={handleInputChange}
          />
        </div>
        <div className="pb-6">
          <Input
            type={"email"}
            placeholder={"E-mail"}
            value={formValue.email}
            name={"email"}
            error={false}
            errorText={""}
            size={"default"}
            icon={"EditIcon"}
            autoComplete="email"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            onChange={handleInputChange}
          />
        </div>
        <div className="pb-6">
          <Input
            type={"password"}
            placeholder={"Пароль"}
            value={formValue.password}
            name={"password"}
            error={false}
            errorText={""}
            size={"default"}
            icon={"EditIcon"}
            autoComplete="new-password"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            onChange={handleInputChange}
          />
        </div>
        {isFormChanged && (
          <div className={styles.button}>
            <Button
              type="secondary"
              htmlType="button"
              size="medium"
              onClick={handleCancel as ButtonClick}
            >
              Отменить
            </Button>
            <Button type="primary" size="medium" htmlType="submit">
              Сохранить
            </Button>
          </div>
        )}
        {updateUserError && (
          <p className={`${commonStyles.error} pt-5 text text_type_main-default`}>
            {updateUserError}
          </p>
        )}
      </>
    </form>
  </main>
);
