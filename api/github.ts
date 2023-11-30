import axios from "axios";

export const getMe = async () => {
  return (await axios.get("https://api.github.com/users/arbaevsherbolot")).data;
};
