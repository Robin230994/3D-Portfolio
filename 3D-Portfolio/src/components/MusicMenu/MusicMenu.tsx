import { Music, X } from "lucide-react";
import { songs } from "../../Presets/Presets";
import useMusicStore from "../../Stores/useMusicStore";

const MusicMenu: React.FC = () => {
	const { play, musicMenuOpen, openMenu, closeMenu } = useMusicStore();
	return (
		<>
			<button className="music-menu-btn" onClick={() => openMenu()}>
				<Music className="music-icon" size={24} />
			</button>
			{musicMenuOpen && (
				<div className="music-menu">
					<div className="music-header">
						<button className="close-menu-btn" onClick={() => closeMenu()}>
							<X />
						</button>
					</div>
					<div className="music-body">
						{songs.map((song) => (
							<button
								key={song.id}
								onClick={() => {
									play(song);
								}}>
								{song.title}
							</button>
						))}
					</div>
				</div>
			)}
		</>
	);
};

export default MusicMenu;
