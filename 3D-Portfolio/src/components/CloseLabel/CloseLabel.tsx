import { Text } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { Mesh, MeshBasicMaterial, MeshStandardMaterial } from "three";
import { useSpring, a } from "@react-spring/three";
import useInteraction from "../../hooks/useInteraction";

const labelMaterial = new MeshStandardMaterial({ color: "#ff5c5c", side: 2 });
const labelOutlineMaterial = new MeshBasicMaterial({ color: "white" });

interface ICloseLabelProps {
	visible: boolean;
	children: React.ReactNode;
	labelPos: [number, number, number];
	dispatch: () => void;
	scaleFactor?: number;
	labelRot?: [number, number, number];
}

const CloseLabel: React.FC<ICloseLabelProps> = ({ visible, children, labelPos, dispatch, scaleFactor, labelRot }) => {
	const [show, setShow] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const { events } = useInteraction({
		onClick: (e) => {
			e.stopPropagation();
			dispatch();
		},
	});
	const uiRef = useRef<Mesh | null>(null);

	const { scale } = useSpring({
		scale: visible ? (scaleFactor ? scaleFactor : 1) : 0.2,
		config: { tension: 180, friction: 12 },
	});

	useEffect(() => {
		if (visible) {
			setShow(true);
		} else {
			const timer = setTimeout(() => setShow(false), 300);
			return () => clearTimeout(timer);
		}
	}, [visible]);

	return (
		show && (
			<a.group position={labelPos} rotation={labelRot ? labelRot : [0, 0, 0]} scale={scale}>
				{isHovered && (
					<mesh position={[0, 0, -0.002]} material={labelOutlineMaterial}>
						<ringGeometry args={[0.2, 0.22, 32]} />
					</mesh>
				)}
				<a.mesh
					name="ui-btn"
					ref={uiRef}
					material={labelMaterial}
					{...events}
					onPointerEnter={(event) => {
						events.onPointerEnter(event);
						setIsHovered(true);
					}}
					onPointerLeave={() => {
						events.onPointerLeave();
						setIsHovered(false);
					}}>
					<circleGeometry args={[0.2, 32]} />
					<Text font="/fonts/Inter_18pt-Bold.ttf" fontSize={0.25} anchorX="center" anchorY="middle" position={[0, 0.03, 0.01]} color={"#444"}>
						{children}
					</Text>
				</a.mesh>
			</a.group>
		)
	);
};

export default CloseLabel;
