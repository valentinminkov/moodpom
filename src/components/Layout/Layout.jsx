import React from "react";
import styles from "./Layout.module.scss";
import Button from "../Button/Button";
import Overlay, { OVERLAY_POSITIONS } from "../Overlay/Overlay";
import useNotificationPermission from "../../hooks/useNotificationPermission";
import Notification from "../Notification/Notification";
import { useNotification } from "../../context/NotificationContext";

const Layout = ({ children }) => {
  const [permission, requestNotificationPermission] =
    useNotificationPermission();
  const { notifications, addNotification } = useNotification();

  const handleShowNotification = () => {
    addNotification("This is a custom notification");
  };

  return (
    <>
      {notifications.map((notification) => (
        <Notification key={notification.id} message={notification.message} />
      ))}
      <Overlay
        show={permission === "default"}
        position={OVERLAY_POSITIONS.bottomRight}
      >
        <Button
          onClick={requestNotificationPermission}
          content={<p>Enable Notifications</p>}
          className={styles["overlay-button"]}
        />
        <Button
          onClick={handleShowNotification}
          content={<p>Show Custom Notification</p>}
          className={styles["custom-notification-button"]}
        />
      </Overlay>
      <div className={styles["app-container"]}>{children}</div>
    </>
  );
};

export default Layout;
