import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotSchema, ForgotInput } from '@/entities/auth/schemas';
import { forgotPassword, ForgotResponse } from '@/shared/api';
import { useSubmitForm } from '@/shared/hooks/useSubmitForm.ts';
import { Button } from '@/shared/ui/Button.tsx';
import { FormInput } from '@/shared/ui/FormInput.tsx';
import { AuthFormLayout } from '@/features/auth-layout/ui/AuthFormLayout.tsx';
import { BackButton } from '@/shared/ui/BackButton.tsx';

function RequestResetForm({ onSuccess }: { onSuccess: () => void }) {
  const { submit, error, loading } = useSubmitForm<ForgotInput, ForgotResponse>(
    (input) => forgotPassword(input)
  );

  const form = useForm<ForgotInput>({
    resolver: zodResolver(forgotSchema),
  });

  const emailValue = useWatch({ control: form.control, name: 'email' });

  const onSubmit = async (data: ForgotInput) => {
    const result = await submit(data, { for: 'forgot' });

    if (result.success) onSuccess();
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6"
      autoComplete="off"
    >
      <FormInput
        id="email"
        label="E-mail"
        placeholder="Введите e-mail"
        type="text"
        value={emailValue}
        error={form.formState.errors.email?.message}
        {...form.register('email')}
      />

      <Button
        variant="secondary"
        isLoading={loading ? 'Восстановление' : ''}
        type="submit"
        className="mt-2"
      >
        Восстановить пароль
      </Button>

      {error && (
        <div role="alert" className="text-error text-start">
          {error}
        </div>
      )}
    </form>
  );
}

export function RequestResetStep({ onSuccess }: { onSuccess: () => void }) {
  return (
    <AuthFormLayout
      title={
        <p className="flex gap-[7px]">
          <BackButton />
          Восстановление пароля
        </p>
      }
      subtitle="Укажите адрес почты на который был зарегистрирован аккаунт"
      size="lg"
    >
      <RequestResetForm onSuccess={onSuccess} />
    </AuthFormLayout>
  );
}
