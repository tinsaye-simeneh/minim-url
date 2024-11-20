import { create } from "zustand";
import { Link } from "../types/models";

type LinkStore = {
  links: Link[];
  originalUrl: string;
  shortUrl: string;

  setOriginalUrl: (originalUrl: string) => void;
  setShortUrl: (shortUrl: string) => void;
};
export const useLinkStore = create<LinkStore>((set) => ({
  links: [],
  originalUrl: "",
  shortUrl: "",

  setOriginalUrl: (originalUrl) => set({ originalUrl }),
  setShortUrl: (shortUrl) => set({ shortUrl }),
}));
