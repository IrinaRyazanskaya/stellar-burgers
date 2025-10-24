import type { FC } from "react";

import styles from "./preloader.module.css";

const Preloader: FC = () => (
  <div className={styles.preloader}>
    <div className={styles.preloader_circle} />
  </div>
);

Preloader.displayName = "Preloader";

export { Preloader };
