export interface LoginDto {
  emailOrUsername: string;
  password: string;
}

export interface RegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export class EditMeDto {
  firstName?: string;
  lastName?: string;
  username?: string;
  nationality?: string;
  bio?: string;
  phone?: string;
}

export interface EmailVerificationDto {
  code: string;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  token: string;
  password: string;
}
