import { FC, useRef } from "react";
import { useVRStore, VRTransition } from "../../Stores/useVRStore";
import { SquareX } from "lucide-react";

const VRVideo: FC = () => {
	const vrPhase = useVRStore((state) => state.vrPhase);
	const setVRPhase = useVRStore((state) => state.setVRPhase);

	const videoRef = useRef<HTMLVideoElement>(null);
	const shouldShowOverlay = vrPhase === VRTransition.BLACKOUT || vrPhase === VRTransition.PLAYING || vrPhase === VRTransition.EXITING;

	const handlePhaseChange = () => {
		if (!videoRef.current) return;
		if (vrPhase === VRTransition.BLACKOUT) {
			setVRPhase(VRTransition.PLAYING);
			videoRef.current.play();
		} else if (vrPhase === VRTransition.PLAYING) {
			setVRPhase(VRTransition.EXITING);
			videoRef.current.pause();
		}
	};

	return (
		<>
			{shouldShowOverlay && (
				<div
					className={`vr-video-container ${vrPhase === VRTransition.BLACKOUT ? "entering" : ""} ${vrPhase === VRTransition.EXITING ? "exiting" : ""}`}
					onAnimationEnd={() => handlePhaseChange()}>
					<div className="vr-video-crop">
						<video
							src="/video/VR_video.mp4"
							ref={videoRef}
							playsInline
							onEnded={() => {
								setTimeout(() => {
									setVRPhase(VRTransition.EXITING);
								}, 1000);
							}}
						/>
					</div>
					<button onClick={() => handlePhaseChange()}>
						<SquareX />
					</button>
				</div>
			)}
		</>
	);
};

export default VRVideo;
