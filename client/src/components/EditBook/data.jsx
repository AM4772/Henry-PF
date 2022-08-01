import React from 'react';
import s from './EditBook.module.sass';

export const languageOptions = [
  { value: 'en', label: 'en', color: '#00B8D9' },
  { value: 'es', label: 'es', color: '#0052CC' },
  { value: 'ko', label: 'ko', color: '#5243AA' },
  { value: 'de', label: 'de', color: '#FF5630' },
  { value: 'fr', label: 'fr', color: '#FF8B00' },
  { value: 'it', label: 'it', color: '#FFC400' },
  { value: 'ja', label: 'ja', color: '#36B37E' },
  { value: 'pl', label: 'pl', color: '#00875A' },
  { value: 'ru', label: 'ru', color: '#666666' },
];

export const groupedOptions = [
  {
    label: 'Languages',
    options: languageOptions,
  },
];

export const CustomInput = React.forwardRef(
  ({ onChange, placeholder, value, onClick }, ref) => (
    <input
      onChange={onChange}
      id={s.customInput}
      placeholder={placeholder}
      value={value}
      onClick={onClick}
      ref={ref}
    />
  )
);