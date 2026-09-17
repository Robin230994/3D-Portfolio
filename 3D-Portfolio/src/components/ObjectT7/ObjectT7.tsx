import { Material, Mesh } from "three";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";
import { Outlines } from "@react-three/drei";
import { useRef, useState } from "react";
import { useFocusStore } from "../../Stores/useFocusStore";
import { useControls } from "leva";
import { useCameraStore } from "../../Stores/useCameraStore";
import useInteraction from "../../hooks/useInteraction";
import CloseLabel from "../CloseLabel/CloseLabel";
import ScreenDesktop from "../Targets/ScreenDesktop/ScreenDesktop";

const ObjectT7: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const ObjectT8: Mesh = nodes["object_t8"] as Mesh;
	const Mouse: Mesh = nodes["Mouse"] as Mesh;
	const ot7Material = ObjectT8.material as Material;

	const ot7Ref = useRef<Mesh>(null);

	const setSelectObjectFocus = useFocusStore((state) => state.setSelectObjectFocus);
	const selectObjectFocus = useFocusStore((state) => state.selectObjectFocus);
	const cameraIsMoving = useCameraStore((state) => state.cameraIsMoving);

	const [screenVisible, setScreenVisible] = useState<boolean>(false);

	const interaction = useInteraction({
		onClick: () => {
			if (ot7Ref.current) {
				setSelectObjectFocus({ name: "Screen", object: ot7Ref.current });
				setScreenVisible(true);
			}
		},
	});

	const { backLabelPos, backLabelRot } = useControls("Screen", {
		backLabelPos: { value: { x: 0.6, y: 0, z: -0.4 }, step: 0.1 },
		backLabelRot: { value: { x: -Math.PI / 2, y: 0, z: -0.1 }, step: 0.1 },
	});

	return (
		<>
			<group name={name} {...interaction.events}>
				<mesh
					ref={ot7Ref}
					name={"Screen"}
					geometry={ObjectT8.geometry}
					position={ObjectT8.position}
					rotation={ObjectT8.rotation}
					material={ot7Material}
					scale={ObjectT8.scale}>
					<Outlines thickness={2} scale={interaction.hovered === "Screen" ? 1 : 0} color={"white"} />
					<CloseLabel
						labelPos={[backLabelPos.x, backLabelPos.y, backLabelPos.z]}
						labelRot={[backLabelRot.x, backLabelRot.y, backLabelRot.z]}
						visible={!cameraIsMoving && selectObjectFocus?.name === "Screen"}
						scaleFactor={0.35}
						dispatch={() => {
							setSelectObjectFocus(null);
							setScreenVisible(false);
						}}>
						x
					</CloseLabel>
					{screenVisible && <ScreenDesktop />}
				</mesh>
			</group>
			<mesh geometry={Mouse.geometry} position={Mouse.position} rotation={Mouse.rotation} material={ot7Material} scale={Mouse.scale} />
		</>
	);
};

export default ObjectT7;
