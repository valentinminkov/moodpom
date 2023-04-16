import { useEffect } from "react";

const useDocumentTitle = (title, envFlag = "") => {
  useEffect(() => {
    document.title = `${envFlag}${title}`;
  }, [title, envFlag]);
};

export default useDocumentTitle;
