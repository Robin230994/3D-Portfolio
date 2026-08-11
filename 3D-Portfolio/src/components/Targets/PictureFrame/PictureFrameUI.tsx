import React, { RefObject } from "react";
import { IUIComponentProps } from "../../../types/GLTypes";
import { Mesh } from "three/src/objects/Mesh.js";
import { DirectionalLight } from "three/src/lights/DirectionalLight.js";
import { Material, PlaneGeometry, Texture } from "three";
import MaterialCreator from "../../../classes/MaterialCreator";
import { ThreeEvent } from "@react-three/fiber";
import { Outlines } from "@react-three/drei";
import CloseLabel from "../../CloseLabel/CloseLabel";
import { useFocusStore } from "../../../Stores/useFocusStore";
import { useControls } from "leva";

const materialCreator = MaterialCreator.getInstance();
const glassMat = materialCreator.getMaterialByName("Glass") as Material;
const imageTexture = materialCreator.loadTexture("/images/Certificate.jpg") as Texture;
const certificateMat = materialCreator.createStandardMaterialFromTexture("CertificateMat", {
	diffuseT: imageTexture,
});
certificateMat.side = 2;

const planeGeometry = new PlaneGeometry(0.82, 0.6);

interface PictureFrameUIProps extends IUIComponentProps {
	props: {
		data: {
			myData: {
				name: string;
				nodes: { [key: string]: Mesh | DirectionalLight };
				hovered: string | null;
				cameraIsMoving: boolean;
			};
		};
		functions: {
			myFunctions: {
				dispatch: () => void;
				events: {
					onPointerEnter: (e: ThreeEvent<PointerEvent>) => void;
					onPointerLeave: () => void;
					onClick: (e: ThreeEvent<MouseEvent>) => void;
				};
			};
		};
		refs: {
			myRefs: {
				pictureFrameRef: RefObject<Mesh>;
			};
		};
	};
}

const PictureFrameUI: React.FC<PictureFrameUIProps> = ({ props }) => {
	const { myData } = props.data;
	const { myFunctions } = props.functions;
	const { myRefs } = props.refs;

	const { name, nodes, hovered, cameraIsMoving } = myData;
	const { dispatch, events } = myFunctions;
	const { pictureFrameRef } = myRefs;

	const selectObjectFocus = useFocusStore((state) => state.selectObjectFocus);

	const PictureFrame: Mesh = nodes["Picture_Frame001"] as Mesh;
	const Certificate: Mesh = nodes["Certificate"] as Mesh;

	const { backLabelPos, backLabelRot } = useControls("PictureFrame", {
		backLabelPos: { value: { x: 0, y: 0.03, z: -0.58 }, step: 0.01 },
		backLabelRot: { value: { x: -1.5, y: 0, z: 1.59 }, step: 0.01 },
	});

	return (
		<group name={name}>
			<mesh
				name={name}
				{...events}
				ref={pictureFrameRef}
				geometry={PictureFrame.geometry}
				position={PictureFrame.position}
				rotation={[Math.PI / 2, Math.PI / 2, Math.PI]}
				material={PictureFrame.material}
				scale={PictureFrame.scale}>
				<Outlines thickness={2} scale={hovered === name ? 1 : 0} color={"white"} />
				<CloseLabel
					labelPos={[backLabelPos.x, backLabelPos.y, backLabelPos.z]}
					labelRot={[backLabelRot.x, backLabelRot.y, backLabelRot.z]}
					scaleFactor={0.2}
					visible={!cameraIsMoving && selectObjectFocus?.name === name}
					dispatch={() => dispatch()}>
					x
				</CloseLabel>
			</mesh>
			<mesh position={Certificate.position} rotation={[0, 0, -Math.PI]} material={certificateMat} geometry={planeGeometry} />
			<mesh material={glassMat} position={[1.64, 2.77, 2.92]} rotation={[0, Math.PI, 0]} geometry={planeGeometry} />
		</group>
	);
};

export default PictureFrameUI;
