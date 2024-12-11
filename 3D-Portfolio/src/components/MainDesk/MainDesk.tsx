import { CustomMeshProps } from "../../interfaces/GLlnterfaces";

const MainDesk: React.FC<CustomMeshProps> = ({ name, object }) => {
	return <mesh name={name} geometry={object.geometry} position={object.position} rotation={object.rotation}></mesh>;
};

export default MainDesk;
