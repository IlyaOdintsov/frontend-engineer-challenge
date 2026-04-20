import { useState } from 'react';
import { RequestResetStep } from '@/features/forgot-password/step-1/ui/RequestResetStep.tsx';
import { CheckEmailScreen } from '@/features/forgot-password/step-2/ui/CheckEmailScreen.tsx';
import { NewPasswordStep } from '@/features/forgot-password/step-3/ui/NewPasswordStep.tsx';
import { useSearchParams } from 'react-router-dom';
import { Layout } from '@/shared/ui/Layout.tsx';

export function PasswordRecoveryPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [step, setStep] = useState<'request' | 'check-email' | 'new-password'>(
    token ? 'new-password' : 'request'
  );

  return (
    <div className="h-screen bg-background">
      <Layout>
        {step === 'new-password' && token ? (
          <NewPasswordStep />
        ) : step === 'check-email' ? (
          <CheckEmailScreen />
        ) : (
          <RequestResetStep onSuccess={() => setStep('check-email')} />
        )}
      </Layout>
    </div>
  );
}
