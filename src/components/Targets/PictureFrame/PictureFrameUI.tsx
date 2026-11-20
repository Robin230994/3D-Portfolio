import React, { RefObject } from "react";
import { IUIComponentProps } from "../../../utils/Types";
import { Mesh } from "three/src/objects/Mesh.js";
import { DirectionalLight } from "three/src/lights/DirectionalLight.js";
import { Material, PlaneGeometry, Texture } from "three";
import { ThreeEvent } from "@react-three/fiber";
import { Outlines } from "@react-three/drei";
import { useControls } from "leva";
import MaterialCreator from "../../../classes/MaterialCreator";

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
			};
		};
		functions: {
			myFunctions: {
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

	const { name, nodes, hovered } = myData;
	const { events } = myFunctions;
	const { pictureFrameRef } = myRefs;

	const PictureFrame: Mesh = nodes["Picture_Frame001"] as Mesh;

	const { certificatePos } = useControls("PictureFrame", {
		certificatePos: { value: { x: 1.64, y: 2.78, z: 2.93 }, step: 0.01 },
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
				<Outlines thickness={3} scale={hovered === name ? 1 : 0} color={"white"} />
			</mesh>
			<mesh position={[certificatePos.x, certificatePos.y, certificatePos.z]} rotation={[0, 0, -Math.PI]} material={certificateMat} geometry={planeGeometry} />
			<mesh material={glassMat} position={[1.64, 2.77, 2.92]} rotation={[0, Math.PI, 0]} geometry={planeGeometry} />
		</group>
	);
};

export default PictureFrameUI;
