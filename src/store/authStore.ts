import { create } from "zustand";

interface AuthType {
  user: {
    fullName: string;
    email: string;
    password: string;
    accessToken?: string;
  };
  login: (email: string, password: string) => Promise<void>;
  loading: boolean;
}

export const useAuthStore = create<AuthType>((set) => ({
  user: { fullName: "", email: "", password: "", accessToken: "" },
  loading: false,
  login: async (email: string, password: string) => {
    try {
      set({ loading: true });
      const response = await fetch("http://localhost:3000/users");
      const data: AuthType["user"][] = await response.json();

      if (!response.ok) {
        return;
      }
      const userDetails = data.filter(
        (item) => item.email === email && item.password === password,
      );
      console.log(userDetails);
      if (userDetails[0]) {
        set({ user: userDetails[0] });
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
}));
