import { create } from "zustand";
import { Link } from "../types/models";

type LinkStore = {
  links: Link[];
  setLinks: (links: Link[]) => void;
  addLinkToStore: (link: Omit<Link, "id" | "created_at">) => Promise<void>;
  isShortUrlUnique: (short_url: string) => Promise<boolean>;
  fetchLinks: () => Promise<void>;
};

export const useLinkStore = create<LinkStore>((set) => ({
  links: [],
  setLinks: (links) => set({ links }),

  isShortUrlUnique: async (short_url) => {
    const response = await fetch(`/api/check-url?short_url=${short_url}`);
    if (response.ok) {
      const { exists } = await response.json();
      return !exists;
    }
    throw new Error("Failed to check URL uniqueness.");
  },

  fetchLinks: async () => {
    try {
      const response = await fetch("/api/links");
      const data: Link[] = await response.json();
      set({ links: data });
    } catch (error) {
      console.error("Error fetching links:", error);
    }
  },

  addLinkToStore: async ({
    original_url,
    short_url,
    user_id,
  }: Omit<Link, "id" | "created_at">) => {
    const isUnique = await (async function checkUnique(
      url: string
    ): Promise<string> {
      let unique = false;
      let newShortUrl = url;

      while (!unique) {
        unique = await useLinkStore.getState().isShortUrlUnique(newShortUrl);
        if (!unique) {
          newShortUrl = Math.random().toString(36).substring(2, 8);
        }
      }
      return newShortUrl;
    })(short_url);

    const newLink = { original_url, short_url: isUnique, user_id };
    const response = await fetch("/api/shorten-link", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newLink),
    });

    if (response.ok) {
      const data = await response.json();
      set((state) => ({ links: [...state.links, data] }));
    } else {
      const errorData = await response.json();
      console.error("Error storing link:", errorData.error);
    }
  },
}));
