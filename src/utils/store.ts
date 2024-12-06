import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  id: string;
  name: string;
  email: string;
  type: "INS" | "STF";
}

interface AuthStoreState {
  auth: AuthState | null;
  setAuth: (state: AuthState | null) => void;
}

const useAuthContext = create<AuthStoreState>()(
  persist(
    (set) => ({
      auth: null,
      setAuth: (state) => {
        set({ auth: state });
      },
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

interface FilterState {
  search_name: string;
  range_h_index: number[];
  range_number_of_citation: number[];
  sort: "id" | "number_of_citation" | "h_index";
}

interface FilterStoreState {
  filter_state: FilterState;
  setFilterState: (state: FilterState) => void;
  setSearchName: (search_name: string) => void;
  setHIndex: (h_index: number[]) => void;
}
const useFilter = create<FilterStoreState>((set) => ({
  filter_state: {
    search_name: "",
    range_h_index: [0, 100],
    range_number_of_citation: [0, 100],
    sort: "id",
  },
  setFilterState: (state) => {
    set({ filter_state: state });
  },

  setSearchName: (search) => set((state) => ({ filter_state: { ...state.filter_state, search_name: search }, })),
  setHIndex: (h_index) => set((state) => ({ filter_state: { ...state.filter_state, h_index: h_index }, })),
}));

export { useAuthContext, useFilter };
