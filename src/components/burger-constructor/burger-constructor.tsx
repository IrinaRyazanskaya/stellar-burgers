import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { BurgerConstructorUI } from '@ui';
import { selectBurgerConstructorItems } from '../../services/slices/burger-constructor';
import {
  clearBurgerOrderStatus,
  createBurgerOrder,
  selectBurgerOrder,
  selectBurgerOrderRequestStatus
} from '../../services/slices/burger-order';
import { selectUser } from '../../services/slices/profile';
import { useDispatch, useSelector } from '../../services/store';
import type { TConstructorIngredient } from '../../utils/types';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = useSelector(selectBurgerConstructorItems);
  const orderRequestStatus = useSelector(selectBurgerOrderRequestStatus);
  const orderModalData = useSelector(selectBurgerOrder);
  const user = useSelector(selectUser);

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!constructorItems.bun || orderRequestStatus === 'pending') {
      return;
    }

    dispatch(
      createBurgerOrder([
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((ingredient) => ingredient._id)
      ])
    );
  };
  const closeOrderModal = () => {
    dispatch(clearBurgerOrderStatus());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequestStatus === 'pending'}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
