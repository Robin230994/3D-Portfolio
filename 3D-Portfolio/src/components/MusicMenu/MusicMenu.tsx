import { ChevronLeft, ChevronRight, ListMusic, Music, Pause, Play, Volume2 } from "lucide-react";
import { useEffect, useState } from "react";
import { songs } from "../../Presets/Presets";
import useMusicStore from "../../Stores/useMusicStore";

const MusicMenu: React.FC = () => {
	const { musicMenuOpen, playing, currentSong, currentSongTime, songDurations, volume, setVolume, play, toggle, openMenu, closeMenu, playNext, playPrevious } =
		useMusicStore();
	const [renderMenu, setRenderMenu] = useState(musicMenuOpen);
	const [isClosing, setIsClosing] = useState(false);

	useEffect(() => {
		if (musicMenuOpen) {
			setIsClosing(false);
			setRenderMenu(true);
			return;
		}

		if (!renderMenu) return;
		setIsClosing(true);
		const hideMenu = window.setTimeout(() => setRenderMenu(false), 280);
		return () => window.clearTimeout(hideMenu);
	}, [musicMenuOpen, renderMenu]);

	const formatTime = (seconds: number) => {
		const min = Math.floor(seconds / 60);
		const sec = Math.floor(seconds % 60);

		return `${min}:${sec.toString().padStart(2, "0")}`;
	};

	const duration = currentSong ? (songDurations[currentSong.id] ?? 0) : 0;
	const progress = duration > 0 ? (currentSongTime / duration) * 100 : 0;

	return (
		<>
			<button className="music-menu-btn" onClick={() => (musicMenuOpen ? closeMenu() : openMenu())}>
				<Music className="music-icon" size={24} />
			</button>
			{renderMenu && (
				<div className={`music-menu ${isClosing ? "is-closing" : ""}`}>
					<div className="ipod-screen">
						<div className="ipod-screen-title">
							<ListMusic size={15} /> PLAYLIST
						</div>
						<div className="ipod-now-playing">{currentSong ? currentSong.title : "Select a song"}</div>
						<div className="ipod-progress">
							<span>{formatTime(currentSongTime)}</span>
							<progress value={progress} max="100" />
							<span>{formatTime(duration)}</span>
						</div>
					</div>
					<div className="music-body">
						{songs.map((song) => (
							<button
								key={song.id}
								className={`song-item ${currentSong?.id === song.id ? "active" : ""}`}
								onClick={() => {
									play(song);
								}}>
								<span>{song.title}</span>
								<span>{formatTime(songDurations[song.id] ?? 0)}</span>
							</button>
						))}
					</div>
					<div className="ipod-wheel">
						<button className="wheel-menu" onClick={closeMenu}>
							Close
						</button>
						<button className="wheel-previous" onClick={playPrevious}>
							<ChevronLeft />
						</button>
						<button className="wheel-next" onClick={playNext}>
							<ChevronRight />
						</button>
						<button className="wheel-play" onClick={() => (currentSong === null ? play(songs[0]) : toggle())}>
							{playing ? <Pause size={20} /> : <Play size={20} fill="currentColor" />}
						</button>
						<div className="volume-dial">
							<Volume2 size={15} />
							<strong>{Math.round(volume * 100)}</strong>
							<input type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => setVolume(Number(e.target.value))} />
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default MusicMenu;
