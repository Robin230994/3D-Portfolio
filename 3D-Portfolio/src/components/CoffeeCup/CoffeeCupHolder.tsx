import { CustomMeshProps } from "../../interfaces/GLlnterfaces";

const CoffeeCupHolder: React.FC<CustomMeshProps> = ({ name, object }) => {
	return <mesh name={name} geometry={object.geometry}></mesh>;
};

export default CoffeeCupHolder;
