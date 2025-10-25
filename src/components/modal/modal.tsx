import ReactDOM from "react-dom";
import { memo, useEffect } from "react";
import type { FC, ReactNode } from "react";

import { ModalUI } from "../../components/ui/modal";

const modalRoot = document.getElementById("modals");

type ModalProps = {
  title: string;
  onClose: () => void;
  children?: ReactNode;
};

const Modal: FC<ModalProps> = memo(({ title, onClose, children }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
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

Modal.displayName = "Modal";

export { Modal };
export type { ModalProps };
