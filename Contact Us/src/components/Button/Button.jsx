import styles from "./Button.module.css";

const Button = ({ isOutline, icon, text, ...rest }) => {
  // De-structuring
  // const { isOutline, icon, text } = props;
  return (
    <button
      {...rest}
      className={isOutline ? styles.outline_btn : styles.primary_btn}
    >
      {/* Without de-structure this is how we call */}
      {/* <button
      className={props.isOutline ? styles.outline_btn : styles.primary_btn}
    > */}
      {icon}
      {text}
    </button>
  );
};

export default Button;
