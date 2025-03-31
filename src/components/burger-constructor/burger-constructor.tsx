import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  selectBurgerConstructorItems,
  selectBurgerOrder,
  createBurgerOrder,
  selectBurgerOrderRequestStatus,
  clearBurgerOrderStatus,
  selectUser
} from '@slices';
import { BurgerConstructorUI } from '@ui';
import { TConstructorIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';

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
