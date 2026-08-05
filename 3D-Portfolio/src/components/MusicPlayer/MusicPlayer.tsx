import { useEffect, useRef } from "react";
import useMusicStore from "../../Stores/useMusicStore";
import useMusicMetatadata from "../../hooks/useMusicMetadata";
import useMusicProgress from "../../hooks/useMusicProgress";
import useMusicPlaylist from "../../hooks/useMusicPlaylist";

const MusicPlayer: React.FC = () => {
	const { currentSong, playing, songDurations, playNext, setCurrentSongTime, setSongDuration } = useMusicStore();
	const audioRef = useRef(new Audio());

	useMusicMetatadata({ songDurations, setSongDuration });
	useMusicPlaylist({ playNext, audioRef });
	const { seek } = useMusicProgress({ setCurrentSongTime, audioRef });

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

	useEffect(() => {
		useMusicStore.setState({ seek });
	}, [seek]);

	return null;
};

export default MusicPlayer;
