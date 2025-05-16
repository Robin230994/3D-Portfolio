import React from "react";
import BambuLabUI from "./BambuLabUI";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";
import { useHoverContext } from "../../hooks/useHoverContext";

const BambuLab: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const { selectObjectHovered, setSelectObjectHovered } = useHoverContext();

	const uiComponentProps = {
		data: { myData: { name: name, nodes: nodes, selectObjectHovered: selectObjectHovered } },
		functions: { myFunctions: { setSelectObjectHovered } },
		refs: { myRefs: {} },
	};
	return <BambuLabUI props={uiComponentProps} />;
};

export default BambuLab;
