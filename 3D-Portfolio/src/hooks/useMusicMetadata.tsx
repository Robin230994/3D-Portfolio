import { useEffect } from "react";
import { songs } from "../Presets/Presets";

interface IMusicMetadata {
	songDurations: Record<number, number>;
	setSongDuration: (songId: number, duration: number) => void;
}

const useMusicMetatadata = ({ songDurations, setSongDuration }: IMusicMetadata) => {
	// Load metadata (duration) for all songs once
	useEffect(() => {
		songs.forEach((song) => {
			if (songDurations[song.id]) return;

			const audio = new Audio(song.file);
			audio.preload = "metadata";

			audio.onloadedmetadata = () => {
				setSongDuration(song.id, audio.duration);
			};
		});
	}, [songDurations, setSongDuration]);
};

export default useMusicMetatadata;
