import React, { useMemo, useRef } from "react";
import OcculusQuestUI from "./OcculusQuestUI";

import { CustomMeshProps } from "../../../utils/Interfaces";
import { Euler, Group, Quaternion, Vector3 } from "three";
import { useCameraStore } from "../../../Stores/useCameraStore";
import { useFocusStore } from "../../../Stores/useFocusStore";
import { useVRStore, VRTransition } from "../../../Stores/useVRStore";
import { useControls } from "leva";
import { useFrame, useThree } from "@react-three/fiber";
import useInteraction from "../../../hooks/useInteraction";
import CloseLabel from "../../CloseLabel/CloseLabel";
import InteractionLabel from "../../InteractionLabel/InteractionLabel";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

const OcculusQuest: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const occulusParentRef = useRef<Group>(null);
	const occulusHeadsetRef = useRef<Group>(null);
	const occulusControllerRef = useRef<Group>(null);

	const startHeadsetPos = useRef(new Vector3());
	const startHeadsetRotation = useRef(new Quaternion());
	const targetHeadsetWorldPos = useRef(new Vector3());
	const targetHeadsetWorldRotation = useRef(new Quaternion());

	const selectObjectFocus = useFocusStore((state) => state.selectObjectFocus);
	const setSelectObjectFocus = useFocusStore((state) => state.setSelectObjectFocus);
	const cameraIsMoving = useCameraStore((state) => state.cameraIsMoving);
	const vrPhase = useVRStore((state) => state.vrPhase);
	const setVRPhase = useVRStore((state) => state.setVRPhase);
	const { camera, controls } = useThree();

	const interaction = useInteraction({
		onClick: () => {
			if (occulusParentRef.current) {
				setSelectObjectFocus({ name: name, object: occulusParentRef.current });
			}
		},
	});

	const { backLabelPos, backLabelRot, interactionPosition, interactionRotation } = useControls("OcculusHeadset", {
		backLabelPos: { value: { x: 3.08, y: 1.16, z: -1.37 }, step: 0.01 },
		backLabelRot: { value: { x: -1.6, y: 0, z: 0.14 }, step: 0.01 },
		interactionPosition: { value: { x: 3.71, y: 1.2, z: -1.23 }, step: 0.01 },
		interactionRotation: { value: { x: 0, y: -0.32, z: 0 } },
	});

	const dispatch = () => {
		setSelectObjectFocus(null);
	};

	const playVRExperience = () => {
		const orbitControls = controls as OrbitControlsImpl;
		if (!orbitControls || !occulusHeadsetRef.current || !occulusControllerRef.current) return;

		// first set the groups start position and rotation
		startHeadsetPos.current.copy(occulusHeadsetRef.current.position);
		startHeadsetRotation.current.copy(occulusHeadsetRef.current.quaternion);

		// get the camera to set the target position for the headset and controllers
		const cameraPosition = new Vector3();
		const cameraRotation = new Quaternion();

		// Set the current camera settings
		camera.getWorldPosition(cameraPosition);
		camera.getWorldQuaternion(cameraRotation);

		// calculate direction camera is currently looking
		const cameraForward = new Vector3(0, 0, -1).applyQuaternion(cameraRotation);

		// Set the target position to move the headset in front of the camera

		const targetWorldPosition = cameraPosition.clone().addScaledVector(cameraForward, 0.17);

		const occulusHeadsetParent = occulusHeadsetRef.current.parent;
		occulusHeadsetParent?.updateWorldMatrix(true, false);
		targetHeadsetWorldPos.current.copy(targetWorldPosition);

		const targetWorldRotation = occulusHeadsetParent?.getWorldQuaternion(new Quaternion());
		const offset = new Quaternion().setFromEuler(new Euler(Math.PI / 2, Math.PI, 0));

		// set the target position in local space. The current position is set to world space
		occulusHeadsetParent?.worldToLocal(targetHeadsetWorldPos.current);
		targetHeadsetWorldRotation.current.copy(targetWorldRotation!).invert().multiply(cameraRotation).multiply(offset);

		// targetHeadsetWorldPos.current.copy(cameraPosition).addScaledVector(cameraForward, 0.03);
		// targetHeadsetWorldRotation.current.copy(cameraRotation).multiply(new Quaternion().setFromEuler(new Euler(Math.PI / 2, -Math.PI, 0)));

		orbitControls.enabled = false;
		setVRPhase(VRTransition.ENTERING);
	};

	useFrame((_, delta) => {
		if (!occulusHeadsetRef.current) return;

		const movementSpeed = 1 - Math.exp(-4 * delta);

		if (vrPhase === VRTransition.ENTERING) {
			// Move the headset and controllers and rotate them
			occulusHeadsetRef.current.position.lerp(targetHeadsetWorldPos.current, movementSpeed);
			occulusHeadsetRef.current.quaternion.slerp(targetHeadsetWorldRotation.current, movementSpeed);

			const movedToPosition =
				occulusHeadsetRef.current.position.distanceTo(targetHeadsetWorldPos.current) <= 0.01 &&
				occulusHeadsetRef.current.quaternion.angleTo(targetHeadsetWorldRotation.current) <= 0.01;

			if (movedToPosition) {
				setVRPhase(VRTransition.BLACKOUT);
			}
		}

		if (vrPhase === VRTransition.EXITING) {
			const orbitControls = controls as OrbitControlsImpl;

			// return back to original position and rotation
			occulusHeadsetRef.current.position.lerp(startHeadsetPos.current, movementSpeed);
			occulusHeadsetRef.current.quaternion.slerp(startHeadsetRotation.current, movementSpeed);

			const movedToPosition =
				occulusHeadsetRef.current.position.distanceTo(startHeadsetPos.current) <= 0.01 &&
				occulusHeadsetRef.current.quaternion.angleTo(startHeadsetRotation.current) <= 0.01;

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
			refs: { myRefs: { occulusParentRef, occulusHeadsetRef, occulusControllerRef } },
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
						if (!cameraIsMoving) playVRExperience();
					}}
				/>
			)}
		</>
	);
};

export default OcculusQuest;
