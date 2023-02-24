import React from "react";
import Button from "../Button/Button";
import "./EndFlagButton.css";

const EndFlagButton = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      className="end-flag-button"
      content={
        <div className="end-flag-button-container">
          <div className="end-flag-button-flag"></div>
          <div className="end-flag-button-line"></div>
        </div>
      }
    />
  );
};

export default EndFlagButton;
