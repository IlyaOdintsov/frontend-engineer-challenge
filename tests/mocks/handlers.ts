import {
  RegisterResponse,
  LoginResponse,
  ForgotResponse,
} from '../../src/shared/api';

import { graphql } from 'msw';

export const handlers = [
  graphql.mutation<
    RegisterResponse,
    { input: { email: string; password: string } }
  >('Register', (req, res, ctx) => {
    const { email, password } = req.variables.input;

    if (email === 'exist@example.com') {
      return res(ctx.errors([{ message: 'already exists' }]));
    }

    if (password.length < 12) {
      return res(
        ctx.errors([
          { message: 'Password must be at least 12 characters long' },
        ])
      );
    }

    if (!/[a-z]/.test(password)) {
      return res(
        ctx.errors([{ message: 'Password must include a lowercase letter' }])
      );
    }

    if (!/[A-Z]/.test(password)) {
      return res(
        ctx.errors([{ message: 'Password must include an uppercase letter' }])
      );
    }

    return res(
      ctx.data({
        register: {
          id: '1',
          email,
          isActive: true,
          createdAt: new Date().toISOString(),
        },
      })
    );
  }),

  graphql.mutation<
    LoginResponse,
    { input: { email: string; password: string } }
  >('Authenticate', (req, res, ctx) => {
    const { email, password } = req.variables.input;

    if (email !== 'test@example.com' || password !== 'ValidPass123') {
      return res(ctx.errors([{ message: 'Invalid credentials' }]));
    }

    return res(
      ctx.data({
        authenticate: {
          accessToken: 'mocked-access-token',
          userId: '1',
        },
      })
    );
  }),

  graphql.mutation<ForgotResponse, { input: { email: string } }>(
    'RequestPasswordReset',
    (req, res, ctx) => {
      const { email } = req.variables.input;

      return res(
        ctx.data({
          requestPasswordReset: {
            ok: true,
            deliveryMode: 'email',
            resetUrlPreview: `https://example.com/reset?token=reset-token-for-${email}`,
          },
        })
      );
    }
  ),

  graphql.mutation<
    { resetPassword: boolean },
    { input: { token: string; newPassword: string } }
  >('ResetPassword', (req, res, ctx) => {
    const { token, newPassword } = req.variables.input;

    if (token === 'expired') {
      return res(ctx.errors([{ message: 'Token expired' }]));
    }

    if (newPassword.length < 12) {
      return res(
        ctx.errors([
          { message: 'Password must be at least 12 characters long' },
        ])
      );
    }

    return res(ctx.data(true));
  }),
];
