import type { FC } from 'react';

import { OrderCard } from '../../order-card';
import { OrdersListUIProps } from './type';

import styles from './orders-list.module.css';

export const OrdersListUI: FC<OrdersListUIProps> = ({ orderByDate }) => (
  <div className={`${styles.content}`}>
    {orderByDate.map((order) => (
      <OrderCard order={order} key={order._id} />
    ))}
  </div>
);
