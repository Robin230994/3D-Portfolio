import React, { RefObject } from "react";
import InteractionLabel from "../../InteractionLabel/InteractionLabel";

import { IUIComponentProps } from "../../../types/GLTypes";
import { DirectionalLight, Mesh, Object3D, Group } from "three";
import { useControls } from "leva";
import { Outlines } from "@react-three/drei";

interface OccolusQuestUIProps extends IUIComponentProps {
	props: {
		data: {
			myData: {
				name: string;
				nodes: { [key: string]: Mesh | DirectionalLight };
				selectObjectFocus: { name: string; object: Object3D } | null;
				cameraIsMoving: boolean;
				hoveredObject: string | null;
			};
		};
		functions: {
			myFunctions: {
				setSelectObjectFocus: (
					focus: {
						name: string;
						object: Object3D;
					} | null
				) => void;
				setHoveredObject: (objectName: string | null) => void;
			};
		};
		refs: { myRefs: { occulusRef: RefObject<Group> } };
	};
}

const OccolusQuestUI: React.FC<OccolusQuestUIProps> = ({ props }) => {
	const { myData } = props.data;
	const { myFunctions } = props.functions;
	const { myRefs } = props.refs;

	const { name, nodes, selectObjectFocus, cameraIsMoving, hoveredObject } = myData;
	const { setSelectObjectFocus, setHoveredObject } = myFunctions;
	const { occulusRef } = myRefs;

	const OcculusHeadset: Mesh = nodes["OcculusHeadset"] as Mesh;
	const OcculusControler: Mesh = nodes["OcculusController"] as Mesh;

	const { occulusPosition, occulusRotation, backLabelPos, backLabelRot } = useControls("OcculusHeadset", {
		occulusPosition: { value: { x: 3.37, y: 1.28, z: -1.39 }, step: 0.01 },
		occulusRotation: { value: { x: -1.75, y: -0.08, z: 0.43 }, step: 0.01 },
		backLabelPos: { value: { x: -0.7, y: 0.1, z: -0.2 }, step: 0.1 },
		backLabelRot: { value: { x: 0.2, y: 0, z: -0.3 }, step: 0.1 },
	});

	return (
		<group
			ref={occulusRef}
			name={name}
			onClick={() => {
				if (occulusRef.current) {
					setSelectObjectFocus({ name: name, object: occulusRef.current });
				}
			}}
			onPointerOver={() => {
				if (selectObjectFocus === null) setHoveredObject(name);
			}}
			onPointerOut={() => setHoveredObject(null)}>
			<mesh
				geometry={OcculusHeadset.geometry}
				position={[occulusPosition.x, occulusPosition.y, occulusPosition.z]}
				rotation={[occulusRotation.x, occulusRotation.y, occulusRotation.z]}
				scale={OcculusHeadset.scale}
				material={OcculusHeadset.material}>
				<Outlines thickness={1} scale={hoveredObject === name ? 1 : 0} color={"white"} />
				<InteractionLabel
					name="occulus-ui-btn"
					labelPos={[backLabelPos.x, backLabelPos.y, backLabelPos.z]}
					labelRot={[backLabelRot.x, backLabelRot.y, backLabelRot.z]}
					scaleFactor={0.5}
					visible={!cameraIsMoving && selectObjectFocus?.name === name}
					dispatch={() => setSelectObjectFocus(null)}>
					x
				</InteractionLabel>
			</mesh>

			<mesh
				geometry={OcculusControler.geometry}
				position={OcculusControler.position}
				rotation={OcculusControler.rotation}
				scale={OcculusControler.scale}
				material={OcculusControler.material}
			/>
		</group>
	);
};

export default OccolusQuestUI;
