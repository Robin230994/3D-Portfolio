import React, { RefObject } from "react";
import { IUIComponentProps } from "../../../types/GLTypes";
import { DirectionalLight, Mesh } from "three";
import { useControls } from "leva";
import { Group } from "three";
import InstantiatedMesh from "../../InstanciatedMesh/InstantiatedMesh";
import { iot2Material } from "../../../Helper/GLMaterials";

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
	const Musterbox01: Mesh = nodes["MusterboxBox01"] as Mesh;
	const Musterbox02: Mesh = nodes["MusterboxBox02"] as Mesh;
	const Musterbox03: Mesh = nodes["MusterboxBox03"] as Mesh;
	const Musterbox04: Mesh = nodes["MusterboxBox04"] as Mesh;
	const Musterbox05: Mesh = nodes["MusterboxBox05"] as Mesh;
	const Musterbox06: Mesh = nodes["MusterboxBox06"] as Mesh;
	const Musterbox07: Mesh = nodes["MusterboxBox07"] as Mesh;
	const Musterbox08: Mesh = nodes["MusterboxBox08"] as Mesh;
	const Musterbox09: Mesh = nodes["MusterboxBox09"] as Mesh;
	const Musterbox10: Mesh = nodes["MusterboxBox10"] as Mesh;
	const Musterbox11: Mesh = nodes["MusterboxBox11"] as Mesh;
	const Musterbox12: Mesh = nodes["MusterboxBox12"] as Mesh;
	const Musterbox13: Mesh = nodes["MusterboxBox13"] as Mesh;
	const Musterbox14: Mesh = nodes["MusterboxBox14"] as Mesh;
	const Musterbox15: Mesh = nodes["MusterboxBox15"] as Mesh;
	const Musterbox16: Mesh = nodes["MusterboxBox16"] as Mesh;
	const Musterbox17: Mesh = nodes["MusterboxBox17"] as Mesh;
	const Musterbox18: Mesh = nodes["MusterboxBox18"] as Mesh;
	const Musterbox19: Mesh = nodes["MusterboxBox19"] as Mesh;
	const Musterbox20: Mesh = nodes["MusterboxBox20"] as Mesh;
	const Musterbox21: Mesh = nodes["MusterboxBox21"] as Mesh;
	const Musterbox22: Mesh = nodes["MusterboxBox22"] as Mesh;
	const Musterbox23: Mesh = nodes["MusterboxBox23"] as Mesh;
	const Musterbox24: Mesh = nodes["MusterboxBox24"] as Mesh;

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

				{/** Boxes */}
				<group name={"Boxes"} visible={false}>
					<mesh
						geometry={Musterbox01.geometry}
						position={Musterbox01.position}
						rotation={Musterbox01.rotation}
						scale={Musterbox01.scale}
						material={iot2Material}
					/>

					<mesh
						geometry={Musterbox02.geometry}
						position={Musterbox02.position}
						rotation={Musterbox02.rotation}
						scale={Musterbox02.scale}
						material={iot2Material}
					/>

					<mesh
						geometry={Musterbox03.geometry}
						position={Musterbox03.position}
						rotation={Musterbox03.rotation}
						scale={Musterbox03.scale}
						material={iot2Material}
					/>

					<mesh
						geometry={Musterbox04.geometry}
						position={Musterbox04.position}
						rotation={Musterbox04.rotation}
						scale={Musterbox04.scale}
						material={iot2Material}
					/>

					<mesh
						geometry={Musterbox05.geometry}
						position={Musterbox05.position}
						rotation={Musterbox05.rotation}
						scale={Musterbox05.scale}
						material={iot2Material}
					/>

					<mesh
						geometry={Musterbox06.geometry}
						position={Musterbox06.position}
						rotation={Musterbox06.rotation}
						scale={Musterbox06.scale}
						material={iot2Material}
					/>

					<mesh
						geometry={Musterbox07.geometry}
						position={Musterbox07.position}
						rotation={Musterbox07.rotation}
						scale={Musterbox07.scale}
						material={iot2Material}
					/>

					<mesh
						geometry={Musterbox08.geometry}
						position={Musterbox08.position}
						rotation={Musterbox08.rotation}
						scale={Musterbox08.scale}
						material={iot2Material}
					/>

					<mesh
						geometry={Musterbox09.geometry}
						position={Musterbox09.position}
						rotation={Musterbox09.rotation}
						scale={Musterbox09.scale}
						material={iot2Material}
					/>

					<mesh
						geometry={Musterbox10.geometry}
						position={Musterbox10.position}
						rotation={Musterbox10.rotation}
						scale={Musterbox10.scale}
						material={iot2Material}
					/>

					<mesh
						geometry={Musterbox11.geometry}
						position={Musterbox11.position}
						rotation={Musterbox11.rotation}
						scale={Musterbox11.scale}
						material={iot2Material}
					/>

					<mesh
						geometry={Musterbox12.geometry}
						position={Musterbox12.position}
						rotation={Musterbox12.rotation}
						scale={Musterbox12.scale}
						material={iot2Material}
					/>

					<mesh
						geometry={Musterbox13.geometry}
						position={Musterbox13.position}
						rotation={Musterbox13.rotation}
						scale={Musterbox13.scale}
						material={iot2Material}
					/>

					<mesh
						geometry={Musterbox14.geometry}
						position={Musterbox14.position}
						rotation={Musterbox14.rotation}
						scale={Musterbox14.scale}
						material={iot2Material}
					/>

					<mesh
						geometry={Musterbox15.geometry}
						position={Musterbox15.position}
						rotation={Musterbox15.rotation}
						scale={Musterbox15.scale}
						material={iot2Material}
					/>

					<mesh
						geometry={Musterbox16.geometry}
						position={Musterbox16.position}
						rotation={Musterbox16.rotation}
						scale={Musterbox16.scale}
						material={iot2Material}
					/>

					<mesh
						geometry={Musterbox17.geometry}
						position={Musterbox17.position}
						rotation={Musterbox17.rotation}
						scale={Musterbox17.scale}
						material={iot2Material}
					/>

					<mesh
						geometry={Musterbox18.geometry}
						position={Musterbox18.position}
						rotation={Musterbox18.rotation}
						scale={Musterbox18.scale}
						material={iot2Material}
					/>

					<mesh
						geometry={Musterbox19.geometry}
						position={Musterbox19.position}
						rotation={Musterbox19.rotation}
						scale={Musterbox19.scale}
						material={iot2Material}
					/>

					<mesh
						geometry={Musterbox20.geometry}
						position={Musterbox20.position}
						rotation={Musterbox20.rotation}
						scale={Musterbox20.scale}
						material={iot2Material}
					/>

					<mesh
						geometry={Musterbox21.geometry}
						position={Musterbox21.position}
						rotation={Musterbox21.rotation}
						scale={Musterbox21.scale}
						material={iot2Material}
					/>

					<mesh
						geometry={Musterbox22.geometry}
						position={Musterbox22.position}
						rotation={Musterbox22.rotation}
						scale={Musterbox22.scale}
						material={iot2Material}
					/>

					<mesh
						geometry={Musterbox23.geometry}
						position={Musterbox23.position}
						rotation={Musterbox23.rotation}
						scale={Musterbox23.scale}
						material={iot2Material}
					/>

					<mesh
						geometry={Musterbox24.geometry}
						position={Musterbox24.position}
						rotation={Musterbox24.rotation}
						scale={Musterbox24.scale}
						material={iot2Material}
					/>
				</group>
			</group>
		</group>
	);
};

export default MusterboxUI;
