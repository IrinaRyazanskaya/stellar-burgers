import type { FC } from "react";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

import { Modal } from "../modal";
import { Preloader } from "../ui/preloader";
import { OrderInfoUI } from "../ui/order-info";
import {
  clearOrderInfo,
  getOrderInfo,
  selectOrderInfo,
  selectOrderInfoRequestStatus,
} from "../../services/slices/order-info";
import { selectBurgerIngredients } from "../../services/slices/burger-ingredients";
import { useSelector, useDispatch } from "../../services/store";
import type { Ingredient } from "../../utils/types";
import type { OrderInfoProps } from "./type";

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
  }, [dispatch, routerParams.number]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: Ingredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce((acc: TIngredientsWithCount, item) => {
      if (!acc[item]) {
        const ingredient = ingredients.find((ing) => ing._id === item);
        if (ingredient) {
          acc[item] = {
            ...ingredient,
            count: 1,
          };
        }
      } else {
        acc[item].count++;
      }

      return acc;
    }, {});

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0,
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total,
    };
  }, [orderData, ingredients]);

  const isLoading = !orderInfo || orderRequestStatus === "pending";

  const modalTitle = isLoading ? "Идёт загрузка данных" : `#${orderInfo.number}`;

  return (
    <Modal title={modalTitle} onClose={cleanAndClose}>
      {isLoading ? <Preloader /> : <OrderInfoUI orderInfo={orderInfo} />}
    </Modal>
  );
};
