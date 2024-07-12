import React from "react";
import styles from "./Blob.module.css";

const Blob: React.FC = () => {
  return (
    <div className={styles.background}>
      <div className={styles.blob}>
        <h1 className={styles.heading}>Thinking...</h1>
      </div>
      <div className={styles.blob1}></div>
      <div className={styles.blob2}></div>
      <div className={styles.blob3}></div>
    </div>
  );
};

export default Blob;
