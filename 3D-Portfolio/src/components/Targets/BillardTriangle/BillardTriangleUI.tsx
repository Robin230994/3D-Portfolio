import React, { RefObject } from "react";
import { IUIComponentProps } from "../../../types/GLTypes";
import { DirectionalLight, Group, Mesh } from "three";
import { t3Material } from "../../../Helper/GLMaterials";
import { Object3D } from "three";
import { useControls } from "leva";
import InteractionLabel from "../../InteractionLabel/InteractionLabel";

interface BillardTriangleUIProps extends IUIComponentProps {
	props: {
		data: {
			myData: {
				name: string;
				nodes: { [key: string]: Mesh | DirectionalLight };
				selectObjectFocus: {
					name: string;
					object: Object3D;
				} | null;
				cameraIsMoving: boolean;
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
				setIsAnyHovered: (hovered: boolean) => void;
			};
		};
		refs: { myRefs: { triangleRef: RefObject<Group> } };
	};
}

const BillardTriangleUI: React.FC<BillardTriangleUIProps> = ({ props }) => {
	const { myData } = props.data;
	const { myFunctions } = props.functions;
	const { myRefs } = props.refs;

	const { name, nodes, selectObjectFocus, cameraIsMoving } = myData;
	const { setSelectObjectFocus, setIsAnyHovered } = myFunctions;
	const { triangleRef } = myRefs;

	const PoolBall8: Mesh = nodes["PoolBall8"] as Mesh;

	const { backLabelPos } = useControls("BillardTriangle", {
		backLabelPos: { value: { x: -16.8, y: -0.5, z: 2.7 }, step: 0.1 },
	});

	return (
		<group
			name={name}
			ref={triangleRef}
			onClick={() => {
				if (triangleRef.current) {
					setSelectObjectFocus({ name: name, object: triangleRef.current });
				}
			}}
			onPointerOver={() => {
				if (selectObjectFocus === null) setIsAnyHovered(true);
			}}
			onPointerOut={() => setIsAnyHovered(false)}>
			<mesh geometry={PoolBall8.geometry} material={t3Material} position={PoolBall8.position} rotation={PoolBall8.rotation} />

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

export default BillardTriangleUI;
