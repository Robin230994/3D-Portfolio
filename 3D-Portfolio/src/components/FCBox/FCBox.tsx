import { CustomMeshProps } from "../../interfaces/GLlnterfaces";
import { useHoverContext } from "../../hooks/useHoverContext";

import React from "react";
import FCBoxUI from "./FCBoxUI";

const FCBox: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const { selectObjectHovered, setSelectObjectHovered } = useHoverContext();

	const uiComponentProps = {
		data: { myData: { name: name, nodes: nodes, selectObjectHovered: selectObjectHovered } },
		functions: { myFunctions: { setSelectObjectHovered } },
		refs: { myRefs: {} },
	};
	return <FCBoxUI props={uiComponentProps} />;
};

export default FCBox;
