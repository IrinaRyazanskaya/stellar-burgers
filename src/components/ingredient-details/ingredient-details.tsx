import type { FC } from 'react';
import { useParams } from 'react-router-dom';

import { selectIngredientById } from '@slices';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import type { IngredientDetailsProps } from './type';
import { Modal } from '../modal';

export const IngredientDetails: FC<IngredientDetailsProps> = ({ onClose }) => {
  const routerParams = useParams<{ id: string }>();
  const ingredientData = useSelector((state) =>
    selectIngredientById(state, routerParams.id!)
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return (
    <Modal title='Детали ингредиента' onClose={onClose}>
      <IngredientDetailsUI ingredientData={ingredientData} />
    </Modal>
  );
};
