import "./Button.css";

const Button = ({ onClick, content, className }) => {
  return (
    <button className={`button ${className}`} onClick={onClick}>
      {content}
    </button>
  );
};

export default Button;
