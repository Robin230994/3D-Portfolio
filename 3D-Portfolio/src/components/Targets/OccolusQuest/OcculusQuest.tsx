import React, { useMemo, useRef } from "react";
import OcculusQuestUI from "./OcculusQuestUI";

import { CustomMeshProps } from "../../../utils/Interfaces";
import { Euler, Group, Quaternion, Vector3 } from "three";
import { useCameraStore } from "../../../stores/useCameraStore";
import { useFocusStore } from "../../../stores/useFocusStore";
import { useVRStore, VRTransition } from "../../../stores/useVRStore";
import { useControls } from "leva";
import { useFrame, useThree } from "@react-three/fiber";
import { useProjectPanelStore } from "../../../stores/useProjectPanelStore";
import useInteraction from "../../../hooks/useInteraction";
import CloseLabel from "../../CloseLabel/CloseLabel";
import InteractionLabel from "../../InteractionLabel/InteractionLabel";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

const OcculusQuest: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const occulusParentRef = useRef<Group>(null);
	const occulusHeadsetRef = useRef<Group>(null);
	const occulusFirstControllerRef = useRef<Group>(null);
	const occulusSecondControllerRef = useRef<Group>(null);

	const startHeadsetPos = useRef(new Vector3());
	const startHeadsetRotation = useRef(new Quaternion());
	const targetHeadsetWorldPos = useRef(new Vector3());
	const targetHeadsetWorldRotation = useRef(new Quaternion());
	const startFirstControllerGroupPos = useRef(new Vector3());
	const startFirstControllerGroupRot = useRef(new Quaternion());
	const targetFirstControllerGroupPos = useRef(new Vector3());
	const targetFirstControllerGroupRot = useRef(new Quaternion());
	const startSecondControllerGroupPos = useRef(new Vector3());
	const startSecondControllerGroupRot = useRef(new Quaternion());
	const targetSecondControllerGroupPos = useRef(new Vector3());
	const targetSecondControllerGroupRot = useRef(new Quaternion());

	const selectObjectFocus = useFocusStore((state) => state.selectObjectFocus);
	const setSelectObjectFocus = useFocusStore((state) => state.setSelectObjectFocus);

	const panelClosed = useProjectPanelStore((state) => state.panelClosed);
	const setActiveProject = useProjectPanelStore((state) => state.setActiveProject);
	const setPanelClosed = useProjectPanelStore((state) => state.setPanelClosed);

	const cameraIsMoving = useCameraStore((state) => state.cameraIsMoving);

	const vrPhase = useVRStore((state) => state.vrPhase);
	const setVRPhase = useVRStore((state) => state.setVRPhase);

	const { camera, controls } = useThree();

	const interaction = useInteraction({
		onClick: () => {
			if (occulusParentRef.current) {
				setSelectObjectFocus({ name: name, object: occulusParentRef.current });
				setActiveProject(name);
			}
		},
	});

	const { backLabelPos, backLabelRot, interactionPosition, interactionRotation, interactionClosePanelPos, interactionClosePanelRot } = useControls(
		"OcculusHeadset",
		{
			backLabelPos: { value: { x: 3.08, y: 1.16, z: -1.37 }, step: 0.01 },
			backLabelRot: { value: { x: -1.6, y: 0, z: 0.14 }, step: 0.01 },
			interactionPosition: { value: { x: 3.71, y: 1.2, z: -1.23 }, step: 0.01 },
			interactionRotation: { value: { x: 0, y: -0.32, z: 0 } },
			interactionClosePanelPos: { value: { x: 3.44, y: 1.2, z: -1.22 }, steo: 0.01 },
			interactionClosePanelRot: { value: { x: 0, y: 0.32, z: 0 }, steo: 0.01 },
		},
	);

	const dispatch = () => {
		setSelectObjectFocus(null);
		setActiveProject(null);
	};

	const playVRExperience = () => {
		const orbitControls = controls as OrbitControlsImpl;
		if (!orbitControls || !occulusHeadsetRef.current || !occulusFirstControllerRef.current || !occulusSecondControllerRef.current) return;

		// first set the groups start position and rotation
		startHeadsetPos.current.copy(occulusHeadsetRef.current.position);
		startHeadsetRotation.current.copy(occulusHeadsetRef.current.quaternion);

		startFirstControllerGroupPos.current.copy(occulusFirstControllerRef.current.position);
		startFirstControllerGroupRot.current.copy(occulusFirstControllerRef.current.quaternion);

		startSecondControllerGroupPos.current.copy(occulusSecondControllerRef.current.position);
		startSecondControllerGroupRot.current.copy(occulusSecondControllerRef.current.quaternion);

		// get the camera to set the target position for the headset and controllers
		const cameraPosition = new Vector3();
		const cameraRotation = new Quaternion();

		// Set the current camera settings
		camera.getWorldPosition(cameraPosition);
		camera.getWorldQuaternion(cameraRotation);

		// calculate direction camera is currently looking
		const cameraForward = new Vector3(0, 0, -1).applyQuaternion(cameraRotation);

		// Set the target position to move the headset and controller in front of the camera
		const targetWorldPosition = cameraPosition.clone().addScaledVector(cameraForward, 0.17);

		const targetFirstControllerWorldPosition = cameraPosition.clone().add(new Vector3(-0.3, -0.3, 0).applyQuaternion(cameraRotation)); // place on camera position but slightly offset it on x and y axis
		const targetSecondControllerWorldPosition = cameraPosition.clone().add(new Vector3(0.3, -0.3, 0).applyQuaternion(cameraRotation));

		const occulusParent = occulusHeadsetRef.current.parent;
		const controllerFirstParent = occulusFirstControllerRef.current.parent;
		const controllerSecondParent = occulusSecondControllerRef.current.parent;

		occulusParent?.updateWorldMatrix(true, false);
		controllerFirstParent?.updateWorldMatrix(true, false);
		controllerSecondParent?.updateWorldMatrix(true, false);

		// Set final target position and rotation
		targetHeadsetWorldPos.current.copy(targetWorldPosition);
		targetFirstControllerGroupPos.current.copy(targetFirstControllerWorldPosition);
		targetSecondControllerGroupPos.current.copy(targetSecondControllerWorldPosition);

		const targetWorldRotation = occulusParent?.getWorldQuaternion(new Quaternion());
		const targetFirstControllerWorldRotation = controllerFirstParent?.getWorldQuaternion(new Quaternion());
		const targetSecondControllerWorldRotation = controllerSecondParent?.getWorldQuaternion(new Quaternion());

		const offset = new Quaternion().setFromEuler(new Euler(Math.PI / 2, Math.PI, 0)); // rotate headset and controllers on x axis by 90 degrees and on y axis by 180 degrees.

		// set the target position in local space. The current position is set to world space
		occulusParent?.worldToLocal(targetHeadsetWorldPos.current);
		targetHeadsetWorldRotation.current.copy(targetWorldRotation!).invert().multiply(cameraRotation).multiply(offset);

		controllerFirstParent?.worldToLocal(targetFirstControllerGroupPos.current);
		targetFirstControllerGroupRot.current.copy(targetFirstControllerWorldRotation!).invert().multiply(cameraRotation).multiply(offset);

		controllerSecondParent?.worldToLocal(targetSecondControllerGroupPos.current);
		targetSecondControllerGroupRot.current.copy(targetSecondControllerWorldRotation!).invert().multiply(cameraRotation).multiply(offset);

		orbitControls.enabled = false;
		setVRPhase(VRTransition.ENTERING);
	};

	useFrame((_, delta) => {
		if (!occulusHeadsetRef.current || !occulusFirstControllerRef.current || !occulusSecondControllerRef.current) return;

		const movementSpeed = 1 - Math.exp(-4 * delta);

		if (vrPhase === VRTransition.ENTERING) {
			// Move the headset and controllers and rotate them
			occulusHeadsetRef.current.position.lerp(targetHeadsetWorldPos.current, movementSpeed);
			occulusHeadsetRef.current.quaternion.slerp(targetHeadsetWorldRotation.current, movementSpeed);

			occulusFirstControllerRef.current.position.lerp(targetFirstControllerGroupPos.current, movementSpeed);
			occulusFirstControllerRef.current.quaternion.slerp(targetFirstControllerGroupRot.current, movementSpeed);

			occulusSecondControllerRef.current.position.lerp(targetSecondControllerGroupPos.current, movementSpeed);
			occulusSecondControllerRef.current.quaternion.slerp(targetFirstControllerGroupRot.current, movementSpeed);

			const movedToPosition =
				occulusHeadsetRef.current.position.distanceTo(targetHeadsetWorldPos.current) <= 0.01 &&
				occulusHeadsetRef.current.quaternion.angleTo(targetHeadsetWorldRotation.current) <= 0.01;

			if (movedToPosition) {
				setVRPhase(VRTransition.BLACKOUT);
			}
		}

		if (vrPhase === VRTransition.RETURNING) {
			const orbitControls = controls as OrbitControlsImpl;

			// return back to original position and rotation
			occulusHeadsetRef.current!.position.lerp(startHeadsetPos.current, movementSpeed);
			occulusHeadsetRef.current!.quaternion.slerp(startHeadsetRotation.current, movementSpeed);

			occulusFirstControllerRef.current!.position.lerp(startFirstControllerGroupPos.current, movementSpeed);
			occulusFirstControllerRef.current!.quaternion.slerp(startFirstControllerGroupRot.current, movementSpeed);

			occulusSecondControllerRef.current!.position.lerp(startSecondControllerGroupPos.current, movementSpeed);
			occulusSecondControllerRef.current!.quaternion.slerp(startSecondControllerGroupRot.current, movementSpeed);

			const movedToPosition =
				occulusHeadsetRef.current!.position.distanceTo(startHeadsetPos.current) <= 0.03 &&
				occulusHeadsetRef.current!.quaternion.angleTo(startHeadsetRotation.current) <= 0.03;

			if (movedToPosition) {
				setVRPhase(VRTransition.IDLE);
				orbitControls.enabled = true;
			}
		}
	});

	const uiComponentProps = useMemo(() => {
		return {
			data: { myData: { name, nodes, hovered: interaction.hovered } },
			functions: { myFunctions: { events: interaction.events } },
			refs: { myRefs: { occulusParentRef, occulusHeadsetRef, occulusFirstControllerRef, occulusSecondControllerRef } },
		};
	}, [interaction.events, interaction.hovered, name, nodes]);

	return (
		<>
			<OcculusQuestUI props={uiComponentProps} />
			<CloseLabel
				labelPos={[backLabelPos.x, backLabelPos.y, backLabelPos.z]}
				labelRot={[backLabelRot.x, backLabelRot.y, backLabelRot.z]}
				scaleFactor={0.15}
				visible={!cameraIsMoving && selectObjectFocus?.name === name}
				dispatch={() => dispatch()}>
				x
			</CloseLabel>
			{vrPhase === VRTransition.IDLE && (
				<InteractionLabel
					focusName={name}
					shortcut={1}
					label={"Experience VR"}
					position={[interactionPosition.x, interactionPosition.y, interactionPosition.z]}
					rotation={[interactionRotation.x, interactionRotation.y, interactionRotation.z]}
					scale={0.55}
					onTrigger={() => {
						if (!cameraIsMoving) {
							setPanelClosed(true);
							playVRExperience();
						}
					}}
				/>
			)}
			{vrPhase === VRTransition.IDLE && (
				<InteractionLabel
					focusName={name}
					shortcut={2}
					label={panelClosed ? "Open project description" : "Close project description"}
					position={[interactionClosePanelPos.x, interactionClosePanelPos.y, interactionClosePanelPos.z]}
					rotation={[interactionClosePanelRot.x, interactionClosePanelRot.y, interactionClosePanelRot.z]}
					scale={0.55}
					onTrigger={() => {
						setPanelClosed(!panelClosed);
					}}
				/>
			)}
		</>
	);
};

export default OcculusQuest;
