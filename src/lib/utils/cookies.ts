import {
  ResponseCookie,
  ResponseCookies,
} from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export const getCookieValue = async (name: string): Promise<string> => {
  const value = cookies().get(name)?.value ?? "";
  return value;
};

export const getCookie = async (
  name: string
): Promise<ResponseCookie | undefined> => {
  const cookie = cookies().get(name);
  return cookie;
};

export const setCookie = async (
  name: string,
  value: string
): Promise<ResponseCookies> => {
  const cookie = cookies().set(name, value);
  return cookie;
};
