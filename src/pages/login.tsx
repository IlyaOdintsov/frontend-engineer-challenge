import { LoginForm } from '@/features/auth-login/ui/LoginForm';
import { AuthFormLayout } from '@/features/auth-layout/ui/AuthFormLayout.tsx';
import { Layout } from '@/shared/ui/Layout.tsx';
import { Footer } from '@/shared/ui/Footer.tsx';
import { AuthImage } from '@/features/auth-layout/ui/auth-image.tsx';
import { Button } from '@/shared/ui/Button.tsx';
import { useNavigate } from 'react-router-dom';

export function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="flex">
      <div className="h-screen bg-background flex flex-col md:max-w-[40%] w-full">
        <Layout>
          <AuthFormLayout title="Войти в систему">
            <LoginForm />
            <Button
              variant="tertiary"
              onClick={() => navigate('/password-recovery')}
            >
              Забыли пароль?
            </Button>
          </AuthFormLayout>
        </Layout>
        <Footer variant="login" />
      </div>
      <AuthImage className="hidden md:flex" />
    </div>
  );
}
