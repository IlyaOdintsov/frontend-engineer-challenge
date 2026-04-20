import { RegisterForm } from '@/features/auth-register/ui/RegisterForm';
import { Layout } from '@/shared/ui/Layout.tsx';
import { AuthFormLayout } from '@/features/auth-layout/ui/AuthFormLayout.tsx';
import { Footer } from '@/shared/ui/Footer.tsx';
import { AuthImage } from '@/features/auth-layout/ui/auth-image.tsx';

export function RegisterPage() {
  return (
    <div className="flex">
      <div className="h-screen bg-background flex flex-col max-w-[40%] w-full">
        <Layout>
          <AuthFormLayout title="Регистрация в системе">
            <RegisterForm />
            <p className="text-text-tertiary text-xs">
              Зарегистрировавшись пользователь принимает условия{' '}
              <a href="/" className="underline">
                договора оферты
              </a>{' '}
              и{' '}
              <a href="/" className="underline">
                политики конфиденциальности
              </a>
            </p>
          </AuthFormLayout>
        </Layout>
        <Footer variant="register" />
      </div>
      <AuthImage />
    </div>
  );
}
