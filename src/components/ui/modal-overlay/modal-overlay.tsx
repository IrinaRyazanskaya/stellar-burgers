import type { FC } from "react";

import styles from "./modal-overlay.module.css";

type ModalOverlayUIProps = {
  onClick: () => void;
};

const ModalOverlayUI: FC<ModalOverlayUIProps> = ({ onClick }) => (
  <div className={styles.overlay} onClick={onClick} data-cy="modal-overlay" />
);

export { ModalOverlayUI };
export type { ModalOverlayUIProps };
