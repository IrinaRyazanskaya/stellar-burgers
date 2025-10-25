import type { FC } from "react";

import { BurgerConstructor } from "../../../burger-constructor";
import { BurgerIngredients } from "../../../burger-ingredients";
import { Preloader } from "../../preloader";

import styles from "./constructor-page.module.css";

type ConstructorPageUIProps = {
  isIngredientsLoading: boolean;
};

const ConstructorPageUI: FC<ConstructorPageUIProps> = ({ isIngredientsLoading }) => (
  <>
    {isIngredientsLoading ? (
      <Preloader />
    ) : (
      <main className={styles.containerMain}>
        <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
          Соберите бургер
        </h1>
        <div className={`${styles.main} pl-5 pr-5`}>
          <BurgerIngredients />
          <BurgerConstructor />
        </div>
      </main>
    )}
  </>
);

ConstructorPageUI.displayName = "ConstructorPageUI";

export { ConstructorPageUI };
export type { ConstructorPageUIProps };
