import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { userEvent } from '@testing-library/user-event';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginInput } from '@/entities/auth/schemas';
import { LoginForm } from './LoginForm';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import { useSubmitForm } from '@/shared/hooks/useSubmitForm.ts';

const mockLogin = vi.fn();
vi.mock('@/shared/store/authStore', () => ({
  useAuthStore: () => ({
    login: mockLogin,
  }),
}));

const mockSubmit = vi.fn();

vi.mock('@/shared/hooks/useSubmitForm', () => ({
  useSubmitForm: vi.fn(() => ({
    submit: mockSubmit,

    error: null,
    loading: false,
  })),
}));

describe('LoginForm', () => {
  const TestWrapper = () => {
    const form = useForm<LoginInput>({
      resolver: zodResolver(loginSchema),
    });

    return (
      <BrowserRouter>
        <FormProvider {...form}>
          <LoginForm />
        </FormProvider>
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();

    mockSubmit.mockResolvedValue({
      success: false,
      error: 'Введены неверные данные',
    });
  });

  it('успешная отправка формы с валидными e-mail и паролем', async () => {
    mockSubmit.mockResolvedValueOnce({
      success: true,
      data: {
        authenticate: {
          accessToken: 'mocked-token',
          userId: '1',
        },
      },
    });

    render(<TestWrapper />);

    const emailInput = screen.getByPlaceholderText('Введите e-mail');
    const passwordInput = screen.getByPlaceholderText('Введите пароль');
    const button = screen.getByText('Войти');

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'ValidPass123');
    await userEvent.click(button);

    expect(mockSubmit).toHaveBeenCalledWith(
      { email: 'test@example.com', password: 'ValidPass123' },
      { for: 'login' }
    );
    expect(mockLogin).toHaveBeenCalledWith('mocked-token', '1');
  });

  it('блокировка кнопки в состоянии loading', async () => {
    const mockSubmit = vi.fn().mockResolvedValue({
      success: true,
      data: { authenticate: { accessToken: '123', userId: '1' } },
    });

    (useSubmitForm as any) = vi.fn(() => ({
      submit: mockSubmit,
      error: null,
      loading: true,
    }));

    render(<TestWrapper />);

    const button = screen.getByText('Вход...');

    expect(button).toBeDisabled();
  });
});
