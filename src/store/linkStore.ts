import { create } from "zustand";
import { Link } from "../types/models";

export const useLinkStore = create((set)) => ({
    originalUrl:"",
    shortUrl:"",
    links: [] as Link[],
    setOriginalUrl: (originalUrl: string) => set({ originalUrl }),
    setShortUrl: (shortUrl: string) => set({ shortUrl }),
    
});

