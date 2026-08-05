import { useCallback, useEffect } from "react";

interface IMusicProgress {
	setCurrentSongTime: (time: number) => void;
	audioRef: React.RefObject<HTMLAudioElement>;
}

const useMusicProgress = ({ setCurrentSongTime, audioRef }: IMusicProgress) => {
	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;

		const handleTimeUpdate = () => {
			setCurrentSongTime(audio.currentTime);
		};

		audio.addEventListener("timeupdate", handleTimeUpdate);

		return () => {
			audio.removeEventListener("timeupdate", handleTimeUpdate);
		};
	}, [setCurrentSongTime, audioRef]);

	const seek = useCallback(
		(time: number) => {
			const audio = audioRef.current;
			if (!audio) return;

			audio.currentTime = time;
			setCurrentSongTime(time);
		},
		[setCurrentSongTime, audioRef],
	);

	return { seek };
};

export default useMusicProgress;
