import type { FC } from "react";

import { FeedInfoUI } from "../ui/feed-info";
import { selectOrdersFeed, selectOrdersStats } from "../../services/slices/orders-feed";
import type { Order } from "../../utils/types";
import { useSelector } from "../../services/store";

const getOrders = (orders: Order[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

const FeedInfo: FC = () => {
  const feed = useSelector(selectOrdersStats);
  const orders = useSelector(selectOrdersFeed);
  const readyOrders = getOrders(orders, "done");
  const pendingOrders = getOrders(orders, "pending");

  return <FeedInfoUI readyOrders={readyOrders} pendingOrders={pendingOrders} feed={feed} />;
};

FeedInfo.displayName = "FeedInfo";

export { FeedInfo };
