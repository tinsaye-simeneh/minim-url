import { create } from "zustand";

interface Link {
  id: string;
  original_url: string;
  short: string;
}

interface LinksState {
  links: Link[];
  addLink: (link: Link) => void;
  removeLink: (id: string) => void;
}

export const useLinksStore = create<LinksState>((set) => ({
  links: [],
  addLink: (link) => set((state) => ({ links: [...state.links, link] })),
  removeLink: (id) =>
    set((state) => ({ links: state.links.filter((link) => link.id !== id) })),
}));
