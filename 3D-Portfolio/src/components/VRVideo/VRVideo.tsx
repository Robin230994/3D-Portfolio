import { FC } from "react";
import { useVRStore, VRTransition } from "../../Stores/useVRStore";
import { SquareX } from "lucide-react";

const VRVideo: FC = () => {
	const vrPhase = useVRStore((state) => state.vrPhase);
	const setVRPhase = useVRStore((state) => state.setVRPhase);

	const shouldShowOverlay = vrPhase === VRTransition.BLACKOUT || vrPhase === VRTransition.PLAYING || vrPhase === VRTransition.EXITING;

	return (
		<>
			{shouldShowOverlay && (
				<div className={`vr-video-container ${vrPhase === VRTransition.BLACKOUT ? "entering" : ""} ${vrPhase === VRTransition.EXITING ? "exiting" : ""}`}>
					<video src="" autoPlay={vrPhase === VRTransition.PLAYING} playsInline onEnded={() => setVRPhase(VRTransition.EXITING)} />
					<button onClick={() => setVRPhase(VRTransition.EXITING)}>
						<SquareX />
					</button>
				</div>
			)}
		</>
	);
};

export default VRVideo;
