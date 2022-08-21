import styles from './TextInput.module.css';

const TextInput = ({text, inputMode, id, classNames, value, onChange, ltr, type}) => {
  return (
    <div className={classNames}>
      <div className={styles.wrapper} title={text}>
        <input
          className={`${styles.input} ${styles[type]} ${ltr ? 'ltr' : ''}`}
          id={id}
          type="text"
          inputMode={inputMode}
          onChange={onChange}
          value={value}
          autoComplete="false"
        />
        <label className={styles.label} htmlFor={id}>
          {text}
        </label>
      </div>
    </div>
  );
};

export default TextInput;
