import React from "react";
import { IUIComponentProps } from "../../../types/GLTypes";
import { DirectionalLight, Mesh } from "three";
import { iot2Material } from "../../../Helper/GLMaterials";
import { Outlines } from "@react-three/drei";
import { ISong } from "../../../interfaces/GLlnterfaces";
import { songs } from "../../../Presets/Presets";
import { ThreeEvent } from "@react-three/fiber";

interface HomePodUIProps extends IUIComponentProps {
	props: {
		data: {
			myData: {
				name: string;
				nodes: { [key: string]: Mesh | DirectionalLight };
				hoveredObject: string | null;
				currentSong: ISong | null;
			};
		};
		functions: {
			myFunctions: {
				setHoveredObject: (objectName: string | null) => void;
				toggle: () => void;
				play: (song: ISong) => void;
			};
		};
		refs: { myRefs: object };
	};
}

const HomePodUI: React.FC<HomePodUIProps> = ({ props }) => {
	const { myData } = props.data;
	const { myFunctions } = props.functions;

	const { name, nodes, hoveredObject, currentSong } = myData;
	const { setHoveredObject, toggle, play } = myFunctions;

	const HomePod = nodes["HomePod"] as Mesh;

	return (
		<group
			name={name}
			onPointerOver={() => {
				setHoveredObject(name);
			}}
			onPointerOut={() => setHoveredObject(null)}
			onClick={(e: ThreeEvent<MouseEvent>) => {
				e.stopPropagation();
				console.log(currentSong);
				if (currentSong === null) {
					play(songs[0]);
				} else {
					console.log(currentSong);
					toggle();
				}
			}}>
			<mesh geometry={HomePod.geometry} position={HomePod.position} rotation={HomePod.rotation} scale={HomePod.scale} material={iot2Material}>
				<Outlines thickness={2} scale={hoveredObject === name ? 1 : 0} color={"white"} />
			</mesh>
		</group>
	);
};

export default HomePodUI;
