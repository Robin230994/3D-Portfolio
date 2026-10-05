import { useEffect, useRef } from "react";
import useMusicStore from "../../Stores/useMusicStore";
import useMusicMetatadata from "../../hooks/useMusicMetadata";
import useMusicProgress from "../../hooks/useMusicProgress";
import useMusicPlaylist from "../../hooks/useMusicPlaylist";

const MusicPlayer: React.FC = () => {
	const { currentSong, playing, volume, songDurations, playNext, setCurrentSongTime, setSongDuration } = useMusicStore();
	const audioRef = useRef(new Audio());

	useMusicMetatadata({ songDurations, setSongDuration });
	useMusicPlaylist({ playNext, audioRef });
	const { seek } = useMusicProgress({ setCurrentSongTime, audioRef });

	useEffect(() => {
		audioRef.current.volume = volume;
	}, [volume]);

	useEffect(() => {
		const audio = audioRef.current;
		if (!currentSong) return;

		audio.src = currentSong.file;
		audio.currentTime = 0;
	}, [currentSong]);

	useEffect(() => {
		const audio = audioRef.current;
		if (!currentSong) return;

		if (playing) {
			audio.play();
		} else {
			audio.pause();
		}
	}, [currentSong, playing]);

	useEffect(() => {
		useMusicStore.setState({ seek });
	}, [seek]);

	return null;
};

export default MusicPlayer;
