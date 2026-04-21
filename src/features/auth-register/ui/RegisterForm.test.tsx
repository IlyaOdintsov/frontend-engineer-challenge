import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterInput } from '@/entities/auth/schemas';
import { RegisterForm } from './RegisterForm';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { useSubmitForm } from '@/shared/hooks/useSubmitForm.ts';

const mockRegister = vi.fn();
vi.mock('@/shared/store/authStore', () => ({
  useAuthStore: () => ({
    register: mockRegister,
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

describe('RegisterForm', () => {
  const TestWrapper = () => {
    const form = useForm<RegisterInput>({
      resolver: zodResolver(registerSchema),
    });

    return (
      <BrowserRouter>
        <FormProvider {...form}>
          <RegisterForm />
        </FormProvider>
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();

    mockSubmit.mockResolvedValue({
      success: false,
      error: 'Ошибка регистрации',
    });
  });

  it('успешная отправка формы с валидными данными', async () => {
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
    const confirmPasswordInput =
      screen.getByPlaceholderText('Повторите пароль');
    const button = screen.getByText('Зарегистрироваться');

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'ValidPass123');
    await userEvent.type(confirmPasswordInput, 'ValidPass123');
    await userEvent.click(button);

    expect(mockSubmit).toHaveBeenCalledWith(
      {
        email: 'test@example.com',
        password: 'ValidPass123',
        confirmPassword: 'ValidPass123',
      },
      { for: 'register' }
    );
  });

  it('блокировка кнопки в состоянии loading', async () => {
    (useSubmitForm as any) = vi.fn(() => ({
      submit: mockSubmit,
      error: null,
      loading: true,
    }));

    render(<TestWrapper />);

    const button = screen.getByText('Регистрация...');

    expect(button).toBeDisabled();
  });
});
