import React, { useMemo } from "react";
import HomePodUI from "./HomePodUI";
import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";
import { useControls } from "leva";
import { songs } from "../../../Presets/Presets";
import MusicNote from "../../MusicNote/MusicNote";
import useMusicStore from "../../../Stores/useMusicStore";
import useInteraction from "../../../hooks/useInteraction";

const HomePod: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const { playing, currentSong, toggle, play } = useMusicStore();

	const interaction = useInteraction({
		onClick: () => {
			if (currentSong === null) {
				play(songs[0]);
			} else {
				toggle();
			}
		},
	});

	const { notePos } = useControls("MusicNotes", {
		notePos: { value: { x: -0.9, y: 2.7, z: -2.6 } },
	});

	const musicNotePosition = useMemo(() => [notePos.x, notePos.y, notePos.z] as [number, number, number], [notePos.x, notePos.y, notePos.z]);

	const uiComponentProps = {
		data: {
			myData: { name, nodes, hovered: interaction.hovered },
		},
		functions: { myFunctions: { events: interaction.events } },
		refs: { myRefs: {} },
	};
	return (
		<>
			<HomePodUI props={uiComponentProps} />
			<MusicNote playing={playing} position={musicNotePosition} />
		</>
	);
};

export default HomePod;
