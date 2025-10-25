import type { FC } from "react";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@zlden/react-developer-burger-ui-components";

import { Modal } from "../../modal";
import { BurgerConstructorElement } from "../../burger-constructor-element";
import type { ConstructorIngredient, Order } from "../../../utils/types";
import { OrderDetailsUI } from "../order-details";
import { Preloader } from "../preloader";

import styles from "./burger-constructor.module.css";

type BurgerConstructorUIProps = {
  price: number;
  orderRequest: boolean;
  orderModalData: Order | null;
  constructorItems: ConstructorItems;
  onOrderClick: () => void;
  closeOrderModal: () => void;
};

type ConstructorItems = {
  bun: ConstructorIngredient | null;
  ingredients: ConstructorIngredient[];
};

const BurgerConstructorUI: FC<BurgerConstructorUIProps> = ({
  price,
  orderRequest,
  orderModalData,
  constructorItems,
  onOrderClick,
  closeOrderModal,
}) => (
  <section className={styles.burger_constructor} data-cy="burger-constructor">
    {constructorItems.bun ? (
      <div className={`${styles.element} mb-4 mr-4`}>
        <ConstructorElement
          type="top"
          isLocked
          text={`${constructorItems.bun.name} (верх)`}
          price={constructorItems.bun.price}
          thumbnail={constructorItems.bun.image}
        />
      </div>
    ) : (
      <div
        className={`${styles.noBuns} ${styles.noBunsTop} ml-8 mb-4 mr-5 text text_type_main-default`}
      >
        Выберите булки
      </div>
    )}
    <ul className={styles.elements}>
      {constructorItems.ingredients.length > 0 ? (
        constructorItems.ingredients.map((item: ConstructorIngredient, index: number) => (
          <BurgerConstructorElement
            ingredient={item}
            index={index}
            totalItems={constructorItems.ingredients.length}
            key={item.id}
          />
        ))
      ) : (
        <div className={`${styles.noBuns} ml-8 mb-4 mr-5 text text_type_main-default`}>
          Выберите начинку
        </div>
      )}
    </ul>
    {constructorItems.bun ? (
      <div className={`${styles.element} mt-4 mr-4`}>
        <ConstructorElement
          type="bottom"
          isLocked
          text={`${constructorItems.bun.name} (низ)`}
          price={constructorItems.bun.price}
          thumbnail={constructorItems.bun.image}
        />
      </div>
    ) : (
      <div
        className={`${styles.noBuns} ${styles.noBunsBottom} ml-8 mb-4 mr-5 text text_type_main-default`}
      >
        Выберите булки
      </div>
    )}
    <div className={`${styles.total} mt-10 mr-4`}>
      <div className={`${styles.cost} mr-10`}>
        <p className={`text ${styles.text} mr-2`}>{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <Button
        htmlType="button"
        type="primary"
        size="large"
        children="Оформить заказ"
        onClick={onOrderClick}
      />
    </div>

    {orderRequest && (
      <Modal onClose={closeOrderModal} title={"Оформляем заказ..."}>
        <Preloader />
      </Modal>
    )}

    {orderModalData && (
      <Modal onClose={closeOrderModal} title={orderRequest ? "Оформляем заказ..." : ""}>
        <OrderDetailsUI orderNumber={orderModalData.number} />
      </Modal>
    )}
  </section>
);

BurgerConstructorUI.displayName = "BurgerConstructorUI";

export { BurgerConstructorUI };
export type { BurgerConstructorUIProps };
