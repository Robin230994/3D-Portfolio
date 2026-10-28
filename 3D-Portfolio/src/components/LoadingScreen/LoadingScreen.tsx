import { useProgress } from "@react-three/drei";
import { Volume2, VolumeOff } from "lucide-react";
import { FC, useState } from "react";
import { LoadingState } from "../../utils/Types";

interface ILoadingScreen {
	loadingState: LoadingState;
	onLoaded: () => void;
}

const LoadingScreen: FC<ILoadingScreen> = ({ loadingState, onLoaded }) => {
	const { active, progress } = useProgress();
	const isReady = !active && progress === 100;

	const [soundOn, setSoundOn] = useState(true);

	return (
		<div className={`loading-screen ${loadingState === "Revealing" ? "is-fading" : ""}`}>
			<div>
				<div className="logo-container">
					<img src="/images/ROBIN_DORT_LOGO_BLUE_DARK_BG.png" />
				</div>

				<div className="sound-container">
					{soundOn ? (
						<Volume2 color="#ccc" size={50} cursor={"pointer"} onClick={() => setSoundOn(false)} />
					) : (
						<VolumeOff color="#ccc" size={50} cursor={"pointer"} onClick={() => setSoundOn(true)} />
					)}

					<p>{soundOn ? "Sound on" : "Sound off"} </p>
				</div>
			</div>

			<div className="progress-loader">
				<input
					type="range"
					min={0}
					max={100}
					value={progress}
					style={{
						background: `linear-gradient(to right, #20c878 ${progress}%, rgba(255, 255, 255, 0.15) ${progress}%)`,
					}}
					readOnly
				/>
				<p>{progress < 100 ? `Preparing the room... ${progress.toFixed(0)}%` : active ? "Finalizing room..." : "Everything set up"}</p>
			</div>

			<button disabled={!isReady} onClick={onLoaded}>
				Enter room
			</button>
		</div>
	);
};

export default LoadingScreen;
