export interface SendEmailOtpDto {
  email: string;
}

export interface CheckEmailOtpDto {
  email: string;
  otp: string;
}
