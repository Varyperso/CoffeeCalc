import styles from './button.module.css'
// prettier-ignore
export default function Button({ handler, children, type, className, disabled }) {
  const buttonClass = className ? styles[className] : styles.btn;
  return (
      <button type={type || 'button'} className={buttonClass} onClick={handler} disabled={disabled}>
          {children}
      </button>
  );
}