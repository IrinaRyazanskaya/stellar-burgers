import { forwardRef } from "react";

import { BurgerIngredient } from "../../burger-ingredient";
import type { Ingredient } from "../../../utils/types";

import styles from "./ingredients-category.module.css";

type IngredientsCategoryUIProps = {
  title: string;
  titleRef: React.RefObject<HTMLHeadingElement>;
  ingredients: Ingredient[];
  ingredientsCounters: Record<string, number>;
};

const IngredientsCategoryUI = forwardRef<HTMLUListElement, IngredientsCategoryUIProps>(
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
export type { IngredientsCategoryUIProps };
