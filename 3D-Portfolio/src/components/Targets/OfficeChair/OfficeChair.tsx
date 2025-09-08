import React from "react";
import OfficeChairUI from "./OfficeChairUI";
import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";

const OfficeChair: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const uiComponentProps = {
		data: { myData: { name, nodes } },
		functions: { myFunctions: {} },
		refs: { myRefs: {} },
	};
	return <OfficeChairUI props={uiComponentProps} />;
};

export default OfficeChair;
