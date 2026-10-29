import { useEffect } from "react";

interface IUseMusicPlaylist {
	audioRef: React.RefObject<HTMLAudioElement>;
	playNext: () => void;
}

const useMusicPlaylist = ({ audioRef, playNext }: IUseMusicPlaylist) => {
	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;

		const handleEnded = () => {
			playNext();
		};

		audio.addEventListener("ended", handleEnded);

		return () => {
			audio.removeEventListener("ended", handleEnded);
		};
	}, [audioRef, playNext]);
};

export default useMusicPlaylist;
