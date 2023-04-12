import { useState, useCallback, useEffect } from "react";

const useNotificationPermission = () => {
  const [permission, setPermission] = useState(Notification.permission);

  const requestNotificationPermission = useCallback(async () => {
    setPermission(await Notification.requestPermission());
  }, []);

  useEffect(() => {
    const permissionChangeHandler = () => {
      setPermission(Notification.permission);
    };

    if ("permissions" in navigator) {
      navigator.permissions
        .query({ name: "notifications" })
        .then((permissionStatus) => {
          permissionStatus.onchange = permissionChangeHandler;
        });
    }

    return () => {
      if ("permissions" in navigator) {
        navigator.permissions
          .query({ name: "notifications" })
          .then((permissionStatus) => {
            permissionStatus.onchange = null;
          });
      }
    };
  }, []);

  const openNotificationSettings = () => {
    const userAgent = navigator.userAgent.toLowerCase();

    if (userAgent.includes("chrome") || userAgent.includes("brave")) {
      alert(
        "To change notification settings, go to browser settings > Privacy and security > Site settings > Notifications."
      );
    } else if (userAgent.includes("firefox")) {
      alert(
        "To change notification settings, go to browser settings > Privacy & Security > Permissions > Notifications."
      );
    } else if (userAgent.includes("safari")) {
      alert(
        "To change notification settings, go to Safari > Preferences > Websites > Notifications."
      );
    } else if (userAgent.includes("edge")) {
      alert(
        "To change notification settings, go to browser settings > Cookies and site permissions > Notifications."
      );
    } else if (userAgent.includes("opera")) {
      alert(
        "To change notification settings, go to browser settings > Advanced > Privacy & security > Site settings > Notifications."
      );
    } else {
      alert(
        "Your browser is not supported. Please check the browser settings manually to change the notification settings."
      );
    }
  };

  return [permission, requestNotificationPermission, openNotificationSettings];
};

export default useNotificationPermission;
