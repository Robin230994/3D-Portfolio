import React from "react";
import BillardTriangleUI from "./BillardTriangleUI";
import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";

const BillardTriangle: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const uiComponentProps = {
		data: { myData: { name, nodes } },
		functions: { myFunctions: {} },
		refs: { myRefs: {} },
	};
	return <BillardTriangleUI props={uiComponentProps} />;
};

export default BillardTriangle;
