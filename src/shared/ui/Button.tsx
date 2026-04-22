type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: string;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = '',
  disabled,
  children,
  className,
  ...props
}: ButtonProps) {
  const baseClasses =
    'w-full inline-flex items-center justify-center rounded-lg font-medium line transition-colors focus:outline-none cursor-pointer ';

  const variants = {
    primary: 'bg-primary text-text-button hover:brightness-90',
    secondary: 'bg-secondary text-primary hover:brightness-75',
    tertiary: 'text-primary text-sm !w-auto !p-0 hover:brightness-75',
  };

  const sizes = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2.5 md:py-3 text-base',
    lg: 'px-6 py-3 md:py-4 text-lg',
  };

  return (
    <button
      type="button"
      disabled={isLoading?.length > 0 || disabled}
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${sizes[size]}
        disabled:opacity-50
        ${className}
      `}
      {...props}
    >
      {isLoading?.length > 0 ? `${isLoading}...` : children}
    </button>
  );
}
