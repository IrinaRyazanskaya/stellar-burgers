import { memo } from "react";
import type { FC } from "react";

import { OrdersListUI } from "../../components/ui/orders-list";
import type { Order } from "../../utils/types";

type OrdersListProps = {
  orders: Order[];
};

const OrdersList: FC<OrdersListProps> = memo(({ orders }) => {
  const orderByDate = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return <OrdersListUI orderByDate={orderByDate} />;
});

OrdersList.displayName = "OrdersList";

export { OrdersList };
export type { OrdersListProps };
