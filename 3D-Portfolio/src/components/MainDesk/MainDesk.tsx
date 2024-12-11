import { CustomMeshProps } from "../../interfaces/GLlnterfaces";
import MainDeskUI from "./MainDeskUI";

const MainDesk: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const uiComponentProps = {
		data: {
			myData: {
				name: name,
				nodes: nodes,
			},
		},
		functions: { myFunctions: {} },
		refs: { myRefs: {} },
	};

	return <MainDeskUI props={uiComponentProps} />;
};

export default MainDesk;
