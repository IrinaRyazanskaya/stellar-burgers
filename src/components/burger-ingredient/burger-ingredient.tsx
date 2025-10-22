import { memo } from 'react';
import type { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '../../components/ui/burger-ingredient';
import { addIngredientToConstructor } from '../../services/slices/burger-constructor';
import { useDispatch } from '../../services/store';
import { TBurgerIngredientProps } from './type';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const handleAdd = () => {
      dispatch(addIngredientToConstructor(ingredient));
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
