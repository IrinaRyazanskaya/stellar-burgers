import type { FC } from "react";
import { NavLink } from "react-router-dom";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@zlden/react-developer-burger-ui-components";

import styles from "./app-header.module.css";

type AppHeaderUIProps = {
  userName: string | undefined;
};

const AppHeaderUI: FC<AppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <>
          <BurgerIcon type={"primary"} />
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text text_type_main-default ml-2 mr-10 ${styles.link} ${isActive ? styles.link_active : ""}`
            }
          >
            Конструктор
          </NavLink>
        </>
        <>
          <ListIcon type={"primary"} />
          <NavLink
            to="/feed"
            className={({ isActive }) =>
              `text text_type_main-default ml-2 ${styles.link} ${isActive ? styles.link_active : ""}`
            }
          >
            Лента заказов
          </NavLink>
        </>
      </div>
      <div className={styles.logo}>
        <Logo className="" />
      </div>
      <div className={styles.link_position_last}>
        <ProfileIcon type={"primary"} />
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `text text_type_main-default ml-2 ${styles.link} ${isActive ? styles.link_active : ""}`
          }
        >
          {userName || "Личный кабинет"}
        </NavLink>
      </div>
    </nav>
  </header>
);

AppHeaderUI.displayName = "AppHeaderUI";

export { AppHeaderUI };
export type { AppHeaderUIProps };
