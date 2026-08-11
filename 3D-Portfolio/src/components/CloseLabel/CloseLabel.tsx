import { Text } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { Mesh, MeshStandardMaterial } from "three";
import { useSpring, a } from "@react-spring/three";
import useInteraction from "../../hooks/useInteraction";

const labelMaterial = new MeshStandardMaterial({ color: "#ff5c5c" });

const CloseLabel = ({
	visible,
	children,
	labelPos,
	dispatch,
	scaleFactor,
	labelRot,
}: {
	visible: boolean;
	children: React.ReactNode;
	labelPos: [number, number, number];
	dispatch: () => void;
	scaleFactor?: number;
	labelRot?: [number, number, number];
}) => {
	const [show, setShow] = useState(false);
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
			<a.mesh name="ui-btn" ref={uiRef} position={labelPos} rotation={labelRot ? labelRot : [0, 0, 0]} scale={scale} material={labelMaterial} {...events}>
				<circleGeometry args={[0.2, 32]} />
				<Text font="/fonts/Inter_18pt-Bold.ttf" fontSize={0.25} anchorX="center" anchorY="middle" position={[0, 0.03, 0.01]} color={"#444"}>
					{children}
				</Text>
			</a.mesh>
		)
	);
};

export default CloseLabel;
