import { useState } from 'react';
import visibleOn from '../assets/icons/visible-on.svg';
import visibleOff from '../assets/icons/visible-off.svg';

type FormInputProps = {
  id: string;
  label: string;
  placeholder?: string;
  error?: string;
  type?: 'text' | 'password';
  showPasswordToggle?: boolean;
  value?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function FormInput({
  id,
  label,
  placeholder,
  error,
  type = 'text',
  showPasswordToggle = false,
  className = '',
  value,
  ...props
}: FormInputProps) {
  const isPasswordField = type === 'password';
  const [passwordVisible, setPasswordVisible] = useState(false);

  const isFilled = !!value;

  return (
    <div>
      <div
        className={`relative flex flex-col gap-1 border-b ${isFilled ? 'text-text border-primary py-2' : 'text-text/[0.3] border-border/[0.08] py-4'}`}
      >
        {isFilled && (
          <label
            htmlFor={id}
            className="text-xs text-text-secondary leading-3 text-start"
          >
            {label}
          </label>
        )}

        <input
          id={id}
          type={
            isPasswordField && showPasswordToggle && passwordVisible
              ? 'text'
              : type
          }
          className={`
            w-full
            text-base
            outline-none
            ${className}
          `}
          placeholder={isFilled ? '' : placeholder}
          {...props}
        />

        {isPasswordField && showPasswordToggle && isFilled && (
          <button
            type="button"
            onClick={() => setPasswordVisible((prev) => !prev)}
            className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer"
          >
            {passwordVisible ? (
              <img src={visibleOn} alt="visible-on" />
            ) : (
              <img src={visibleOff} alt="visible-off" />
            )}
          </button>
        )}
      </div>
      {error && (
        <p className="mt-2 text-error text-xs leading-3 text-start">{error}</p>
      )}
    </div>
  );
}
