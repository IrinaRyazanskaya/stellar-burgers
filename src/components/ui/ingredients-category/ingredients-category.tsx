import { forwardRef } from "react";

import { BurgerIngredient } from "../../burger-ingredient";
import { TIngredientsCategoryUIProps } from "./type";

import styles from "./ingredients-category.module.css";

const IngredientsCategoryUI = forwardRef<HTMLUListElement, TIngredientsCategoryUIProps>(
  ({ title, titleRef, ingredients, ingredientsCounters }, ref) => (
    <>
      <h3 className="text text_type_main-medium mt-10 mb-6" ref={titleRef}>
        {title}
      </h3>
      <ul className={styles.items} ref={ref}>
        {ingredients.map((ingredient) => (
          <BurgerIngredient
            ingredient={ingredient}
            key={ingredient._id}
            count={ingredientsCounters[ingredient._id]}
          />
        ))}
      </ul>
    </>
  ),
);

IngredientsCategoryUI.displayName = "IngredientsCategoryUI";

export { IngredientsCategoryUI };
