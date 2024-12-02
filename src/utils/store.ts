import { create } from "zustand";

interface AuthState {
  name: string;
  email: string;
  type: "INS" | "STF";
  access_token: string;
}

interface AuthStoreState {
  auth: AuthState | null;
  setAuth: (state: AuthState | null) => void;
}

const useAuthContext = create<AuthStoreState>((set) => ({
  auth: null,
  setAuth: (state) => {
    set({ auth: state });
  },
}));

export { useAuthContext };
