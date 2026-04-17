import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { registerSchema, RegisterInput } from '@/entities/auth/schemas';
import { useCallback, useState } from 'react';
import { register } from '@/shared/api';

export function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const clearServerError = useCallback(() => {
    setError('');
    form.clearErrors();
  }, [form]);

  const onSubmit = async (data: RegisterInput) => {
    setLoading(true);
    setError('');

    try {
      await register(data);
      navigate('/login');
    } catch (err: any) {
      const graphqlError = err.response?.errors?.[0]?.message || err.message;

      const errorMap: Record<string, string> = {
        'already exists': 'Данный адрес уже занят',
        'Password must include a lowercase letter':
          'Пароль должен содержать строчную букву',
        'Password must include an uppercase letter':
          'Пароль должен содержать заглавную букву',
        default: 'Ошибка регистрации',
      };

      const userError =
        Object.entries(errorMap).find(([key]) =>
          graphqlError.includes(key)
        )?.[1] || errorMap['default'];

      setError(userError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4"
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
          <p className="text-red-500 text-xs mt-1">
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
          <p className="text-red-500 text-xs mt-1">
            {form.formState.errors.password.message}
          </p>
        )}
      </div>

      <div>
        <input
          {...form.register('confirmPassword', { onChange: clearServerError })}
          type="password"
          placeholder="Повторите пароль"
          disabled={loading}
          className="w-full p-3 border rounded"
        />
        {form.formState.errors.confirmPassword && (
          <p className="text-red-500 text-xs mt-1">
            {form.formState.errors.confirmPassword.message}
          </p>
        )}
      </div>

      {error && (
        <div
          role="alert"
          className="p-3 bg-red-100 border rounded text-red-800"
        >
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white p-3 rounded font-medium disabled:opacity-50"
      >
        {loading ? 'Регистрация...' : 'Зарегистрироваться'}
      </button>
    </form>
  );
}
