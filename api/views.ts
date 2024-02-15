import instance from "../core/axios";

export const addViews = async () => {
  try {
    return (await instance.post("/others/requests")).data;
  } catch (e: any) {
    throw {
      msg: e.response.data.message,
    };
  }
};

export const getViews = async () => {
  try {
    return (await instance.get("/others/requests")).data;
  } catch (e: any) {
    throw {
      msg: e.response.data.message,
    };
  }
};
