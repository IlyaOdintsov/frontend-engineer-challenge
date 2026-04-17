import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotSchema, ForgotInput } from '@/entities/auth/schemas';
import { useState } from 'react';
import { forgotPassword } from '@/shared/api';

interface Props {
  onSuccess: (email: string) => void;
}

export function RequestResetForm({ onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const form = useForm<ForgotInput>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = async (data: ForgotInput) => {
    setLoading(true);
    setError('');

    try {
      await forgotPassword(data);
      onSuccess(data.email);
    } catch (err: any) {
      setError(err.response?.errors?.[0]?.message || 'Ошибка отправки');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-2xl font-bold">Восстановление пароля</h2>

      <input
        {...form.register('email')}
        placeholder="Email"
        disabled={loading}
        className="w-full p-3 border rounded"
        aria-describedby={
          form.formState.errors.email ? 'email-error' : undefined
        }
      />

      {form.formState.errors.email && (
        <p id="email-error" className="text-red-500 text-xs" role="alert">
          {form.formState.errors.email.message}
        </p>
      )}

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
        className="w-full bg-blue-600 text-white p-3 rounded disabled:opacity-50"
        aria-label="Отправить ссылку на восстановление"
      >
        {loading ? 'Отправка...' : 'Отправить ссылку'}
      </button>
    </form>
  );
}
