import { create } from "zustand";
import { ISong } from "../interfaces/GLlnterfaces";
import { songs } from "../Presets/Presets";

interface IMusicStore {
	songs: ISong[];
	playing: boolean;
	currentSong: ISong | null;
	musicMenuOpen: boolean;

	play: (song: ISong) => void;
	playNext: () => void;
	playPrevious: () => void;
	stop: () => void;
	toggle: () => void;

	openMenu: () => void;
	closeMenu: () => void;
	toggleMenu: () => void;
}

const useMusicStore = create<IMusicStore>((set) => ({
	songs: songs,
	playing: false,
	currentSong: null,
	musicMenuOpen: false,

	play: (song) => set({ playing: true, currentSong: song }),
	playNext: () =>
		set((state) => {
			if (!state.currentSong) return state;
			const currentIndex = state.songs.findIndex((song) => song.id === state.currentSong!.id);

			const nextIndex = (currentIndex + 1) % state.songs.length;

			return {
				currentSong: state.songs[nextIndex],
				playing: true,
			};
		}),
	playPrevious: () =>
		set((state) => {
			if (!state.currentSong) return state;
			const currentIndex = state.songs.findIndex((song) => song.id === state.currentSong!.id);

			const previousIndex = (currentIndex - 1) % state.songs.length;

			return {
				currentSong: state.songs[previousIndex],
				playing: true,
			};
		}),
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
