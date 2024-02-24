import instance from "@/../core/axios";

export const transcribeAudio = async (audioBlob: Blob) => {
  const formData = new FormData();
  formData.append("audio", audioBlob);

  try {
    return (await instance.post("/chat-gpt/transcribe", formData)).data;
  } catch (e: any) {
    throw {
      msg: e.response.data.message,
    };
  }
};
