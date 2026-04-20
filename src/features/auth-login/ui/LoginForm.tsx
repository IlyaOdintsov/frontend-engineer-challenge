import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { loginSchema, LoginInput } from '@/entities/auth/schemas';
import { useAuthStore } from '@/shared/store/authStore';
import { login, LoginResponse } from '@/shared/api';
import { useSubmitForm } from '@/shared/hooks/useSubmitForm.ts';
import { Button } from '@/shared/ui/Button.tsx';
import { FormInput } from '@/shared/ui/FormInput.tsx';

export function LoginForm() {
  const { submit, error, loading } = useSubmitForm<LoginInput, LoginResponse>(
    (input) => login(input)
  );
  const { login: storeLogin } = useAuthStore();
  const navigate = useNavigate();

  const form = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const emailValue = useWatch({ control: form.control, name: 'email' });
  const passwordValue = useWatch({ control: form.control, name: 'password' });

  const onSubmit = async (data: LoginInput) => {
    const result = await submit(data, { for: 'login' });

    if (result.success) {
      storeLogin(
        result.data.authenticate.accessToken,
        result.data.authenticate.userId
      );
      navigate('/dashboard');
    }
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
        value={passwordValue}
        error={form.formState.errors.password?.message}
        {...form.register('password')}
      />

      <Button
        variant="primary"
        isLoading={loading ? 'Вход' : ''}
        type="submit"
        className="mt-2"
      >
        Войти
      </Button>

      {error && (
        <div role="alert" className="text-error text-start">
          {error}
        </div>
      )}
    </form>
  );
}
