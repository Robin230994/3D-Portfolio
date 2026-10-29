import { AnimationEvent, FC, useRef } from "react";
import { useVRStore, VRTransition } from "../../stores/useVRStore";
import { SquareX } from "lucide-react";

const VRVideo: FC = () => {
	const vrPhase = useVRStore((state) => state.vrPhase);
	const setVRPhase = useVRStore((state) => state.setVRPhase);

	const videoRef = useRef<HTMLVideoElement>(null);
	const shouldShowOverlay = vrPhase === VRTransition.BLACKOUT || vrPhase === VRTransition.PLAYING || vrPhase === VRTransition.EXITING;

	const handleAnimationEnd = (event: AnimationEvent<HTMLDivElement>) => {
		if (!videoRef.current) return;

		if (event.animationName === "fadeIn" && vrPhase === VRTransition.BLACKOUT) {
			setVRPhase(VRTransition.PLAYING);
			videoRef.current.play();
		}

		if (event.animationName === "fadeOut" && vrPhase === VRTransition.EXITING) {
			setVRPhase(VRTransition.RETURNING);
			videoRef.current.pause();
		}
	};

	const closeVRExperience = () => {
		if (vrPhase !== VRTransition.PLAYING || !videoRef.current) return;
		videoRef.current.pause();
		setVRPhase(VRTransition.EXITING);
	};

	return (
		<>
			{shouldShowOverlay && (
				<div
					className={`vr-video-container ${vrPhase === VRTransition.BLACKOUT ? "entering" : ""} ${vrPhase === VRTransition.EXITING ? "exiting" : ""}`}
					onAnimationEnd={handleAnimationEnd}>
					<div className="vr-video-crop">
						<video src="/video/VR_video.mp4" ref={videoRef} playsInline onEnded={closeVRExperience} />
					</div>
					<button onClick={closeVRExperience}>
						<SquareX />
					</button>
				</div>
			)}
		</>
	);
};

export default VRVideo;
