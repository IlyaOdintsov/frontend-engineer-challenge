import { request, gql } from 'graphql-request';
import type {
  RegisterInput,
  LoginInput,
  ForgotInput,
  ResetPasswordInput,
} from '@/entities/auth/schemas';

const api = import.meta.env.VITE_GRAPHQL_URL || 'http://localhost:8000/graphql';

export type ApiResponse<T> = {
  data: T;
  errors?: Array<{ message: string }>;
};

export const register = async (
  input: RegisterInput
): Promise<ApiResponse<any>> =>
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

export const login = async (input: LoginInput): Promise<ApiResponse<any>> =>
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
): Promise<ApiResponse<any>> =>
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
): Promise<ApiResponse<any>> =>
  request(
    api,
    gql`
      mutation ($input: ResetPasswordInput!) {
        resetPassword(input: $input)
      }
    `,
    { input }
  );
