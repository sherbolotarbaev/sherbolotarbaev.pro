import {
  LoginDto,
  EditMeDto,
  EmailVerificationDto,
  ForgotPasswordDto,
  ResetPasswordDto,
} from "./dto";
import instance from "../core/axios";
import { deleteCookie } from "@/lib/utils/cookie";

type LoginResponse = {
  message: string;
  token: string;
};

type EmailVerificationResponse = {
  success: boolean;
};

export const logIn = async (dto: LoginDto): Promise<LoginResponse> => {
  try {
    return (await instance.post("/login", dto)).data;
  } catch (e: any) {
    throw {
      msg: e.response.data.message,
    };
  }
};

export const logOut = async (): Promise<void> => {
  deleteCookie("token");
};

export const getMe = async (): Promise<User> => {
  try {
    return (await instance.get("/me")).data;
  } catch (e: any) {
    throw {
      msg: e.response.data.message,
    };
  }
};

export const editMe = async (dto: EditMeDto): Promise<User> => {
  try {
    return (await instance.patch("/me", dto)).data;
  } catch (e: any) {
    throw {
      msg: e.response.data.message,
    };
  }
};

export const emailVerification = async (
  dto: EmailVerificationDto
): Promise<EmailVerificationResponse> => {
  try {
    return (await instance.post("/email-verification", dto)).data;
  } catch (e: any) {
    throw {
      msg: e.response.data.message,
    };
  }
};

export const forgotPassword = async (
  dto: ForgotPasswordDto
): Promise<string> => {
  try {
    return (await instance.post("/password/forgot", dto)).data;
  } catch (e: any) {
    throw {
      msg: e.response.data.message,
    };
  }
};

export const resetPassword = async (dto: ResetPasswordDto): Promise<string> => {
  try {
    return (await instance.post("/password/reset", dto)).data;
  } catch (e: any) {
    throw {
      msg: e.response.data.message,
    };
  }
};
