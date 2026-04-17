import { z } from 'zod';

export const emailSchema = z.string().email('Недопустимый адрес почты');
export const passwordSchema = z.string().min(12, 'Минимум 12 символов');

export const registerSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const forgotSchema = z.object({
  email: emailSchema,
});

export const resetSchema = z
  .object({
    token: z.string().min(1, 'Токен обязателен'),
    newPassword: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

export const resetPasswordInputSchema = z.object({
  token: z.string().min(1, 'Токен обязателен'),
  newPassword: passwordSchema,
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ForgotInput = z.infer<typeof forgotSchema>;
export type ResetInput = z.infer<typeof resetSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordInputSchema>;
