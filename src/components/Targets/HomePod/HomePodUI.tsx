import React, { memo } from "react";
import { IUIComponentProps } from "../../../utils/Types";
import { DirectionalLight, Mesh } from "three";
import { iot2Material } from "../../../utils/Materials";
import { Detailed, Outlines } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";

interface HomePodUIProps extends IUIComponentProps {
	props: {
		data: {
			myData: {
				name: string;
				nodes: { [key: string]: Mesh | DirectionalLight };
				hovered: string | null;
			};
		};
		functions: {
			myFunctions: {
				events: {
					onPointerEnter: (e: ThreeEvent<PointerEvent>) => void;
					onPointerLeave: () => void;
					onClick: (e: ThreeEvent<MouseEvent>) => void;
				};
			};
		};
		refs: { myRefs: object };
	};
}

const HomePodUI: React.FC<HomePodUIProps> = ({ props }) => {
	const { myData } = props.data;
	const { myFunctions } = props.functions;

	const { name, nodes, hovered } = myData;
	const { events } = myFunctions;

	const HomePod = nodes["HomePod"] as Mesh;
	const HomePodLP = nodes["HomePod_LP"] as Mesh;

	return (
		<group {...events}>
			<group position={HomePod.position} rotation={HomePod.rotation} scale={HomePod.scale}>
				<Detailed distances={[0, 3]}>
					<mesh name={name} geometry={HomePod.geometry} material={iot2Material}>
						<Outlines thickness={2} scale={hovered === name ? 1 : 0} color={"white"} />
					</mesh>

					<mesh name={name} geometry={HomePodLP.geometry} material={iot2Material}>
						<Outlines thickness={2} scale={hovered === name ? 1 : 0} color={"white"} />
					</mesh>
				</Detailed>
			</group>
		</group>
	);
};

export default memo(HomePodUI);
