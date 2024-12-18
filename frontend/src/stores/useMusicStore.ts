import { axiosInstance } from "@/lib/axios";
import { Album, Song } from "@/types";
import {create} from "zustand";

interface musicStore {
    songs: Song[],
    albums: Album[],
    isLoading: boolean,
    error: string | null,
    currentAlbum: Album | null,
    fetchAlbums: () => Promise<void>
    fetchAlbumById: (id:string) => Promise<void>
}

export const useMusicStore = create<musicStore>((set)=> ({
    albums: [],
    songs: [],
    isLoading: false,
    error: null,
    currentAlbum: null,

    fetchAlbums: async ()=>{
        set({ isLoading: true, error: null })
        try {
            const res = await axiosInstance.get("/albums");
            set({albums: res.data});
        } catch (error:any) {
            set({error: error.response.data.message})
        } finally {
            set({isLoading: false});
        }
    },
    fetchAlbumById: async (id) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get(`/albums/${id}`);
			set({ currentAlbum: response.data });
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},
}));