import { FC, useMemo } from 'react';
import { useSelector } from '../../services/store';

import {
  selectBurgerConstructorItems,
  selectIsBurgerOrderPending,
  selectBurgerOrderModalData
} from '@slices';
import { BurgerConstructorUI } from '@ui';
import { TConstructorIngredient } from '@utils-types';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(selectBurgerConstructorItems);
  const orderRequest = useSelector(selectIsBurgerOrderPending);
  const orderModalData = useSelector(selectBurgerOrderModalData);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
  };
  const closeOrderModal = () => {};

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
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
