import React, { useCallback, useMemo } from "react";
import HomePodUI from "./HomePodUI";
import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";
import { useControls } from "leva";
import { songs } from "../../../Presets/Presets";
import MusicNote from "../../MusicNote/MusicNote";
import useMusicStore from "../../../Stores/useMusicStore";
import useInteraction from "../../../hooks/useInteraction";

const HomePod: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const playing = useMusicStore((state) => state.playing);
	const currentSong = useMusicStore((state) => state.currentSong);
	const toggle = useMusicStore((state) => state.toggle);
	const play = useMusicStore((state) => state.play);

	const handleHomePodClick = useCallback(() => {
		if (currentSong === null) {
			play(songs[0]);
		} else {
			toggle();
		}
	}, [currentSong, play, toggle]);

	const interaction = useInteraction({
		onClick: handleHomePodClick,
	});

	const { notePos } = useControls("MusicNotes", {
		notePos: { value: { x: -0.9, y: 2.7, z: -2.6 } },
	});

	const uiComponentProps = useMemo(
		() => ({
			data: {
				myData: { name, nodes, hovered: interaction.hovered },
			},
			functions: { myFunctions: { events: interaction.events } },
			refs: { myRefs: {} },
		}),
		[interaction.events, interaction.hovered, name, nodes],
	);
	return (
		<>
			<HomePodUI props={uiComponentProps} />
			<MusicNote playing={playing} position={[notePos.x, notePos.y, notePos.z]} />
		</>
	);
};

export default HomePod;
