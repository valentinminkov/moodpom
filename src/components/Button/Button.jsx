import styles from "./Button.module.css";

export const BUTTON_THEME = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
};

const renderEndFlagButton = () => {
  return (
    <div className={`${styles["end-flag-button-container"]}`}>
      <div className={`${styles["end-flag-button-flag"]}`}></div>
      <div className={`${styles["end-flag-button-line"]}`}></div>
    </div>
  );
};

const Button = ({
  onClick,
  content,
  className,
  theme = BUTTON_THEME.PRIMARY,
  isEndFlagButton = false,
}) => {
  const classes = isEndFlagButton
    ? `${styles.button} ${styles["end-flag-button"]}`
    : `${styles.button} ${className ?? ""} ${
        isEndFlagButton ? `${styles["end-flag-button"]}` : ""
      } ${styles[`button-${theme}`]}`;

  const buttonContent = isEndFlagButton ? renderEndFlagButton() : content;

  return (
    <button className={classes} onClick={onClick}>
      {buttonContent}
    </button>
  );
};

export default Button;
