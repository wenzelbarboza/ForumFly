import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { user } from "../types/api.return.types";

type userStateType = {
  loading: boolean;
  user: user | null;
  setLoading: (isLoading: boolean) => void;
  setUser: (userState: user | null) => void;
  setRole: (role: string) => void;
};

// TODO implement loading in homepage
//initially loading should be false
export const useUserStore = create<userStateType>()(
  devtools((set) => ({
    loading: true,
    user: null,
    setLoading: (isLoading) => set({ loading: isLoading }),
    setUser: (userState) => set({ user: userState }),
    setRole: (role) => {
      set((state) => {
        // it is never going to be null
        // since this is called inside a protected route
        if (state.user == null) {
          return state;
        }
        return {
          user: {
            ...state.user,
            role,
          },
        };
      });
    },
  }))
);
