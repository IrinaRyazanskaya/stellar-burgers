import ReactDOM from "react-dom";
import type { FC } from "react";
import { memo, useEffect } from "react";

import { ModalUI } from "../../components/ui/modal";
import { TModalProps } from "./type";

const modalRoot = document.getElementById("modals");

export const Modal: FC<TModalProps> = memo(({ title, onClose, children }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      e.key === "Escape" && onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <ModalUI title={title} onClose={onClose}>
      {children}
    </ModalUI>,
    modalRoot as HTMLDivElement,
  );
});
