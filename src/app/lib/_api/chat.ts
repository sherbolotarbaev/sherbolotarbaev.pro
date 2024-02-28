import instance from "@/../core/axios";
import { CreateChatDto, CreateConversationDto } from "./dto";

export const createChat = async (dto: CreateChatDto) => {
  try {
    return (await instance.post("/chat", dto)).data;
  } catch (e: any) {
    throw {
      msg: e.response.data.message,
    };
  }
};

export const getChats = async () => {
  try {
    return (await instance.get("/chat")).data;
  } catch (e: any) {
    throw {
      msg: e.response.data.message,
    };
  }
};

export const getChat = async (chatId: string) => {
  try {
    return (await instance.get(`/chat/${chatId}`)).data;
  } catch (e: any) {
    throw {
      msg: e.response.data.message,
    };
  }
};

export const createConversation = async (
  chatId: string,
  dto: CreateConversationDto
) => {
  try {
    return (await instance.post(`/chat/${chatId}/conversation`, dto)).data;
  } catch (e: any) {
    throw {
      msg: e.response.data.message,
    };
  }
};

export const getConversations = async (chatId: string) => {
  try {
    return (await instance.get(`/chat/${chatId}/conversation`)).data;
  } catch (e: any) {
    throw {
      msg: e.response.data.message,
    };
  }
};
