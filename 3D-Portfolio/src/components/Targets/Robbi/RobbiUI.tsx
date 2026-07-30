import React, { RefObject } from "react";
import { AnimationConfig, IUIComponentProps } from "../../../types/GLTypes";
import { Bone, DirectionalLight, Group, Material, Mesh, SkinnedMesh } from "three";
import { useControls } from "leva";
import MaterialCreator from "../../../classes/MaterialCreator";

const materialCreator = MaterialCreator.getInstance();

const eyeMaterial = materialCreator.createStandardMaterialFromTexture("EyeMaterial", {
	diffuseT: "/baked-textures/Eyes/baked_eyes_color.png",
	roughnessT: "/baked-textures/Eyes/baked_eyes_roughness.jpg",
});

eyeMaterial.transparent = true;

interface RobbiUIProps extends IUIComponentProps {
	props: {
		data: {
			myData: {
				name: string;
				nodes: { [key: string]: Mesh | Bone | SkinnedMesh | DirectionalLight };
				materials?: { [key: string]: Material | Material[] };
				animations?: { [key: string]: any };
			};
		};
		functions: { myFunctions: { setAction: React.Dispatch<React.SetStateAction<AnimationConfig<"Robbi">>> } };
		refs: { myRefs: { rigRef: RefObject<Group> } };
	};
}

const RobbiUI: React.FC<RobbiUIProps> = ({ props }) => {
	const { myData } = props.data;
	const { myFunctions } = props.functions;
	const { myRefs } = props.refs;

	const { nodes, materials } = myData;
	const { setAction } = myFunctions;
	const { rigRef } = myRefs;

	const Robbi: SkinnedMesh = nodes["Robbi"] as SkinnedMesh;
	const Shin: Bone = nodes["shinR001"] as Bone;
	const Eye: Mesh = nodes["spine"] as Mesh;
	const Iris: Mesh = nodes["Mesh_1"] as Mesh;

	const eyes = (nodes.spine as Mesh).clone();
	eyes.material = eyeMaterial;

	// const { leftEyePos, leftIrisPos } = useControls("Robbi", {
	// 	leftEyePos: { value: { x: 0, y: 0, z: 0 }, step: 0.01 },
	// 	leftIrisPos: { value: { x: 0, y: 0, z: 0 }, step: 0.01 },
	// });

	const { robbi_pos, robbi_rot } = useControls("Robbi", {
		robbi_pos: { value: { x: 7.18, y: 1.23, z: 0 }, step: 0.01 },
		robbi_rot: { value: { x: 0, y: -1.46, z: 0 }, step: 0.01 },
	});

	return (
		<group name="Robbi_Rig" position={[robbi_pos.x, robbi_pos.y, robbi_pos.z]} rotation={[robbi_rot.x, robbi_rot.y, robbi_rot.z]} ref={rigRef}>
			<group name="metarig" position={[0, 0.035, 0]} rotation={[Math.PI, 0, Math.PI]} scale={0.24}>
				<primitive object={nodes.spine} />
				<primitive object={nodes.shinR001} />
				<primitive object={nodes.thighR001} />
				<primitive object={nodes.shinL001} />
				<primitive object={nodes.thighL001} />
				<skinnedMesh name="Robbi" geometry={Robbi.geometry} material={materials?.Material} skeleton={Robbi.skeleton} />
			</group>
		</group>
	);
};

export default RobbiUI;
