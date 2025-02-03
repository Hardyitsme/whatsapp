import { create } from "zustand";

interface AuthState {
  idInstance: string;
  apiTokenInstance: string;
  setAuth: (id: string, token: string) => void;
}

const loadFromLocalStorage = () => {
  return {
    idInstance: localStorage.getItem("idInstance") || "",
    apiTokenInstance: localStorage.getItem("apiTokenInstance") || "",
  };
};

export const useAuthStore = create<AuthState>((set) => ({
  ...loadFromLocalStorage(),
  setAuth: (id, token) => {
    localStorage.setItem("idInstance", id);
    localStorage.setItem("apiTokenInstance", token);
    set({ idInstance: id, apiTokenInstance: token });
  },
}));
