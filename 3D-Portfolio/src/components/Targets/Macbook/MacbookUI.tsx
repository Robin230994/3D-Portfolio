import React, { RefObject } from "react";
import { GLTFResult, IUIComponentProps } from "../../../types/GLTypes";
import { Mesh, DirectionalLight, Object3D, Vector3 } from "three";
import { useGLTF } from "@react-three/drei";
import { Select } from "@react-three/postprocessing";
import { useControls } from "leva";
import HoverLabel from "../../HoverLabel/HoverLabel";

interface MacbookUIProps extends IUIComponentProps {
	props: {
		data: { myData: { name: string; nodes: { [key: string]: Mesh | DirectionalLight }; selectObjectHovered: { [name: string]: boolean } } };
		functions: {
			myFunctions: { setSelectObjectHovered: (hovered: { [name: string]: boolean }) => void; handleClickedTarget: (targetObject: Object3D) => void };
		};
		refs: { myRefs: { macbookRef: RefObject<Object3D | null> } };
	};
}

const MacbookUI: React.FC<MacbookUIProps> = ({ props }) => {
	const { myData } = props.data;
	const { myFunctions } = props.functions;
	const { myRefs } = props.refs;

	const { name, selectObjectHovered } = myData;
	const { setSelectObjectHovered, handleClickedTarget } = myFunctions;
	const { macbookRef } = myRefs;

	/** Meshes */
	const Macbook = useGLTF("./macbook-model.gltf") as unknown as GLTFResult;

	const { macbookPos, macbookScale } = useControls("Macbook", {
		macbookPos: { value: { x: 5.61, y: 1.04, z: -1.53 } },
		macbookScale: { value: 0.25, step: 0.01 },
	});

	return (
		<React.Fragment>
			{/* <Select enabled={selectObjectHovered["Macbook"] === true}> */}
			<group
				name={name}
				position={[macbookPos.x, macbookPos.y, macbookPos.z]}
				onPointerOver={() => setSelectObjectHovered({ Macbook: true })}
				onPointerOut={() => setSelectObjectHovered({ Macbook: false })}>
				{Macbook.scene && (
					<>
						<primitive
							ref={macbookRef}
							object={Macbook.scene}
							// position={[macbookPos.x, macbookPos.y, macbookPos.z]}
							scale={macbookScale}
							onClick={() => {
								if (macbookRef.current) {
									handleClickedTarget(macbookRef.current);
								}
							}}
						/>
						<HoverLabel visible={selectObjectHovered["Macbook"] === true}>Macbook Pro</HoverLabel>
					</>
				)}
			</group>
			{/* </Select> */}
		</React.Fragment>
	);
};

export default MacbookUI;
