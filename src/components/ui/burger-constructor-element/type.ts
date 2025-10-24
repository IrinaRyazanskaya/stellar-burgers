import type { ConstructorIngredient } from "../../../utils/types";

export type BurgerConstructorElementUIProps = {
  ingredient: ConstructorIngredient;
  index: number;
  totalItems: number;
  handleMoveUp: () => void;
  handleMoveDown: () => void;
  handleClose: () => void;
};
