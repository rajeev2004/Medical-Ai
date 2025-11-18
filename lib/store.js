import { create } from "zustand";

export const useChatStore = create((set) => ({
  messages: [], 
  addMessage: (msg) =>
    set((state) => ({
      messages: [...state.messages, { ...msg, id: Date.now() }],
    })),
  clear: () => set({ messages: [] }),
}));
