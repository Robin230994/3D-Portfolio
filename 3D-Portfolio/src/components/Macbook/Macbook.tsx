import React from "react";
import MacbookUI from "./MacbookUI";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";
import { useHoverContext } from "../../hooks/useHoverContext";

const Macbook: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const { selectObjectHovered, setSelectObjectHovered } = useHoverContext();

	const uiComponentProps = {
		data: {
			myData: {
				name: name,
				nodes: nodes,
				selectObjectHovered: selectObjectHovered,
			},
		},
		functions: { myFunctions: { setSelectObjectHovered } },
		refs: { myRefs: {} },
	};
	return <MacbookUI props={uiComponentProps} />;
};

export default Macbook;
