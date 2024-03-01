import instance from "@/../core/axios";
import { SendEmailOtpDto, CheckEmailOtpDto } from "./dto";

export const sendEmailOtp = async (
  dto: SendEmailOtpDto
): Promise<{ success: boolean }> => {
  try {
    return (await instance.post("/others/email-otp", dto)).data;
  } catch (e: any) {
    throw {
      msg: e.response.data.message,
    };
  }
};

export const checkEmailOtp = async (dto: CheckEmailOtpDto): Promise<User> => {
  try {
    return (await instance.post("/others/email-otp/check", dto)).data;
  } catch (e: any) {
    throw {
      msg: e.response.data.message,
    };
  }
};
