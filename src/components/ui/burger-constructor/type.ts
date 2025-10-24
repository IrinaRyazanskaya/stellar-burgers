import type { Order } from "../../../utils/types";

export type BurgerConstructorUIProps = {
  constructorItems: any;
  orderRequest: boolean;
  price: number;
  orderModalData: Order | null;
  onOrderClick: () => void;
  closeOrderModal: () => void;
};
