import { useControls } from "leva";
import MaterialCreator from "../../classes/MaterialCreator";
import { CustomMeshProps } from "../../interfaces/GLlnterfaces";

const materialCreator = MaterialCreator.getInstance();
const coffeeCupStandMaterial = materialCreator.createEmptyStandardMaterial("CupStand");

const CoffeCupStand: React.FC<CustomMeshProps> = ({ name, object }) => {
	const coffeeCupStandParams = useControls(
		"CoffeeCupStand",
		{
			roughness: { value: 0, min: 0, max: 1, step: 0.1 },
			metalness: { value: 0, min: 0, max: 1, step: 0.1 },
			color: "#ffffff",
		},
		{ collapsed: true }
	);

	return (
		<mesh name={name} geometry={object.geometry} position={object.position} rotation={object.rotation}>
			<meshStandardMaterial
				{...coffeeCupStandMaterial}
				metalness={coffeeCupStandParams.metalness}
				roughness={coffeeCupStandParams.roughness}
				color={coffeeCupStandParams.color}
			/>
		</mesh>
	);
};

export default CoffeCupStand;
