import { memo } from 'react';
import type { FC } from 'react';

import { OrdersListUI } from '../../components/ui/orders-list';
import { OrdersListProps } from './type';

export const OrdersList: FC<OrdersListProps> = memo(({ orders }) => {
  const orderByDate = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return <OrdersListUI orderByDate={orderByDate} />;
});
