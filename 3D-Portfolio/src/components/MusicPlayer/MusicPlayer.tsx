import { useEffect, useRef } from "react";
import useMusicStore from "../../Stores/useMusicStore";

const MusicPlayer: React.FC = () => {
	const { currentSong, playing, playNext } = useMusicStore();
	const audioRef = useRef(new Audio());

	useEffect(() => {
		const audio = audioRef.current;

		const handleEnded = () => {
			playNext();
		};

		audio.addEventListener("ended", handleEnded);

		return () => {
			audio.removeEventListener("ended", handleEnded);
		};
	}, [playNext]);

	useEffect(() => {
		if (!currentSong || !playing) {
			audioRef.current.pause();
			return;
		}

		audioRef.current.src = currentSong.file;

		if (playing) {
			audioRef.current.play();
		}
	}, [currentSong, playing]);

	return null;
};

export default MusicPlayer;
