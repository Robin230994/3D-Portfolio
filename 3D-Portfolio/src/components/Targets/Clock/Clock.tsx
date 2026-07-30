import React, { useRef } from "react";
import ClockUI from "./ClockUI";
import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";
import { useObjectInteractionStore } from "../../../Stores/useObjectInteractionStore";
import { useCameraStore } from "../../../Stores/useCameraStore";

const Clock: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const { selectObjectFocus, hoveredObject, setSelectObjectFocus, setHoveredObject } = useObjectInteractionStore();
	const { cameraIsMoving } = useCameraStore();

	const minuteRef = useRef<Mesh>(null);
	const hourRef = useRef<Mesh>(null);

	useFrame(() => {
		const now = new Date();

		const hours = now.getHours();
		const minutes = now.getMinutes();
		const seconds = now.getSeconds();

		const exactMinutes = minutes + seconds / 60;

		const minuteRotation = -(exactMinutes / 60) * Math.PI * 2;
		const hourRotation = -(((hours % 12) + exactMinutes / 60) / 12) * Math.PI * 2;

		if (minuteRef.current) {
			minuteRef.current.rotation.z = minuteRotation;
		}

		if (hourRef.current) {
			hourRef.current.rotation.z = hourRotation;
		}
	});

	const uiComponentProps = {
		data: {
			myData: { name, nodes, hoveredObject, selectObjectFocus, cameraIsMoving },
		},
		functions: {
			myFunctions: {
				setHoveredObject,
				setSelectObjectFocus,
			},
		},
		refs: {
			myRefs: {
				minuteRef,
				hourRef,
			},
		},
	};
	return <ClockUI props={uiComponentProps} />;
};

export default Clock;
