import { CustomMeshProps } from "../../interfaces/GLlnterfaces";
import DesksUI from "./DesksUI";

const Desks: React.FC<CustomMeshProps> = ({ name, nodes }) => {
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

	return <DesksUI props={uiComponentProps} />;
};

export default Desks;
