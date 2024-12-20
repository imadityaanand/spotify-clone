import { axiosInstance } from "@/lib/axios";
import {create} from "zustand";

interface chatStore {
    users: any[],
    isLoading: boolean,
    error: string | null,
    fetchUsers: () => Promise<void>;
}

export const useChatStore = create<chatStore>((set)=> ({
    users: [],
    isLoading: false,
    error: null,
    fetchUsers: async () => {
        set({ isLoading: true, error: null });
        try {
            const res = await axiosInstance.get("/users");
            set({ users: res.data });
        } catch (error:any) {
            set({ error: error.response.data.message });
        } finally {
			set({ isLoading: false });
		}
    }
}))