import { SendMessageDto } from "./dto";
import instance from "../core/axios";

export const sendMessage = async (dto: SendMessageDto) => {
  try {
    return (await instance.post("/others/message", dto)).data;
  } catch (e: any) {
    throw {
      msg: e.response.data.message,
    };
  }
};
