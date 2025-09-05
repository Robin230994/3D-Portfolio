import React, { RefObject } from "react";
import MaterialCreator from "../../../classes/MaterialCreator";

import { IUIComponentProps } from "../../../types/GLTypes";
import { DirectionalLight, Mesh, Object3D, Group, Vector3, Texture } from "three";
import { Select } from "@react-three/postprocessing";
import InteractionLabel from "../../InteractionLabel/InteractionLabel";
import { useControls } from "leva";

const materialCreator = MaterialCreator.getInstance();
const normalTOH = materialCreator.loadTexture("/baked-textures/Objects/TI1/objects_ti1_normal.png") as Texture;

interface OccolusQuestUIProps extends IUIComponentProps {
	props: {
		data: {
			myData: {
				name: string;
				nodes: { [key: string]: Mesh | DirectionalLight };
				selectObjectFocus: { name: string; object: Object3D } | null;
			};
		};
		functions: {
			myFunctions: {
				setSelectObjectFocus: React.Dispatch<React.SetStateAction<{ name: string; object: Object3D } | null>>;
			};
		};
		refs: { myRefs: { occulusRef: RefObject<Group> } };
	};
}

const OccolusQuestUI: React.FC<OccolusQuestUIProps> = ({ props }) => {
	const { myData } = props.data;
	const { myFunctions } = props.functions;
	const { myRefs } = props.refs;

	const { name, nodes, selectObjectFocus } = myData;
	const { setSelectObjectFocus } = myFunctions;
	const { occulusRef } = myRefs;

	const OcculusHeadset: Mesh = nodes["OcculusHeadset"] as Mesh;
	const OcculusControler: Mesh = nodes["OcculusController"] as Mesh;

	const { occulusPosition, occulusRotation } = useControls("OcculusHeadset", {
		occulusPosition: { value: { x: 3.37, y: 1.28, z: -1.39 }, step: 0.01 },
		occulusRotation: { value: { x: -1.75, y: -0.08, z: 0.43 }, step: 0.01 },
	});

	console.log(OcculusHeadset.rotation);

	return (
		<group
			ref={occulusRef}
			name={name}
			onClick={() => {
				if (occulusRef.current) {
					setSelectObjectFocus({ name: name, object: occulusRef.current });
				}
			}}>
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
		</group>
		// </Select>
	);
};

export default OccolusQuestUI;
