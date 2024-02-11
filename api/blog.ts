import axios from "axios";

const URL =
  "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@arbaevsherbolot1";

export const getPosts = async (): Promise<MediumApiResponse[]> => {
  try {
    return (await axios.get(URL)).data.items;
  } catch (e: any) {
    console.log(e);
    throw {
      msg: e.message || "Unknown error",
    };
  }
};
