import styles from './EmailInput.module.css';

export default function EmailInput({ value, onChange, error }) {
  return (
    <div>
      <input
        className={`${styles.input} ${error ? styles.input_error : ''}`}
        placeholder="Email"
        onChange={onChange}
        value={value}
      />
      {error && <p className={styles.error_message}>{error}</p>}
    </div>
  );
}
