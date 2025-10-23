import type { FC } from "react";
import { useParams } from "react-router-dom";

import { Modal } from "../modal";
import { Preloader } from "../ui/preloader";
import { IngredientDetailsUI } from "../ui/ingredient-details";
import { selectIngredientById } from "../../services/slices/burger-ingredients";
import { useSelector } from "../../services/store";
import type { IngredientDetailsProps } from "./type";

export const IngredientDetails: FC<IngredientDetailsProps> = ({ onClose }) => {
  const routerParams = useParams<{ id: string }>();
  const ingredientData = useSelector((state) => selectIngredientById(state, routerParams.id!));

  if (!ingredientData) {
    return <Preloader />;
  }

  return (
    <Modal title="Детали ингредиента" onClose={onClose}>
      <IngredientDetailsUI ingredientData={ingredientData} />
    </Modal>
  );
};
