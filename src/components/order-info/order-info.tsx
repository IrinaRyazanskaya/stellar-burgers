import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import {
  clearOrderInfo,
  getOrderInfo,
  selectBurgerIngredients,
  selectOrderInfo,
  selectOrderInfoRequestStatus
} from '@slices';
import { TIngredient } from '@utils-types';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { useSelector, useDispatch } from '../../services/store';
import type { OrderInfoProps } from './type';
import { Modal } from '../modal';

export const OrderInfo: FC<OrderInfoProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const routerParams = useParams<{ number: string }>();

  const orderData = useSelector(selectOrderInfo);
  const ingredients = useSelector(selectBurgerIngredients);
  const orderRequestStatus = useSelector(selectOrderInfoRequestStatus);

  const cleanAndClose = () => {
    dispatch(clearOrderInfo());
    onClose();
  };

  useEffect(() => {
    const orderNumber = Number(routerParams.number);
    dispatch(getOrderInfo(orderNumber));
  }, [routerParams.number]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo || orderRequestStatus === 'pending') {
    return <Preloader />;
  }

  return (
    <Modal title={`#${orderInfo.number}`} onClose={cleanAndClose}>
      <OrderInfoUI orderInfo={orderInfo} />
    </Modal>
  );
};
