import { RefObject } from "react";

import type { Ingredient, TTabMode } from "../../../utils/types";

export type BurgerIngredientsUIProps = {
  currentTab: TTabMode;
  buns: Ingredient[];
  mains: Ingredient[];
  sauces: Ingredient[];
  titleBunRef: RefObject<HTMLHeadingElement>;
  titleMainRef: RefObject<HTMLHeadingElement>;
  titleSaucesRef: RefObject<HTMLHeadingElement>;
  bunsRef: (node?: Element | null | undefined) => void;
  mainsRef: (node?: Element | null | undefined) => void;
  saucesRef: (node?: Element | null | undefined) => void;
  onTabClick: (val: string) => void;
};
