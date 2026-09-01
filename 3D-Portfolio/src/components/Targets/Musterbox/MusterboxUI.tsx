import React, { RefObject } from "react";
import { IUIComponentProps } from "../../../types/GLTypes";
import { BufferGeometry, DirectionalLight, EdgesGeometry, LineBasicMaterial, Material, Mesh, NormalBufferAttributes, Object3DEventMap } from "three";
import { Group } from "three";
import { iot2Material } from "../../../Helper/GLMaterials";
import { useControls } from "leva";
import { Outlines } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import { useFocusStore } from "../../../Stores/useFocusStore";
import CloseLabel from "../../CloseLabel/CloseLabel";
import InteractionLabel from "../../InteractionLabel/InteractionLabel";

// The contour is calculated once per source geometry, rather than once per
// hover event. The box geometries are static for the lifetime of the scene.
const outlineGeometryCache = new WeakMap<BufferGeometry, EdgesGeometry>();
const boxOutlineMaterial = new LineBasicMaterial({ color: "white" });

const getOutlineGeometry = (geometry: BufferGeometry) => {
	let outlineGeometry = outlineGeometryCache.get(geometry);
	if (!outlineGeometry) {
		outlineGeometry = new EdgesGeometry(geometry);
		outlineGeometryCache.set(geometry, outlineGeometry);
	}
	return outlineGeometry;
};

interface MusterboxUIProps extends IUIComponentProps {
	props: {
		data: {
			myData: {
				name: string;
				nodes: { [key: string]: Mesh | DirectionalLight };
				isOpen: boolean;
				panelClosed: boolean;
				boxesVisible: boolean;
				cameraIsMoving: boolean;
				hovered: string | null;
				hoveredBox: Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap> | null;
			};
		};
		functions: {
			myFunctions: {
				dispatch: () => void;
				toggleBox: () => void;
				switchPanel: () => void;
				handleBoxHover: (event: ThreeEvent<PointerEvent>) => void;
				clearBoxHover: () => void;
				handleBoxClick: (event: ThreeEvent<MouseEvent>) => void;
				events: {
					onPointerEnter: (e: ThreeEvent<PointerEvent>) => void;
					onPointerLeave: () => void;
					onClick: (e: ThreeEvent<MouseEvent>) => void;
				};
			};
		};
		refs: { myRefs: { musterboxRef: RefObject<Group> } };
	};
}

