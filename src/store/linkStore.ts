import { create } from "zustand";
import { Link } from "../types/models";

interface LinksState {
  links: Link[];
  addLink: (link: Link) => void;
  removeLink: (id: string) => void;
}

export const useLinksStore = create<LinksState>((set) => ({
  links: [] as Link[],
  addLink: (link: Link) => set((state) => ({ links: [...state.links, link] })),
  removeLink: (id) =>
    set((state) => ({ links: state.links.filter((link) => link.id !== id) })),
}));
