import { useState } from 'react';
import { handleGraphQLError } from '@/shared/lib/errors';
import { ApiResponse } from '@/shared/api';

type SubmitFn<TInput, TResponse> = (
  input: TInput
) => Promise<ApiResponse<TResponse>>;

export type SubmitResult<TData> =
  | { success: true; data: TData }
  | { success: false; error: string };

export function useSubmitForm<TInput, TResponse>(
  submitFn: SubmitFn<TInput, TResponse>
) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (
    data: TInput,
    options: { for: 'register' | 'login' | 'forgot' | 'reset' }
  ): Promise<SubmitResult<TResponse>> => {
    setLoading(true);
    setError(null);

    try {
      const result = await submitFn(data);
      return { success: true, data: result as TResponse };
    } catch (err: any) {
      const userError = handleGraphQLError(err, options);
      setError(userError);
      return { success: false, error: userError };
    } finally {
      setLoading(false);
    }
  };

  return {
    submit,
    error,
    loading,
  };
}
