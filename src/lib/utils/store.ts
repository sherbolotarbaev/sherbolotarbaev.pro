import { atom } from "jotai";

export const responseAtom = atom<string>("");
export const textAtom = atom<string>("");
export const filesAtom = atom<File[] | null>(null);
