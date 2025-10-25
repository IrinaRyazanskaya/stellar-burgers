import type { FC } from "react";
import { useState, useRef } from "react";
import { useInView } from "react-intersection-observer";

import { BurgerIngredientsUI } from "../../components/ui/burger-ingredients";
import {
  selectBurgerBuns,
  selectBurgerMains,
  selectBurgerSauces,
} from "../../services/slices/burger-ingredients";
import type { TabMode } from "../../utils/types";
import { useSelector } from "../../services/store";

const BurgerIngredients: FC = () => {
  const buns = useSelector(selectBurgerBuns);
  const mains = useSelector(selectBurgerMains);
  const sauces = useSelector(selectBurgerSauces);

  const [currentTab, setCurrentTab] = useState<TabMode>("bun");
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  const [bunsRef] = useInView({
    threshold: 0,
    onChange(inView) {
      if (inView) {
        setCurrentTab("bun");
      }
    },
  });

  const [mainsRef] = useInView({
    threshold: 0,
    onChange(inView) {
      if (inView) {
        setCurrentTab("main");
      }
    },
  });

  const [saucesRef] = useInView({
    threshold: 0,
    onChange(inView) {
      if (inView) {
        setCurrentTab("sauce");
      }
    },
  });

  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TabMode);

    if (tab === "bun") {
      titleBunRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    if (tab === "main") {
      titleMainRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    if (tab === "sauce") {
      titleSaucesRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={onTabClick}
    />
  );
};

BurgerIngredients.displayName = "BurgerIngredients";

export { BurgerIngredients };
