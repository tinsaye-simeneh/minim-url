import { create } from "zustand";
import { Link } from "../types/models";

type LinkStore = {
  links: Link[];

  setLinks: (links: Link[]) => void;
  addLinkToStore: (links: Link) => void;
};

export const useLinkStore = create<LinkStore>((set) => ({
  links: [],
  setLinks: (links) => set({ links }),

  addLinkToStore: async ({
    original_url,
    short_url,
    user_id: userId,
  }: Link) => {
    const newLink = { original_url, short_url, user_id: userId };
    const response = await fetch("/api/shorten-link", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newLink),
    });

    if (!response.ok) {
      const data = await response.json();
      console.error("Error storing link:", data.error);
    }
  },
}));
