import { useEffect, useRef } from "react";
import useMusicStore from "../../Stores/useMusicStore";

const MusicPlayer: React.FC = () => {
	const { currentSong, playing } = useMusicStore();
	const audioRef = useRef(new Audio());

	useEffect(() => {
		if (!currentSong) return;

		audioRef.current.src = currentSong.file;
		audioRef.current.play();
	}, [currentSong]);

	useEffect(() => {
		if (playing) {
			audioRef.current.play();
		} else {
			audioRef.current.pause();
		}
	}, [playing]);

	return null;
};

export default MusicPlayer;
