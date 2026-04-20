import { request, gql } from 'graphql-request';
import type {
  RegisterInput,
  LoginInput,
  ForgotInput,
  ResetPasswordInput,
  EmailType,
} from '@/entities/auth/schemas';

const api = import.meta.env.VITE_GRAPHQL_URL || 'http://localhost:8000/graphql';

export type ApiResponse<T> = {
  data: T;
  errors?: Array<{ message: string }>;
};

export type RegisterResponse = {
  register: {
    id: string;
    email: EmailType;
    isActive: boolean;
    createdAt: string;
  };
};

export type LoginResponse = {
  authenticate: {
    accessToken: string;
    userId: string;
  };
};

export type ForgotResponse = {
  requestPasswordReset: {
    ok: boolean;
    deliveryMode: string;
    resetUrlPreview: string;
  };
};

export type ResetResponse = boolean;

export const register = async (
  input: RegisterInput
): Promise<ApiResponse<RegisterResponse>> =>
  request(
    api,
    gql`
      mutation ($input: RegisterUserInput!) {
        register(input: $input) {
          id
          email
          isActive
          createdAt
        }
      }
    `,
    { input: { email: input.email, password: input.password } }
  );

export const login = async (
  input: LoginInput
): Promise<ApiResponse<LoginResponse>> =>
  request(
    api,
    gql`
      mutation ($input: AuthenticateInput!) {
        authenticate(input: $input) {
          accessToken
          userId
        }
      }
    `,
    { input }
  );

export const forgotPassword = async (
  input: ForgotInput
): Promise<ApiResponse<ForgotResponse>> =>
  request(
    api,
    gql`
      mutation ($input: RequestResetInput!) {
        requestPasswordReset(input: $input) {
          ok
          deliveryMode
          resetUrlPreview
        }
      }
    `,
    { input }
  );

export const resetPassword = async (
  input: ResetPasswordInput
): Promise<ApiResponse<ResetResponse>> =>
  request(
    api,
    gql`
      mutation ($input: ResetPasswordInput!) {
        resetPassword(input: $input)
      }
    `,
    { input }
  );
