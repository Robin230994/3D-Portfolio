import { Material, Mesh } from "three";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";
import MaterialCreator from "../../classes/MaterialCreator";
import { useEffect } from "react";

const materialCreator = MaterialCreator.getInstance();

const Outside: React.FC<CustomMeshProps> = ({ name, nodes }) => {
	const Outside = nodes["outside"] as Mesh;
	const outsideMaterial = Outside.material as Material;

	useEffect(() => {
		outsideMaterial.alphaTest = 0.5;
		materialCreator.addInstanciatedMaterial("OutsideMaterial", outsideMaterial);
	}, [outsideMaterial]);

	return (
		<group name={name}>
			<mesh geometry={Outside.geometry} position={Outside.position} rotation={Outside.rotation} scale={Outside.scale} material={outsideMaterial} />
		</group>
	);
};

export default Outside;
