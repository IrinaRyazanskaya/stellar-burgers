import type { FC } from "react";

import doneImg from "../../../images/done.svg";
import styles from "./order-details.module.css";

type OrderDetailsUIProps = {
  orderNumber: number;
};

const OrderDetailsUI: FC<OrderDetailsUIProps> = ({ orderNumber }) => (
  <>
    <h2 className={`${styles.title} text text_type_digits-large mt-2 mb-4`}>{orderNumber}</h2>
    <p className="text text_type_main-medium">идентификатор заказа</p>
    <img className={styles.img} src={doneImg} alt="Изображение статуса заказа" />
    <p className="text text_type_main-default mb-1">Ваш заказ начали готовить</p>
    <p className={`${styles.text} text text_type_main-default`}>
      Дождитесь готовности на орбитальной станции
    </p>
  </>
);

OrderDetailsUI.displayName = "OrderDetailsUI";

export { OrderDetailsUI };
export type { OrderDetailsUIProps };
