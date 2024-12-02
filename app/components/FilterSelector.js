import React, { useEffect, useRef } from 'react';
import styles from './FilterSelector.module.css';

export default function FilterSelector({
  label,
  options,
  value,
  option,
  onChange,
  optionKey = 'value',
  optionLabel = 'label',
}) {
  const selectRef = useRef(null);

  useEffect(() => {
    const adjustWidth = () => {
      if (selectRef.current) {
        const text = selectRef.current.options[selectRef.current.selectedIndex].text;
        const tempSpan = document.createElement('span');
        tempSpan.style.visibility = 'hidden';
        tempSpan.style.whiteSpace = 'nowrap';
        tempSpan.style.fontSize = getComputedStyle(selectRef.current).fontSize;
        tempSpan.textContent = text;
        document.body.appendChild(tempSpan);
        selectRef.current.style.width = `${tempSpan.offsetWidth + 21}px`;
        document.body.removeChild(tempSpan);
      }
    };
    adjustWidth();
  }, [value]);

  return (
    <label className={styles.label}>
      {label}:
      <select className={styles.select} value={value} onChange={(e) => onChange(e.target.value)} ref={selectRef}>
        <option value="">{option}</option>
        {options.map((option) => (
          <option key={option[optionKey]} value={option[optionKey]}>
            {option[optionLabel]}
          </option>
        ))}
      </select>
    </label>
  );
}
