import type { FC } from 'react';

import { FeedInfoUI } from '../ui/feed-info';
import {
  selectOrdersFeed,
  selectOrdersStats
} from '../../services/slices/orders-feed';
import type { TOrder } from '../../utils/types';
import { useSelector } from '../../services/store';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders = useSelector(selectOrdersFeed);

  const feed = useSelector(selectOrdersStats);

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
