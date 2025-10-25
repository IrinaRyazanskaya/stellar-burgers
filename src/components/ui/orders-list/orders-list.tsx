import type { FC } from "react";

import type { Order } from "../../../utils/types";
import { OrderCard } from "../../order-card";

import styles from "./orders-list.module.css";

type OrdersListUIProps = {
  orderByDate: Order[];
};

const OrdersListUI: FC<OrdersListUIProps> = ({ orderByDate }) => (
  <div className={`${styles.content}`}>
    {orderByDate.map((order) => (
      <OrderCard order={order} key={order._id} />
    ))}
  </div>
);

OrdersListUI.displayName = "OrdersListUI";

export { OrdersListUI };
export type { OrdersListUIProps };
