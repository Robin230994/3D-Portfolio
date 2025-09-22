import React, { RefObject } from "react";
import InteractionLabel from "../../InteractionLabel/InteractionLabel";

import { IUIComponentProps } from "../../../types/GLTypes";
import { DirectionalLight, Mesh, Object3D, Group } from "three";
import { useControls } from "leva";

interface OccolusQuestUIProps extends IUIComponentProps {
	props: {
		data: {
			myData: {
				name: string;
				nodes: { [key: string]: Mesh | DirectionalLight };
				selectObjectFocus: { name: string; object: Object3D } | null;
				cameraIsMoving: boolean;
			};
		};
		functions: {
			myFunctions: {
				setSelectObjectFocus: React.Dispatch<React.SetStateAction<{ name: string; object: Object3D } | null>>;
				setIsAnyHovered: React.Dispatch<React.SetStateAction<boolean>>;
			};
		};
		refs: { myRefs: { occulusRef: RefObject<Group> } };
	};
}

const OccolusQuestUI: React.FC<OccolusQuestUIProps> = ({ props }) => {
	const { myData } = props.data;
	const { myFunctions } = props.functions;
	const { myRefs } = props.refs;

	const { name, nodes, selectObjectFocus, cameraIsMoving } = myData;
	const { setSelectObjectFocus, setIsAnyHovered } = myFunctions;
	const { occulusRef } = myRefs;

	const OcculusHeadset: Mesh = nodes["OcculusHeadset"] as Mesh;
	const OcculusControler: Mesh = nodes["OcculusController"] as Mesh;

	const { occulusPosition, occulusRotation, backLabelPos } = useControls("OcculusHeadset", {
		occulusPosition: { value: { x: 3.37, y: 1.28, z: -1.39 }, step: 0.01 },
		occulusRotation: { value: { x: -1.75, y: -0.08, z: 0.43 }, step: 0.01 },
		backLabelPos: { value: { x: 2.2, y: 0.3, z: -3.2 }, step: 0.1 },
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
				if (selectObjectFocus === null) setIsAnyHovered(true);
			}}
			onPointerOut={() => setIsAnyHovered(false)}>
			<mesh
				geometry={OcculusHeadset.geometry}
				position={[occulusPosition.x, occulusPosition.y, occulusPosition.z]}
				rotation={[occulusRotation.x, occulusRotation.y, occulusRotation.z]}
				scale={OcculusHeadset.scale}
				material={OcculusHeadset.material}
			/>

			<mesh
				geometry={OcculusControler.geometry}
				position={OcculusControler.position}
				rotation={OcculusControler.rotation}
				scale={OcculusControler.scale}
				material={OcculusControler.material}
			/>
			<InteractionLabel
				labelPos={[backLabelPos.x, backLabelPos.y, backLabelPos.z]}
				visible={!cameraIsMoving && selectObjectFocus?.name === name}
				dispatch={() => setSelectObjectFocus(null)}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
					<path
						fillRule="evenodd"
						d="M9.53 2.47a.75.75 0 0 1 0 1.06L4.81 8.25H15a6.75 6.75 0 0 1 0 13.5h-3a.75.75 0 0 1 0-1.5h3a5.25 5.25 0 1 0 0-10.5H4.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z"
						clipRule="evenodd"
					/>
				</svg>
			</InteractionLabel>
		</group>
	);
};

export default OccolusQuestUI;
