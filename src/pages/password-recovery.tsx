import { useState } from 'react';
import { RequestResetForm } from '@/features/forgot-password/step-1/ui/RequestResetForm';
import { CheckEmailScreen } from '@/features/forgot-password/step-2/ui/CheckEmailScreen.tsx';
import { NewPasswordForm } from '@/features/forgot-password/step-3/ui/NewPasswordForm';
import { useSearchParams } from 'react-router-dom';
import { Layout } from '@/shared/ui/Layout.tsx';

export function PasswordRecoveryPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [step, setStep] = useState<'request' | 'check-email' | 'new-password'>(
    token ? 'new-password' : 'request'
  );
  const [email, setEmail] = useState('');

  if (step === 'new-password' && token) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center p-8">
          <NewPasswordForm />
        </div>
      </Layout>
    );
  }

  if (step === 'check-email') {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center p-8">
          <CheckEmailScreen email={email} />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center p-8">
        <RequestResetForm
          onSuccess={(userEmail) => {
            setEmail(userEmail);
            setStep('check-email');
          }}
        />
      </div>
    </Layout>
  );
}
