import React, { useRef } from "react";
import MusterboxUI from "./MusterboxUI";
import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";
import { Group } from "three";
import { useHoverContext } from "../../../hooks/useFocusContext";

const Musterbox: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const { setSelectObjectFocus: setSelectObjectHovered } = useHoverContext();
	const musterboxRef = useRef<Group>(null);

	const uiComponentProps = {
		data: { myData: { name: name, nodes: nodes } },
		functions: { myFunctions: { setSelectObjectHovered } },
		refs: { myRefs: { musterboxRef } },
	};
	return <MusterboxUI props={uiComponentProps} />;
};

export default Musterbox;
