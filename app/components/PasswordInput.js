import styles from './PasswordInput.module.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';

export default function PasswordInput({ value, onChange, error, placeholder, validationMessage }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className={`${styles.password_input_box} ${error ? styles.input_error : ''}`}>
        <input
          className={`${styles.input} ${styles.password_input}`}
          placeholder={placeholder}
          type={showPassword ? 'text' : 'password'}
          onChange={onChange}
          value={value}
        />
        <button
          className={styles.btn_eye}
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          aria-label="Toggle password visibility"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      {!error && validationMessage && value.length < 8 && (
        <p className={styles.validation_message}>{validationMessage}</p>
      )}
      {error && <p className={styles.error_message}>{error}</p>}
    </>
  );
}
