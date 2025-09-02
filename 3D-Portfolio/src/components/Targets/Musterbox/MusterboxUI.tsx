import React, { RefObject } from "react";
import { IUIComponentProps } from "../../../types/GLTypes";
import { DirectionalLight, Mesh } from "three";
import { useControls } from "leva";
import { Group } from "three";

interface MusterboxUIProps extends IUIComponentProps {
	props: {
		data: { myData: { name: string; nodes: { [key: string]: Mesh | DirectionalLight } } };
		functions: { myFunctions: { setSelectObjectHovered: (hovered: { [name: string]: boolean }) => void } };
		refs: { myRefs: { musterboxRef: RefObject<Group> } };
	};
}

const MusterboxUI: React.FC<MusterboxUIProps> = ({ props }) => {
	const { myData } = props.data;
	const { myFunctions } = props.functions;
	const { myRefs } = props.refs;

	const { name, nodes } = myData;
	const { setSelectObjectHovered } = myFunctions;
	const { musterboxRef } = myRefs;

	const MusterboxDeckel: Mesh = nodes["MusterboxDeckel"] as Mesh;
	const MusterboxLasche: Mesh = nodes["MusterboxLasche"] as Mesh;
	// const Musterbox01: Mesh = nodes["MusterboxBox01"] as Mesh;

	// console.log(Musterbox01.position);
	// console.log(Musterbox01.rotation);

	const { musterbox01Pos, musterboxRot } = useControls("Musterboxes", {
		musterbox01Pos: { value: { x: 0, y: 0.0, z: 0 }, step: 0.01 },
		musterboxRot: { value: { x: 0, y: 0, z: 0 }, step: 0.01 },
	});

	const musterboxesInstance = [
		{
			position: [musterbox01Pos.x, musterbox01Pos.y, musterbox01Pos.z] as [number, number, number],
			rotation: [musterboxRot.x, musterboxRot.y, musterboxRot.z] as [number, number, number],
		},
	];

	return (
		<group name={name}>
			<group
				ref={musterboxRef}
				onPointerOver={() => setSelectObjectHovered({ Musterbox: true })}
				onPointerOut={() => setSelectObjectHovered({ Musterbox: false })}>
				<mesh
					geometry={MusterboxDeckel.geometry}
					position={MusterboxDeckel.position}
					rotation={MusterboxDeckel.rotation}
					scale={MusterboxDeckel.scale}
					material={MusterboxDeckel.material}
				/>

				<mesh
					geometry={MusterboxLasche.geometry}
					position={MusterboxLasche.position}
					rotation={MusterboxLasche.rotation}
					scale={MusterboxLasche.scale}
					material={MusterboxLasche.material}
				/>
			</group>
		</group>
	);
};

export default MusterboxUI;
