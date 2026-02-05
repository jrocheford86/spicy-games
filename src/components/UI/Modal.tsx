import { ReactNode } from "react";
import styles from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  title: string;
  body?: string;
  onClose: () => void;
  children?: ReactNode; // Importante para inyectar contenido dinámico
}

export const Modal = ({
  isOpen,
  title,
  body,
  onClose,
  children,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <div className={styles.handle} />

        <h3 className={styles.title}>{title}</h3>

        {/* Si hay texto descriptivo, lo mostramos */}
        {body && <p className={styles.bodyText}>{body}</p>}

        {/* Aquí es donde se renderizan los botones de idiomas o cualquier otro contenido */}
        <div className={styles.dynamicContent}>{children}</div>

        <button onClick={onClose} className={styles.closeBtn}>
          {title.toLowerCase().includes("idioma") ||
          title.toLowerCase().includes("language")
            ? "Cancelar"
            : "OK"}
        </button>
      </div>
    </div>
  );
};
