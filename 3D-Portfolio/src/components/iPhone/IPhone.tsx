import React from "react";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";

import IPhoneUI from "./iPhoneUI";

const IPhone: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const uiComponentProps = {
		data: { myData: { name: name, nodes: nodes } },
		functions: { myFunctions: {} },
		refs: { myRefs: {} },
	};
	return <IPhoneUI props={uiComponentProps} />;
};

export default IPhone;
