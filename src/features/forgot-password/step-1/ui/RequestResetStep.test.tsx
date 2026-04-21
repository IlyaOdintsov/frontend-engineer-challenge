import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useSubmitForm } from '@/shared/hooks/useSubmitForm.ts';
import { RequestResetStep } from '@/features/forgot-password/step-1/ui/RequestResetStep.tsx';
import { BrowserRouter } from 'react-router-dom';

const mockSubmit = vi.fn();
vi.mock('@/shared/hooks/useSubmitForm', () => ({
  useSubmitForm: vi.fn(() => ({
    submit: mockSubmit,
    error: null,
    loading: false,
  })),
}));

describe('RequestResetStep', () => {
  const TestWrapper = (
    { onSuccess }: { onSuccess: () => void } = { onSuccess: vi.fn() }
  ) => (
    <BrowserRouter>
      <RequestResetStep onSuccess={onSuccess} />
    </BrowserRouter>
  );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('вызов onSuccess при успешном запросе', async () => {
    const onSuccess = vi.fn();

    mockSubmit.mockResolvedValueOnce({
      success: true,
      data: {},
    });

    const user = userEvent.setup();
    render(<TestWrapper onSuccess={onSuccess} />);

    const emailInput = screen.getByPlaceholderText('Введите e-mail');
    const button = screen.getByText('Восстановить пароль');

    await user.type(emailInput, 'test@example.com');
    await user.click(button);

    await vi.waitFor(() => {
      expect(onSuccess).toHaveBeenCalled();
    });
  });

  it('блокировка кнопки в состоянии loading', async () => {
    (useSubmitForm as any) = vi.fn(() => ({
      submit: mockSubmit,
      error: null,
      loading: true,
    }));

    const onSuccess = vi.fn();
    render(<TestWrapper onSuccess={onSuccess} />);

    const button = screen.getByText('Восстановление...');

    expect(button).toBeDisabled();
  });
});