const MusterboxUI: React.FC<MusterboxUIProps> = ({ props }) => {
	const { myData } = props.data;
	const { myFunctions } = props.functions;
	const { myRefs } = props.refs;

	const { name, nodes, cameraIsMoving, hovered, isOpen, panelClosed, boxesVisible, hoveredBox } = myData;
	const { dispatch, toggleBox, switchPanel, handleBoxHover, clearBoxHover, handleBoxClick, events } = myFunctions;
	const { musterboxRef } = myRefs;

	const selectObjectFocus = useFocusStore((state) => state.selectObjectFocus);

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

	const { backLabelPos, backLabelRot } = useControls("Musterbox", {
		backLabelPos: { value: { x: -3.7, y: 2.4, z: -2.3 }, step: 0.1 },
		backLabelRot: { value: { x: 0, y: 0.2, z: 0 }, step: 0.1 },
	});

	return (
		<group>
			<group ref={musterboxRef} {...events} name={name}>
				<mesh
					name={"MusterboxDeckel"}
					geometry={MusterboxDeckel.geometry}
					position={MusterboxDeckel.position}
					rotation={MusterboxDeckel.rotation}
					scale={MusterboxDeckel.scale}
					material={MusterboxDeckel.material}>
					<Outlines thickness={2} scale={hovered === "MusterboxDeckel" && selectObjectFocus?.name !== name ? 1 : 0} color={"white"} />
				</mesh>

				<mesh
					name={"MusterboxLasche"}
					geometry={MusterboxLasche.geometry}
					position={MusterboxLasche.position}
					rotation={MusterboxLasche.rotation}
					scale={MusterboxLasche.scale}
					material={MusterboxLasche.material}>
					<Outlines thickness={2} scale={hovered === "MusterboxLasche" && selectObjectFocus?.name !== name ? 1 : 0} color={"white"} />
				</mesh>

				<InteractionLabel
					focusName={name}
					shortcut={1}
					label={!isOpen ? "Open Box" : "Close Box"}
					position={[-2.55, 2.56, -2.51]}
					rotation={[-Math.PI / 2, 0, 0]}
					scale={1}
					onTrigger={toggleBox}
				/>

				<InteractionLabel
					focusName={name}
					shortcut={2}
					label={panelClosed ? "Open project description" : "Close project description"}
					position={[-2.47, 2.45, -2.51]}
					rotation={[-Math.PI / 2, 0, 0]}
					scale={1}
					onTrigger={switchPanel}
				/>

				<CloseLabel
					scaleFactor={0.15}
					labelPos={[backLabelPos.x, backLabelPos.y, backLabelPos.z]}
					labelRot={[backLabelRot.x, backLabelRot.y, backLabelRot.z]}
					visible={!cameraIsMoving && selectObjectFocus?.name === name}
					dispatch={() => dispatch()}>
					x
				</CloseLabel>

				{/** Boxes */}
				{boxesVisible && (
					<group name={"Boxes"}>
						{hoveredBox && (
							<lineSegments
								raycast={() => null}
								geometry={getOutlineGeometry(hoveredBox.geometry)}
								position={hoveredBox.position}
								rotation={hoveredBox.rotation}
								scale={hoveredBox.scale}>
								<primitive object={boxOutlineMaterial} attach="material" />
							</lineSegments>
						)}
						<mesh
							name={"Musterbox01"}
							geometry={Musterbox01.geometry}
							position={Musterbox01.position}
							rotation={Musterbox01.rotation}
							scale={Musterbox01.scale}
							material={iot2Material}
							onPointerOver={handleBoxHover}
							onPointerLeave={clearBoxHover}
							onClick={handleBoxClick}
						/>

						<mesh
							name={"Musterbox02"}
							geometry={Musterbox02.geometry}
							position={Musterbox02.position}
							rotation={Musterbox02.rotation}
							scale={Musterbox02.scale}
							material={iot2Material}
							onPointerOver={handleBoxHover}
							onPointerLeave={clearBoxHover}
							onClick={handleBoxClick}
						/>

						<mesh
							name={"Musterbox03"}
							geometry={Musterbox03.geometry}
							position={Musterbox03.position}
							rotation={Musterbox03.rotation}
							scale={Musterbox03.scale}
							material={iot2Material}
							onPointerOver={handleBoxHover}
							onPointerLeave={clearBoxHover}
							onClick={handleBoxClick}
						/>

						<mesh
							name={"Musterbox04"}
							geometry={Musterbox04.geometry}
							position={Musterbox04.position}
							rotation={Musterbox04.rotation}
							scale={Musterbox04.scale}
							material={iot2Material}
							onPointerOver={handleBoxHover}
							onPointerLeave={clearBoxHover}
							onClick={handleBoxClick}
						/>

						<mesh
							name={"Musterbox05"}
							geometry={Musterbox05.geometry}
							position={Musterbox05.position}
							rotation={Musterbox05.rotation}
							scale={Musterbox05.scale}
							material={iot2Material}
							onPointerOver={handleBoxHover}
							onPointerLeave={clearBoxHover}
							onClick={handleBoxClick}
						/>

						<mesh
							name={"Musterbox06"}
							geometry={Musterbox06.geometry}
							position={Musterbox06.position}
							rotation={Musterbox06.rotation}
							scale={Musterbox06.scale}
							material={iot2Material}
							onPointerOver={handleBoxHover}
							onPointerLeave={clearBoxHover}
							onClick={handleBoxClick}
						/>

						<mesh
							name={"Musterbox07"}
							geometry={Musterbox07.geometry}
							position={Musterbox07.position}
							rotation={Musterbox07.rotation}
							scale={Musterbox07.scale}
							material={iot2Material}
							onPointerOver={handleBoxHover}
							onPointerLeave={clearBoxHover}
							onClick={handleBoxClick}
						/>

						<mesh
							name={"Musterbox08"}
							geometry={Musterbox08.geometry}
							position={Musterbox08.position}
							rotation={Musterbox08.rotation}
							scale={Musterbox08.scale}
							material={iot2Material}
							onPointerOver={handleBoxHover}
							onPointerLeave={clearBoxHover}
							onClick={handleBoxClick}
						/>

						<mesh
							name={"Musterbox09"}
							geometry={Musterbox09.geometry}
							position={Musterbox09.position}
							rotation={Musterbox09.rotation}
							scale={Musterbox09.scale}
							material={iot2Material}
							onPointerOver={handleBoxHover}
							onPointerLeave={clearBoxHover}
							onClick={handleBoxClick}
						/>

						<mesh
							name={"Musterbox10"}
							geometry={Musterbox10.geometry}
							position={Musterbox10.position}
							rotation={Musterbox10.rotation}
							scale={Musterbox10.scale}
							material={iot2Material}
							onPointerOver={handleBoxHover}
							onPointerLeave={clearBoxHover}
							onClick={handleBoxClick}
						/>

						<mesh
							name={"Musterbox11"}
							geometry={Musterbox11.geometry}
							position={Musterbox11.position}
							rotation={Musterbox11.rotation}
							scale={Musterbox11.scale}
							material={iot2Material}
							onPointerOver={handleBoxHover}
							onPointerLeave={clearBoxHover}
							onClick={handleBoxClick}
						/>

						<mesh
							name={"Musterbox12"}
							geometry={Musterbox12.geometry}
							position={Musterbox12.position}
							rotation={Musterbox12.rotation}
							scale={Musterbox12.scale}
							material={iot2Material}
							onPointerOver={handleBoxHover}
							onPointerLeave={clearBoxHover}
							onClick={handleBoxClick}
						/>

						<mesh
							name={"Musterbox13"}
							geometry={Musterbox13.geometry}
							position={Musterbox13.position}
							rotation={Musterbox13.rotation}
							scale={Musterbox13.scale}
							material={iot2Material}
							onPointerOver={handleBoxHover}
							onPointerLeave={clearBoxHover}
							onClick={handleBoxClick}
						/>

						<mesh
							name={"Musterbox14"}
							geometry={Musterbox14.geometry}
							position={Musterbox14.position}
							rotation={Musterbox14.rotation}
							scale={Musterbox14.scale}
							material={iot2Material}
							onPointerOver={handleBoxHover}
							onPointerLeave={clearBoxHover}
							onClick={handleBoxClick}
						/>

						<mesh
							name={"Musterbox15"}
							geometry={Musterbox15.geometry}
							position={Musterbox15.position}
							rotation={Musterbox15.rotation}
							scale={Musterbox15.scale}
							material={iot2Material}
							onPointerOver={handleBoxHover}
							onPointerLeave={clearBoxHover}
							onClick={handleBoxClick}
						/>

						<mesh
							name={"Musterbox16"}
							geometry={Musterbox16.geometry}
							position={Musterbox16.position}
							rotation={Musterbox16.rotation}
							scale={Musterbox16.scale}
							material={iot2Material}
							onPointerOver={handleBoxHover}
							onPointerLeave={clearBoxHover}
							onClick={handleBoxClick}
						/>

						<mesh
							name={"Musterbox17"}
							geometry={Musterbox17.geometry}
							position={Musterbox17.position}
							rotation={Musterbox17.rotation}
							scale={Musterbox17.scale}
							material={iot2Material}
							onPointerOver={handleBoxHover}
							onPointerLeave={clearBoxHover}
							onClick={handleBoxClick}
						/>

						<mesh
							name={"Musterbox18"}
							geometry={Musterbox18.geometry}
							position={Musterbox18.position}
							rotation={Musterbox18.rotation}
							scale={Musterbox18.scale}
							material={iot2Material}
							onPointerOver={handleBoxHover}
							onPointerLeave={clearBoxHover}
							onClick={handleBoxClick}
						/>

						<mesh
							name={"Musterbox19"}
							geometry={Musterbox19.geometry}
							position={Musterbox19.position}
							rotation={Musterbox19.rotation}
							scale={Musterbox19.scale}
							material={iot2Material}
							onPointerOver={handleBoxHover}
							onPointerLeave={clearBoxHover}
							onClick={handleBoxClick}
						/>

						<mesh
							name={"Musterbox20"}
							geometry={Musterbox20.geometry}
							position={Musterbox20.position}
							rotation={Musterbox20.rotation}
							scale={Musterbox20.scale}
							material={iot2Material}
							onPointerOver={handleBoxHover}
							onPointerLeave={clearBoxHover}
							onClick={handleBoxClick}
						/>

						<mesh
							name={"Musterbox21"}
							geometry={Musterbox21.geometry}
							position={Musterbox21.position}
							rotation={Musterbox21.rotation}
							scale={Musterbox21.scale}
							material={iot2Material}
							onPointerOver={handleBoxHover}
							onPointerLeave={clearBoxHover}
							onClick={handleBoxClick}
						/>

						<mesh
							name={"Musterbox22"}
							geometry={Musterbox22.geometry}
							position={Musterbox22.position}
							rotation={Musterbox22.rotation}
							scale={Musterbox22.scale}
							material={iot2Material}
							onPointerOver={handleBoxHover}
							onPointerLeave={clearBoxHover}
							onClick={handleBoxClick}
						/>

						<mesh
							name={"Musterbox23"}
							geometry={Musterbox23.geometry}
							position={Musterbox23.position}
							rotation={Musterbox23.rotation}
							scale={Musterbox23.scale}
							material={iot2Material}
							onPointerOver={handleBoxHover}
							onPointerLeave={clearBoxHover}
							onClick={handleBoxClick}
						/>

						<mesh
							name={"Musterbox24"}
							geometry={Musterbox24.geometry}
							position={Musterbox24.position}
							rotation={Musterbox24.rotation}
							scale={Musterbox24.scale}
							material={iot2Material}
							onPointerOver={handleBoxHover}
							onPointerLeave={clearBoxHover}
							onClick={handleBoxClick}
						/>
					</group>
				)}
			</group>
		</group>
	);
};

export default MusterboxUI;
