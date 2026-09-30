import React, { memo, useCallback, useMemo, useRef, useState } from "react";
import { CustomMeshProps } from "../../../utils/Interfaces";
import { ArrowHelper, Group, Matrix4, Mesh, ShaderMaterial, Vector3 } from "three";
import { useVirtualCursorStore, VIRTUAL_DESKTOP_SIZE } from "../../../Stores/useVirtualCursorStore";
import MouseUI from "./MouseUI";

const MOUSE_TRAVEL_X = [-0.15, 0.15];
const MOUSE_TRAVEL_Z = [-0.1, 0.1];

const Mouse: React.FC<CustomMeshProps> = ({ name, nodes, materials }) => {
	const { ot7Material } = materials ?? {};

	const setCursorPosition = useVirtualCursorStore((state) => state.setCursorPosition);
	const sendVirtualWheelData = useVirtualCursorStore((state) => state.sendVirtualWheelData);

	const mouseRef = useRef<Mesh>(null);
	const mousePivotRef = useRef<Group>(null);
	const leftAxisArrowRef = useRef<ArrowHelper>(null);
	const rightAxisArrowRef = useRef<ArrowHelper>(null);
	const mouseAreaMaterialRef = useRef<ShaderMaterial>(null);
	const mouseIsDragging = useRef<boolean>(false);
	const dragPositionRef = useRef(new Vector3());

	const [axisHelperVisible, setAxisHelperVisible] = useState(false);

	const handleMouseDrag = useCallback(
		(localMatrix: Matrix4) => {
			const position = dragPositionRef.current;
			position.setFromMatrixPosition(localMatrix);

			// Calculate the limit positions of the mouse area
			const atMinX = Math.abs(position.x - MOUSE_TRAVEL_X[0]) <= 0.001;
			const atMaxX = Math.abs(position.x - MOUSE_TRAVEL_X[1]) <= 0.001;
			const atMinZ = Math.abs(position.z - MOUSE_TRAVEL_Z[1]) <= 0.001;
			const atMaxZ = Math.abs(position.z - MOUSE_TRAVEL_Z[0]) <= 0.001;

			// save the normalized coordinates in order to move the artificial mouse inside the desktop screen.
			const normalizedX = Math.min(1, Math.max(0, (position.x - MOUSE_TRAVEL_X[0]) / (MOUSE_TRAVEL_X[1] - MOUSE_TRAVEL_X[0])));
			const normalizedZ = Math.min(1, Math.max(0, (position.z - MOUSE_TRAVEL_Z[0]) / (MOUSE_TRAVEL_Z[1] - MOUSE_TRAVEL_Z[0])));

			setCursorPosition(normalizedX * VIRTUAL_DESKTOP_SIZE.width, normalizedZ * VIRTUAL_DESKTOP_SIZE.height);

			// Update shader material
			const material = mouseAreaMaterialRef.current;
			if (!material) return;

			material.uniforms.uLeft.value = atMinX ? 1 : 0;
			material.uniforms.uRight.value = atMaxX ? 1 : 0;
			material.uniforms.uTop.value = atMaxZ ? 1 : 0;
			material.uniforms.uBottom.value = atMinZ ? 1 : 0;
			material.uniforms.uMousePosition.value.set(normalizedX, normalizedZ);
		},
		[setCursorPosition],
	);

	const clickVirtualMouse = useCallback(() => {
		// restrict the click to the macbook desktop
		const macbookDesktop = document.querySelector(".mac-desktop");
		const virtualCursor = document.querySelector<HTMLElement>(".mac-desktop .virtual-cursor");
		if (!macbookDesktop || !virtualCursor) return;

		const cursorRect = virtualCursor.getBoundingClientRect();

		const clientX = cursorRect.left + 4;
		const clientY = cursorRect.top + 4;

		// // increase the clickable area to prevent the cursor to be exactly at the elements position
		const clickablePadding = 15;

		const clickableTarget = [...macbookDesktop.querySelectorAll<HTMLElement>("[data-virtual-clickable]")]
			.map((element) => {
				const rect = element.getBoundingClientRect();
				const insidePaddingArea =
					clientX >= rect.left - clickablePadding &&
					clientX <= rect.right + clickablePadding &&
					clientY >= rect.top - clickablePadding &&
					clientY <= rect.bottom + clickablePadding;

				if (!insidePaddingArea) return null;

				// Chooses the closest target if two padded areas overlap.
				const distanceX = Math.max(rect.left - clientX, 0, clientX - rect.right);
				const distanceY = Math.max(rect.top - clientY, 0, clientY - rect.bottom);

				return {
					element,
					distance: Math.hypot(distanceX, distanceY),
				};
			})
			.filter((target): target is { element: HTMLElement; distance: number } => target !== null)
			.sort((a, b) => a.distance - b.distance)[0]?.element;

		clickableTarget?.click();
	}, []);

	const handleVirtualWheel = useCallback(
		(deltaY: number) => {
			const { x, y } = useVirtualCursorStore.getState();
			sendVirtualWheelData(deltaY, x, y);
		},
		[sendVirtualWheelData],
	);

	const uiComponentProps = useMemo(
		() => ({
			data: {
				myData: { name, nodes, axisHelperVisible, ot7Material },
			},
			functions: { myFunctions: { handleMouseDrag, setAxisHelperVisible, handleVirtualWheel, clickVirtualMouse } },
			refs: { myRefs: { mouseRef, mousePivotRef, leftAxisArrowRef, rightAxisArrowRef, mouseAreaMaterialRef, mouseIsDragging } },
		}),
		[axisHelperVisible, clickVirtualMouse, handleMouseDrag, handleVirtualWheel, name, nodes, ot7Material],
	);
	return <MouseUI props={uiComponentProps} />;
};

export default memo(Mouse);
