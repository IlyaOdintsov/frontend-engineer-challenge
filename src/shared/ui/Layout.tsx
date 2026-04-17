import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center">
      <header className="w-full fixed top-0 left-0 z-50 px-5 py-4">
        <img src="/logo.svg" alt="Logo" className="h-10 w-auto" />
      </header>

      <main>{children}</main>
    </div>
  );
}
