import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { registerSchema, RegisterInput } from '@/entities/auth/schemas';
import { register, RegisterResponse } from '@/shared/api';
import { useSubmitForm } from '@/shared/hooks/useSubmitForm.ts';
import { Button } from '@/shared/ui/Button.tsx';
import { FormInput } from '@/shared/ui/FormInput.tsx';

export function RegisterForm() {
  const { submit, error, loading } = useSubmitForm<
    RegisterInput,
    RegisterResponse
  >((input) => register(input));
  const navigate = useNavigate();

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const emailValue = useWatch({ control: form.control, name: 'email' });
  const passwordValue = useWatch({ control: form.control, name: 'password' });
  const confirmPassword = useWatch({
    control: form.control,
    name: 'confirmPassword',
  });

  const onSubmit = async (data: RegisterInput) => {
    const result = await submit(data, { for: 'register' });

    if (result.success) navigate('/login');
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
        error={form.formState.errors.email?.message}
        value={emailValue}
        {...form.register('email')}
      />

      <FormInput
        id="password"
        label="Пароль"
        placeholder="Введите пароль"
        type="password"
        showPasswordToggle={true}
        error={form.formState.errors.password?.message}
        value={passwordValue}
        {...form.register('password')}
      />

      <FormInput
        id="confirmPassword"
        label="Повторите пароль"
        placeholder="Повторите пароль"
        type="password"
        showPasswordToggle={true}
        error={form.formState.errors.confirmPassword?.message}
        value={confirmPassword}
        {...form.register('confirmPassword')}
      />

      {error && (
        <div role="alert" className="text-error text-start">
          {error}
        </div>
      )}

      <Button
        variant="primary"
        isLoading={loading ? 'Регистрация' : ''}
        type="submit"
        className="mt-2"
      >
        Зарегистрироваться
      </Button>
    </form>
  );
}
