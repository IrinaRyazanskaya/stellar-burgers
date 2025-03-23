import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { selectIngredientById } from '@slices';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const routerParams = useParams<{ id: string }>();
  const ingredientData = useSelector((state) =>
    selectIngredientById(state, routerParams.id!)
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
