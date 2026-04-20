import { ReactNode } from 'react';

type AuthFormLayoutProps = {
  title: string | ReactNode;
  subtitle?: string;
  size?: 'md' | 'lg';
  children: ReactNode;
};

export function AuthFormLayout({
  title,
  subtitle,
  size = 'md',
  children,
}: AuthFormLayoutProps) {
  const sizes = {
    md: 'max-w-[400px]',
    lg: 'max-w-[480px]',
  };

  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center ${sizes[size]}`}
    >
      <div className="w-full space-y-6 text-center">
        {title && (
          <h1 className="font-medium text-[32px] leading-[1.2] text-text text-start">
            {title}
          </h1>
        )}
        {subtitle && (
          <p className="text-sm leading-[1.6] text-text-secondary text-start">
            {subtitle}
          </p>
        )}

        <div className="space-y-8">{children}</div>
      </div>
    </div>
  );
}
