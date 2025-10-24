import { memo } from "react";
import type { FC, ReactNode } from "react";
import { CloseIcon } from "@zlden/react-developer-burger-ui-components";

import { ModalOverlayUI } from "../modal-overlay";

import styles from "./modal.module.css";

type ModalUIProps = {
  title: string;
  onClose: () => void;
  children?: ReactNode;
};

const ModalUI: FC<ModalUIProps> = memo(({ title, onClose, children }) => (
  <>
    <div className={styles.modal} data-cy="modal">
      <div className={styles.header}>
        <h3 className={`${styles.title} text text_type_main-large`}>{title}</h3>
        <button className={styles.button} type="button" data-cy="modal-close">
          <CloseIcon type="primary" onClick={onClose} />
        </button>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
    <ModalOverlayUI onClick={onClose} />
  </>
));

ModalUI.displayName = "ModalUI";

export { ModalUI };
export type { ModalUIProps };
