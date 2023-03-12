import styles from "./Button.module.scss";

export const BUTTON_THEME = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  ICON: "icon",
};

const Button = ({
  onClick,
  content,
  className,
  theme = BUTTON_THEME.PRIMARY,
}) => {
  const classes = `${styles.button} ${className ?? ""} ${
    styles[`button-${theme}`]
  }`;

  return (
    <button className={classes} onClick={onClick}>
      {content}
    </button>
  );
};

export default Button;
