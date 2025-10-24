import type { FC } from "react";

import { OrderStatusUI } from "../../components/ui/order-status";

const statusText: { [key: string]: string } = {
  pending: "Готовится",
  done: "Выполнен",
  created: "Создан",
};

type OrderStatusProps = {
  status: string;
};

const OrderStatus: FC<OrderStatusProps> = ({ status }) => {
  let textStyle = "";
  switch (status) {
    case "pending":
      textStyle = "#E52B1A";
      break;
    case "done":
      textStyle = "#00CCCC";
      break;
    default:
      textStyle = "#F2F2F3";
  }

  return <OrderStatusUI textStyle={textStyle} text={statusText[status]} />;
};

OrderStatus.displayName = "OrderStatus";

export { OrderStatus };
export type { OrderStatusProps };
