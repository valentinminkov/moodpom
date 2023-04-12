import React from "react";
import styles from "./Overlay.module.scss";

export const OVERLAY_POSITIONS = {
  topRight: "top-right",
  topLeft: "top-left",
  bottomRight: "bottom-right",
  bottomLeft: "bottom-left",
};

/**
 * Overlay component to display content as an overlay without taking up space.
 *
 * @param {Object} props - The props of the Overlay component.
 * @param {React.ReactNode} props.children - The content to be displayed as an overlay.
 * @param {boolean} props.show - Determines whether the overlay should be displayed or hidden.
 * @param {string} props.position - The position of the overlay, one of the values from the OVERLAY_POSITIONS object.
 * @returns {React.Element} The Overlay component.
 */
const Overlay = ({ children, show, position }) => {
  if (!show) return null;

  const overlayStyle = `${styles["overlay-container"]} ${styles[position]}`;

  return <div className={overlayStyle}>{children}</div>;
};

export default Overlay;
