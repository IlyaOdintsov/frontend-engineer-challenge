import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { loginSchema, LoginInput } from '@/entities/auth/schemas';
import { useAuthStore } from '@/shared/store/authStore';
import { useCallback, useState } from 'react';
import { login } from '@/shared/api';

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login: storeLogin } = useAuthStore();
  const navigate = useNavigate();

  const form = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const clearServerError = useCallback(() => {
    setError('');
    form.clearErrors();
  }, [form]);

  const onSubmit = async (data: LoginInput) => {
    setLoading(true);
    setError('');

    try {
      const result = await login(data);
      storeLogin(
        result.data.authenticate.accessToken,
        result.data.authenticate.userId
      );
      navigate('/dashboard');
    } catch (error: any) {
      const graphqlError =
        error.response?.errors?.[0]?.message || error.message;

      graphqlError.includes('Invalid')
        ? setError('Введены неверные данные')
        : setError('Ошибка входа');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4 max-w-sm"
      autoComplete="off"
    >
      <div>
        <input
          {...form.register('email', { onChange: clearServerError })}
          placeholder="Email"
          disabled={loading}
          className="w-full p-3 border rounded"
        />
        {form.formState.errors.email && (
          <p className="text-red-500 text-xs">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      <div>
        <input
          {...form.register('password', { onChange: clearServerError })}
          type="password"
          placeholder="Пароль"
          disabled={loading}
          className="w-full p-3 border rounded"
        />
        {form.formState.errors.password && (
          <p className="text-red-500 text-xs">
            {form.formState.errors.password.message}
          </p>
        )}
      </div>

      {error && (
        <div role="alert" className="p-3 bg-red-100 text-red-800 rounded">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white p-3 rounded disabled:opacity-50"
      >
        {loading ? 'Вход...' : 'Войти'}
      </button>
    </form>
  );
}
