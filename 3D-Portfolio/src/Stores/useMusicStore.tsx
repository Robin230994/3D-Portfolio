import { create } from "zustand";
import { ISong } from "../interfaces/GLlnterfaces";
import { songs } from "../Presets/Presets";

interface IMusicStore {
	songs: ISong[];
	playing: boolean;
	currentSong: ISong | null;
	currentSongTime: number;
	songDurations: Record<number, number>;
	musicMenuOpen: boolean;
	volume: number;

	play: (song: ISong) => void;
	playNext: () => void;
	playPrevious: () => void;
	stop: () => void;
	toggle: () => void;
	setSongDuration: (songId: number, duration: number) => void;
	setCurrentSongTime: (time: number) => void;
	setVolume: (volume: number) => void;
	seek: (time: number) => void;

	openMenu: () => void;
	closeMenu: () => void;
	toggleMenu: () => void;
}

const useMusicStore = create<IMusicStore>((set) => ({
	songs: songs,
	playing: false,
	currentSong: null,
	currentSongTime: 0,
	songDurations: {},
	musicMenuOpen: false,
	volume: 0.75,

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

			const previousIndex = (currentIndex - 1 + state.songs.length) % state.songs.length;

			return {
				currentSong: state.songs[previousIndex],
				playing: true,
			};
		}),
	stop: () => set({ playing: false, currentSong: null }),
	toggle: () =>
		set((state) => {
			return {
				playing: !state.playing,
			};
		}),

	setSongDuration: (songId, duration) =>
		set((state) => ({
			songDurations: {
				...state.songDurations,
				[songId]: duration,
			},
		})),

	setCurrentSongTime: (time) => set({ currentSongTime: time }),
	setVolume: (volume) => set({ volume: Math.min(1, Math.max(0, volume)) }),
	seek: (time) => set({ currentSongTime: time }),

	openMenu: () => set({ musicMenuOpen: true }),
	closeMenu: () => set({ musicMenuOpen: false }),
	toggleMenu: () => set((state) => ({ musicMenuOpen: !state.musicMenuOpen })),
}));

export default useMusicStore;
