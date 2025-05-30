import React from "react";
import { GLTFResult, IUIComponentProps } from "../../types/GLTypes";
import { Mesh, DirectionalLight } from "three";
import { useGLTF } from "@react-three/drei";
import { Select } from "@react-three/postprocessing";
import { useControls } from "leva";

interface MacbookUIProps extends IUIComponentProps {
	props: {
		data: { myData: { name: string; nodes: { [key: string]: Mesh | DirectionalLight }; selectObjectHovered: { [name: string]: boolean } } };
		functions: { myFunctions: { setSelectObjectHovered: (hovered: { [name: string]: boolean }) => void } };
		refs: { myRefs: object };
	};
}

const MacbookUI: React.FC<MacbookUIProps> = ({ props }) => {
	const { myData } = props.data;
	const { myFunctions } = props.functions;

	const { name, selectObjectHovered } = myData;
	const { setSelectObjectHovered } = myFunctions;

	/** Meshes */
	const Macbook = useGLTF("./macbook-model.gltf") as unknown as GLTFResult;

	const { macbookPos, macbookScale } = useControls("Macbook", {
		macbookPos: { value: { x: 5.61, y: 1.04, z: -1.53 } },
		macbookScale: { value: 0.25, step: 0.01 },
	});

	return (
		<React.Fragment>
			<Select enabled={selectObjectHovered["Macbook"] === true}>
				<group name={name} onPointerOver={() => setSelectObjectHovered({ Macbook: true })} onPointerOut={() => setSelectObjectHovered({ Macbook: false })}>
					{Macbook.scene && <primitive object={Macbook.scene} position={[macbookPos.x, macbookPos.y, macbookPos.z]} scale={macbookScale} />}
				</group>
			</Select>
		</React.Fragment>
	);
};

export default MacbookUI;
