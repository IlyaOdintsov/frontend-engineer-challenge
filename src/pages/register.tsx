import { RegisterForm } from '@/features/auth-register/ui/RegisterForm';
import { Layout } from '@/shared/ui/Layout.tsx';
import { AuthFormLayout } from '@/features/auth-layout/ui/AuthFormLayout.tsx';
import { Footer } from '@/shared/ui/Footer.tsx';
import { AuthImage } from '@/features/auth-layout/ui/auth-image.tsx';
import { useIsMobile } from '@/shared/hooks/useIsMobile.tsx';

export function RegisterPage() {
  const isMobile = useIsMobile();

  return (
    <div className="flex">
      <div className="h-screen bg-background flex flex-col md:max-w-[40%] w-full">
        <Layout>
          <AuthFormLayout
            title={isMobile ? 'Регистрация' : 'Регистрация в системе'}
          >
            <RegisterForm />
            <p className="text-text-tertiary text-xs">
              {isMobile
                ? 'Регистрируясь, вы принимаете'
                : 'Зарегистрировавшись пользователь принимает условия'}{' '}
              <a href="/" className="underline">
                {isMobile ? 'договор оферты' : 'договора оферты'}
              </a>{' '}
              и{' '}
              <a href="/" className="underline">
                {isMobile
                  ? 'политику конфиденциальности'
                  : 'политики конфиденциальности'}
              </a>
            </p>
          </AuthFormLayout>
        </Layout>
        <Footer variant="register" />
      </div>
      <AuthImage className="hidden md:flex" />
    </div>
  );
}
