import { create } from "zustand";
import { ISong } from "../interfaces/GLlnterfaces";

interface IMusicStore {
	playing: boolean;
	currentSong: ISong | null;
	musicMenuOpen: boolean;

	play: (song: ISong) => void;
	stop: () => void;
	toggle: () => void;

	openMenu: () => void;
	closeMenu: () => void;
	toggleMenu: () => void;
}

const useMusicStore = create<IMusicStore>((set) => ({
	playing: false,
	currentSong: null,
	musicMenuOpen: false,

	play: (song) => set({ playing: true, currentSong: song }),
	stop: () => set({ playing: false, currentSong: null }),
	toggle: () =>
		set((state) => {
			console.log("toggle", state.playing, "->", !state.playing);

			return {
				playing: !state.playing,
			};
		}),

	openMenu: () => set({ musicMenuOpen: true }),
	closeMenu: () => set({ musicMenuOpen: false }),
	toggleMenu: () => set((state) => ({ musicMenuOpen: !state.musicMenuOpen })),
}));

export default useMusicStore;
