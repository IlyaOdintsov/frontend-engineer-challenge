import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'react-router-dom';
import { resetSchema, ResetInput } from '@/entities/auth/schemas';
import { resetPassword } from '@/shared/api';
import { JSX, useState } from 'react';
import { handleGraphQLError } from '@/shared/lib/errors.ts';
import { AuthFormLayout } from '@/features/auth-layout/ui/AuthFormLayout.tsx';
import { FormInput } from '@/shared/ui/FormInput.tsx';
import { Button } from '@/shared/ui/Button.tsx';
import { InvalidScreen } from '@/features/forgot-password/step-4/ui/InvalidScreen.tsx';
import { SuccessScreen } from '@/features/forgot-password/step-4/ui/SuccessScreen.tsx';
import { useIsMobile } from '@/shared/hooks/useIsMobile.tsx';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface NewPasswordFormProps {
  token: string;
  status: FormStatus;
  setStatus: (status: FormStatus) => void;
}

function NewPasswordForm({
  token,
  status,
  setStatus,
}: NewPasswordFormProps): JSX.Element {
  const [error, setError] = useState('');

  const form = useForm<ResetInput>({
    resolver: zodResolver(resetSchema),
    defaultValues: { token, newPassword: '', confirmPassword: '' },
  });

  const newPasswordValue = useWatch({
    control: form.control,
    name: 'newPassword',
  });
  const confirmPasswordValue = useWatch({
    control: form.control,
    name: 'confirmPassword',
  });

  const onSubmit = async (data: ResetInput) => {
    setStatus('loading');
    setError('');

    try {
      const resetPassInput = {
        token: data.token,
        newPassword: data.newPassword,
      };

      await resetPassword(resetPassInput);
      setStatus('success');
    } catch (err: any) {
      const userError = handleGraphQLError(err, { for: 'reset' });
      setError(userError);
      setStatus('error');
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-3 md:space-y-6"
      autoComplete="off"
    >
      <FormInput
        id="newPassword"
        label="Пароль"
        placeholder="Введите пароль"
        type="password"
        showPasswordToggle={true}
        value={newPasswordValue}
        error={form.formState.errors.newPassword?.message}
        {...form.register('newPassword')}
      />

      <FormInput
        id="confirmPassword"
        label="Повторите пароль"
        placeholder="Повторите пароль"
        type="password"
        showPasswordToggle={true}
        value={confirmPasswordValue}
        error={form.formState.errors.confirmPassword?.message}
        {...form.register('confirmPassword')}
      />

      {error && (
        <div role="alert" className="text-error text-start">
          {error}
        </div>
      )}

      <Button
        variant="primary"
        isLoading={status === 'loading' ? 'Изменение пароля' : ''}
        type="submit"
        className="mt-2"
      >
        Изменить пароль
      </Button>
    </form>
  );
}

export function NewPasswordStep() {
  const isMobile = useIsMobile();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';

  const [status, setStatus] = useState<FormStatus>('idle');

  if (status === 'error' || !token) return <InvalidScreen />;

  if (status === 'success') return <SuccessScreen />;

  return (
    <AuthFormLayout
      title="Задайте пароль"
      subtitle={
        isMobile
          ? 'Напишите новый пароль'
          : 'Напишите новый пароль, который будете использовать для входа'
      }
      size="lg"
    >
      <NewPasswordForm token={token} status={status} setStatus={setStatus} />
    </AuthFormLayout>
  );
}
