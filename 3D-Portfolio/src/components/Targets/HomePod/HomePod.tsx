import React from "react";
import HomePodUI from "./HomePodUI";
import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";
import { useObjectInteractionStore } from "../../../Stores/useObjectInteractionStore";
import { useControls } from "leva";
import MusicNote from "../../MusicNote/MusicNote";
import useMusicStore from "../../../Stores/useMusicStore";

const HomePod: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const { playing, currentSong, toggle, play } = useMusicStore();
	const { hoveredObject, setHoveredObject } = useObjectInteractionStore();

	const { notePos } = useControls("MusicNotes", {
		notePos: { value: { x: -0.9, y: 2.7, z: -2.6 } },
	});

	const uiComponentProps = {
		data: {
			myData: { name, nodes, hoveredObject, currentSong },
		},
		functions: { myFunctions: { setHoveredObject, toggle, play } },
		refs: { myRefs: {} },
	};
	return (
		<>
			<HomePodUI props={uiComponentProps} />
			<MusicNote playing={playing} position={[notePos.x, notePos.y, notePos.z]} />
		</>
	);
};

export default HomePod;
