import { create } from "zustand";

interface AuthType {
  user: {
    user_name: string;
    email: string;
    user_id: string;
  } | null;
  login: (email: string, user_id: string) => Promise<void>;
  loading: boolean;
  setLoading: (value: boolean) => void;
  error: string;
  setError: (error: string) => void;
  setUser: (user: AuthType["user"]) => void;
  checkAuth: () => void;
  reset: () => void
}

export const useAuthStore = create<AuthType>((set) => ({
  user: null,
  setUser: (user: AuthType["user"]) => set({ user }),
  loading: true,
  setLoading: (value: boolean) => {
    set({ loading: value });
  },
  error: "",
  setError: (error: string) => {
    set({ error });
  },
  checkAuth: async () => {
    const token = localStorage.getItem("auth_token");

    // If no token, stop loading and leave user as null
    if (!token) {
      set({ user: null, loading: false });
      return;
    }

    try {
      // Ping your API to verify the token is still valid
      const response = await fetch("http://localhost:3000/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        // Token is good, set the user!
        set({ user: userData, loading: false });
      } else {
        // Token is expired or invalid. Clean it up.
        localStorage.removeItem("token");
        set({ user: null, loading: false });
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      set({ user: null, loading: false });
    }
  },
  login: async (email: string, password: string) => {
    set({ loading: true });
    const response = await fetch(" http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data: any = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "An error occured");
    }

    localStorage.setItem("auth_token", data?.token);
    set({ user: data.user });
  },
  reset: () => {set({user: null})}
}));
