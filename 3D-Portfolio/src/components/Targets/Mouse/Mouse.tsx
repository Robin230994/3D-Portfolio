import React, { useRef, useState } from "react";
import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";
import { ArrowHelper, Group, Matrix4, Mesh, ShaderMaterial, Vector3 } from "three";
import { useVirtualCursorStore, VIRTUAL_DESKTOP_SIZE } from "../../../Stores/useVirtualCursorStore";
import MouseUI from "./MouseUI";

const MOUSE_TRAVEL_X = [-0.15, 0.15];
const MOUSE_TRAVEL_Z = [-0.1, 0.1];

const Mouse: React.FC<CustomMeshProps> = ({ name, nodes, materials }) => {
	const { ot7Material } = materials ?? {};

	const setCursorPosition = useVirtualCursorStore((state) => state.setCursorPosition);

	const mouseRef = useRef<Mesh>(null);
	const mousePivotRef = useRef<Group>(null);
	const leftAxisArrowRef = useRef<ArrowHelper>(null);
	const rightAxisArrowRef = useRef<ArrowHelper>(null);
	const mouseAreaMaterialRef = useRef<ShaderMaterial>(null);

	const [axisHelperVisible, setAxisHelperVisible] = useState(false);
	const [mouseAtEdge, setMouseAtEdge] = useState({ x: { min: false, max: false }, z: { min: false, max: false } });
	const [mouseAreaPosition, setMouseAreaPosition] = useState({ x: 0.5, z: 0.5 });

	const handleMouseDrag = (localMatrix: Matrix4) => {
		const position = new Vector3();
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

		setMouseAtEdge({
			x: {
				min: atMinX,
				max: atMaxX,
			},
			z: {
				min: atMinZ,
				max: atMaxZ,
			},
		});

		setMouseAreaPosition({
			x: normalizedX,
			z: normalizedZ,
		});
	};

	const uiComponentProps = {
		data: {
			myData: { name, nodes, axisHelperVisible, ot7Material, mouseAtEdge, mouseAreaPosition },
		},
		functions: { myFunctions: { handleMouseDrag, setAxisHelperVisible } },
		refs: { myRefs: { mouseRef, mousePivotRef, leftAxisArrowRef, rightAxisArrowRef, mouseAreaMaterialRef } },
	};
	return <MouseUI props={uiComponentProps} />;
};

export default Mouse;
