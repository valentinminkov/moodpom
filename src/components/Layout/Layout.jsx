import React from "react";
import styles from "./Layout.module.scss";
import Button from "../Button/Button";
import Overlay, { OVERLAY_POSITIONS } from "../Overlay/Overlay";
import useNotificationPermission from "../../hooks/useNotificationPermission";

const Layout = ({ children }) => {
  const [permission, requestNotificationPermission] =
    useNotificationPermission();

  return (
    <>
      <Overlay
        show={permission === "default"}
        position={OVERLAY_POSITIONS.bottomRight}
      >
        <Button
          onClick={requestNotificationPermission}
          content={<p>Enable Notifications</p>}
          className={styles["overlay-button"]}
        />
      </Overlay>
      <div className={styles["app-container"]}>{children}</div>
    </>
  );
};

export default Layout;
