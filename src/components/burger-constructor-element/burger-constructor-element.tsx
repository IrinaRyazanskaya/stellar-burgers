import { memo } from "react";
import type { FC } from "react";

import { BurgerConstructorElementUI } from "../../components/ui/burger-constructor-element";
import {
  moveIngredientDownInConstructor,
  moveIngredientUpInConstructor,
  removeIngredientFromConstructor,
} from "../../services/slices/burger-constructor";
import { useDispatch } from "../../services/store";
import { BurgerConstructorElementProps } from "./type";

const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      dispatch(moveIngredientDownInConstructor(index));
    };

    const handleMoveUp = () => {
      dispatch(moveIngredientUpInConstructor(index));
    };

    const handleClose = () => {
      dispatch(removeIngredientFromConstructor(ingredient.id));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  },
);

BurgerConstructorElement.displayName = "BurgerConstructorElement";

export { BurgerConstructorElement };
