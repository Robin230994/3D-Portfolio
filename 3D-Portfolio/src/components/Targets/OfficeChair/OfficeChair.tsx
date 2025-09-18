import React from "react";
import OfficeChairUI from "./OfficeChairUI";
import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";
import { useHoverContext } from "../../../hooks/useHoverContext";
import { useFocusContext } from "../../../hooks/useFocusContext";

const OfficeChair: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const { selectObjectFocus } = useFocusContext();
	const { setIsAnyHovered } = useHoverContext();

	const uiComponentProps = {
		data: { myData: { name, nodes, selectObjectFocus } },
		functions: { myFunctions: { setIsAnyHovered } },
		refs: { myRefs: {} },
	};
	return <OfficeChairUI props={uiComponentProps} />;
};

export default OfficeChair;
