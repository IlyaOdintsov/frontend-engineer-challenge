import { LoginForm } from '@/features/auth-login/ui/LoginForm';

export function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8">
        <h1 className="text-3xl font-bold text-center">Вход</h1>
        <LoginForm />
      </div>
    </main>
  );
}
