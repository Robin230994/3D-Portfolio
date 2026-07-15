import React from "react";
import PictureFrameUI from "./PictureFrameUI";
import { CustomMeshProps } from "../../../interfaces/GLlnterfaces";

const PictureFrame: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const uiComponentProps = {
		data: {
			myData: { name, nodes },
		},
		functions: { myFunctions: {} },
		refs: { myRefs: {} },
	};
	return <PictureFrameUI props={uiComponentProps} />;
};

export default PictureFrame;
