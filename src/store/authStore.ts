import { create } from "zustand";

interface AuthType {
  user: {
    user_name: string;
    email: string;
    user_id: string;
  };
  login: (email: string, user_id: string) => Promise<void>;
  loading: boolean;
  setLoading: (value: boolean) => void;
  error: string;
  setError: (error: string) => void
}

export const useAuthStore = create<AuthType>((set) => ({
  user: { user_name: "", email: "", user_id: "" },
  loading: false,
  setLoading: (value: boolean) => {
    set({loading: value})
  },
  error: "",
  setError: (error: string) => {
    set({error})
  },
  login: async (email: string, password: string) => {
    set({ loading: true });
    const response = await fetch(" http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email, password})
    });

    const data: any = await response.json();

    if(!response.ok){
      throw new Error(data?.message || "An error occured")
    }

    localStorage.setItem("auth_token", data?.token)
    set({user: data.user})
    console.log(data)
  },
}));
