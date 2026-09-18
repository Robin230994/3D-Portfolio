import React, { useRef, useState } from "react";
import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";
import { Group, Matrix4, Mesh, ShaderMaterial, Vector3 } from "three";
import MouseUI from "./MouseUI";
import useInteraction from "../../../hooks/useInteraction";

const MOUSE_TRAVEL_X = [-0.15, 0.15];
const MOUSE_TRAVEL_Z = [-0.1, 0.1];

const Mouse: React.FC<CustomMeshProps> = ({ name, nodes, materials }) => {
	const { ot7Material } = materials ?? {};

	const interaction = useInteraction();

	const mouseRef = useRef<Mesh>(null);
	const mousePivotRef = useRef<Group>(null);
	const axisHelperGroupRef = useRef<Group>(null);
	const mouseAreaMaterialRef = useRef<ShaderMaterial>(null);
	// const mouseAtEdgeLimit = useRef({ x: { min: false, max: false }, z: { min: false, max: false } });

	const [axisHelperVisible, setAxisHelperVisible] = useState(false);
	const [mouseAtEdge, setMouseAtEdge] = useState({ x: { min: false, max: false }, z: { min: false, max: false } });

	const handleMouseDrag = (localMatrix: Matrix4) => {
		const position = new Vector3();
		position.setFromMatrixPosition(localMatrix);

		// Calculate the limit positions of the mouse area
		const atMinX = Math.abs(position.x - MOUSE_TRAVEL_X[0]) <= 0.001;
		const atMaxX = Math.abs(position.x - MOUSE_TRAVEL_X[1]) <= 0.001;
		const atMinZ = Math.abs(position.z - MOUSE_TRAVEL_Z[1]) <= 0.001;
		const atMaxZ = Math.abs(position.z - MOUSE_TRAVEL_Z[0]) <= 0.001;

		// check if the mouse reached the edge of the allowed area
		// mouseAtEdgeLimit.current.x.min = atMinX;
		// mouseAtEdgeLimit.current.x.max = atMaxX;
		// mouseAtEdgeLimit.current.z.min = atMinZ;
		// mouseAtEdgeLimit.current.z.max = atMaxZ;
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

		axisHelperGroupRef.current?.matrix.copy(localMatrix);
		axisHelperGroupRef.current!.matrixWorldNeedsUpdate = true;
	};

	const uiComponentProps = {
		data: {
			myData: { name, nodes, axisHelperVisible, ot7Material, mouseAtEdge },
		},
		functions: { myFunctions: { events: interaction.events, handleMouseDrag, setAxisHelperVisible } },
		refs: { myRefs: { mouseRef, mousePivotRef, axisHelperGroupRef, mouseAreaMaterialRef } },
	};
	return <MouseUI props={uiComponentProps} />;
};

export default Mouse;
