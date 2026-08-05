import { AudioLines, ChevronLeft, ChevronRight, Music, Play, PlayOff } from "lucide-react";
import { songs } from "../../Presets/Presets";
import useMusicStore from "../../Stores/useMusicStore";

const MusicMenu: React.FC = () => {
	const { musicMenuOpen, playing, currentSong, currentSongTime, songDurations, seek, play, toggle, openMenu, closeMenu, playNext, playPrevious } =
		useMusicStore();

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
			{musicMenuOpen && (
				<div className="music-menu">
					<div className="music-header">
						<h1>Music Vibes</h1>
					</div>
					<div className="music-body">
						<div className="music-soundwaves">
							<AudioLines />
						</div>
						{songs.map((song) => (
							<div
								key={song.id}
								className={`song-item ${currentSong?.id === song.id ? "active" : ""}`}
								onClick={() => {
									play(song);
								}}>
								<p>{song.title}</p>
								<p>{formatTime(songDurations[song.id] ?? 0)}</p>
							</div>
						))}
					</div>
					<div className="music-footer">
						<p className="music-played-song">{currentSong ? currentSong.title : "No song selected"}</p>
						<div className="music-playtime">
							<span>{formatTime(currentSongTime)}</span>
							<input
								type="range"
								min={0}
								max={currentSong ? (songDurations[currentSong.id] ?? 0) : 0}
								value={currentSongTime}
								onChange={(e) => seek(parseFloat(e.target.value))}
								style={{
									background: `linear-gradient(
									to right,
									black 0%,
									black ${progress}%,
									rgba(204,204,204,1) ${progress}%,
									rgba(204,204,204,1) 100%
								)`,
								}}
								disabled={!currentSong}
							/>
							<span>{currentSong ? formatTime(songDurations[currentSong.id] ?? 0) : 0}</span>
						</div>
						<div>
							<ChevronLeft className="music-prev" onClick={() => playPrevious()} />
							{playing ? (
								<PlayOff className="music-play" onClick={() => toggle()} />
							) : (
								<Play
									className="music-play"
									onClick={() => {
										if (currentSong === null) {
											play(songs[0]);
										} else {
											toggle();
										}
									}}
								/>
							)}
							<ChevronRight className="music-next" onClick={() => playNext()} />
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default MusicMenu;
