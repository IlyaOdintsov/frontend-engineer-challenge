import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { resetSchema, ResetInput } from '@/entities/auth/schemas';
import { resetPassword } from '@/shared/api';
import { useState } from 'react';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export function NewPasswordForm() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const navigate = useNavigate();
  const [status, setStatus] = useState<FormStatus>('idle');
  const [error, setError] = useState('');

  const form = useForm<ResetInput>({
    resolver: zodResolver(resetSchema),
    defaultValues: { token, newPassword: '', confirmPassword: '' },
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
      setError(
        err.response?.errors?.[0]?.message || 'Пароль не был восстановлен'
      );
      setStatus('error');
    }
  };

  if (!token) {
    return (
      <div className="p-8 text-center space-y-4">
        <h2 className="text-xl font-bold text-red-600">Неверная ссылка</h2>
        <p>Ссылка для восстановления недействительна</p>
        <button
          onClick={() => navigate('/password-recovery')}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Попробовать заново
        </button>
      </div>
    );
  }

  if (status === 'success') {
  }

  if (status === 'error') {
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-sm">
      <h2 className="text-2xl font-bold">Новый пароль</h2>

      <input {...form.register('token')} type="hidden" value={token} />

      <div>
        <input
          {...form.register('newPassword')}
          type="password"
          placeholder="Новый пароль (минимум 8 символов)"
          className="w-full p-3 border rounded"
        />
        {form.formState.errors.newPassword && (
          <p className="text-red-500 text-xs mt-1">
            {form.formState.errors.newPassword.message}
          </p>
        )}
      </div>

      <div>
        <input
          {...form.register('confirmPassword')}
          type="password"
          placeholder="Повторите пароль"
          className="w-full p-3 border rounded"
        />
        {form.formState.errors.confirmPassword && (
          <p className="text-red-500 text-xs mt-1">
            {form.formState.errors.confirmPassword.message}{' '}
          </p>
        )}
      </div>

      {error && (
        <div
          role="alert"
          aria-live="assertive"
          className="p-3 bg-red-100 border rounded text-red-800"
        >
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-green-600 text-white p-3 rounded font-medium disabled:opacity-50"
      >
        {status === 'loading' ? 'Сохранение...' : 'Сохранить новый пароль'}
      </button>
    </form>
  );
}
