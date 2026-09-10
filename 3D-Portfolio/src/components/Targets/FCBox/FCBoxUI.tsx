import React, { RefObject } from "react";
import { IUIComponentProps } from "../../../types/GLTypes";
import { DirectionalLight, Group, Mesh } from "three";
import { useControls } from "leva";
import { iot2Material } from "../../../Helper/GLMaterials";
import { Outlines } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber/dist/declarations/src/core/events";
import { useFocusStore } from "../../../Stores/useFocusStore";
import CloseLabel from "../../CloseLabel/CloseLabel";
import InteractionLabel from "../../InteractionLabel/InteractionLabel";

interface FCBoxUIProps extends IUIComponentProps {
	props: {
		data: {
			myData: {
				name: string;
				nodes: { [key: string]: Mesh | DirectionalLight };
				cameraIsMoving: boolean;
				hovered: string | null;
				isOpen: boolean;
				panelClosed: boolean;
				labelsVisible: boolean;
			};
		};
		functions: {
			myFunctions: {
				dispatch: () => void;
				switchPanel: () => void;
				toggleBox: () => void;
				events: {
					onPointerEnter: (e: ThreeEvent<PointerEvent>) => void;
					onPointerLeave: () => void;
					onClick: (e: ThreeEvent<MouseEvent>) => void;
				};
			};
		};
		refs: { myRefs: { fcBoxRef: RefObject<Group> } };
	};
}

const FCBoxUI: React.FC<FCBoxUIProps> = ({ props }) => {
	const { myData } = props.data;
	const { myFunctions } = props.functions;
	const { myRefs } = props.refs;

	const { name, nodes, isOpen, panelClosed, labelsVisible, cameraIsMoving, hovered } = myData;
	const { dispatch, switchPanel, toggleBox, events } = myFunctions;
	const { fcBoxRef } = myRefs;

	const selectObjectFocus = useFocusStore((state) => state.selectObjectFocus);

	const SenolithWB: Mesh = nodes["SenolithWB"] as Mesh;
	const SenolithWB02: Mesh = nodes["SenolithWB02"] as Mesh;
	const SenoScreenUV: Mesh = nodes["SenoScreenUV"] as Mesh;
	const Senosoft: Mesh = nodes["Senosoft"] as Mesh;
	const Waterproof: Mesh = nodes["Waterproof"] as Mesh;
	const Waterproof02: Mesh = nodes["Waterproof02"] as Mesh;
	const FCBoxTop: Mesh = nodes["FCBoxTop"] as Mesh;

	const { backLabelPos, backLabelRot } = useControls("FCBoxLabel", {
		backLabelPos: { value: { x: -35.0, y: 0, z: 11.7 }, step: 0.1 },
		backLabelRot: { value: { x: -Math.PI / 2, y: 0.2, z: 0 }, step: 0.1 },
	});

	return (
		<>
			<group ref={fcBoxRef} {...events} name={name}>
				{/** LABELS */}
				<group visible={labelsVisible}>
					<mesh
						name="SenolithWB"
						geometry={SenolithWB.geometry}
						position={SenolithWB.position}
						rotation={SenolithWB.rotation}
						scale={SenolithWB.scale}
						material={iot2Material}
					/>
					<mesh
						name="SenolithWB02"
						geometry={SenolithWB02.geometry}
						position={SenolithWB02.position}
						rotation={SenolithWB02.rotation}
						scale={SenolithWB02.scale}
						material={iot2Material}
					/>
					<mesh
						name="SenoScreenUV"
						geometry={SenoScreenUV.geometry}
						position={SenoScreenUV.position}
						rotation={SenoScreenUV.rotation}
						scale={SenoScreenUV.scale}
						material={iot2Material}
					/>
					<mesh
						name="Senosoft"
						geometry={Senosoft.geometry}
						position={Senosoft.position}
						rotation={Senosoft.rotation}
						scale={Senosoft.scale}
						material={iot2Material}
					/>
					<mesh
						name="Waterproof"
						geometry={Waterproof.geometry}
						position={Waterproof.position}
						rotation={Waterproof.rotation}
						scale={Waterproof.scale}
						material={iot2Material}
					/>
					<mesh
						name="Waterproof02"
						geometry={Waterproof02.geometry}
						position={Waterproof02.position}
						rotation={Waterproof02.rotation}
						scale={Waterproof02.scale}
						material={iot2Material}
					/>
				</group>

				{/** FC BOX */}
				<mesh
					name="FCBoxTop"
					geometry={FCBoxTop.geometry}
					position={FCBoxTop.position}
					rotation={FCBoxTop.rotation}
					scale={FCBoxTop.scale}
					material={iot2Material}>
					<CloseLabel
						scaleFactor={20}
						labelPos={[backLabelPos.x, backLabelPos.y, backLabelPos.z]}
						labelRot={[backLabelRot.x, backLabelRot.y, backLabelRot.z]}
						visible={!cameraIsMoving && selectObjectFocus?.name === name}
						dispatch={() => dispatch()}>
						x
					</CloseLabel>

					<InteractionLabel
						focusName={name}
						shortcut={1}
						label={!isOpen ? "Open Box" : "Close Box"}
						position={[45, 0, -0.2]}
						rotation={[-Math.PI / 2, 0, 0]}
						scale={1}
						onTrigger={toggleBox}
					/>

					<InteractionLabel
						focusName={name}
						shortcut={2}
						label={panelClosed ? "Open project description" : "Close project description"}
						position={[50.5, 0, 10]}
						rotation={[-Math.PI / 2, 0, 0]}
						scale={1}
						onTrigger={switchPanel}
					/>
					<Outlines thickness={2} scale={hovered === "FCBoxTop" && selectObjectFocus?.name !== name ? 1 : 0} color={"white"} />
				</mesh>
			</group>
		</>
	);
};

export default FCBoxUI;
