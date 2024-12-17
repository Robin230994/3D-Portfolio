import { useEffect, useRef } from "react";
import { BufferAttribute } from "three";
import { BoxGeometry, BufferGeometry, InstancedMesh, Material, MeshStandardMaterial, NormalBufferAttributes, Object3D } from "three";

type Instances = {
	instance: Array<{
		position: [number, number, number];
		rotation?: [number, number, number];
		color?: [number, number, number];
	}>;
	geometry: BufferGeometry<NormalBufferAttributes> | undefined;
	material?: Material | Material[] | undefined;
};

const InstantiatedMesh: React.FC<Instances> = ({ instance, geometry, material }) => {
	const instancedMeshRef = useRef<InstancedMesh>(null);

	useEffect(() => {
		if (!instancedMeshRef.current) return;
		const dummy = new Object3D();
		const colorArray = new Float32Array(instance.length * 3); // Assign a color array which takes 3 values for each color (RGB).

		instance.forEach(({ position, rotation, color }, index) => {
			dummy.position.set(...position);
			if (rotation) {
				dummy.rotation.set(...rotation);
			}
			dummy.updateMatrix();

			instancedMeshRef.current!.setMatrixAt(index, dummy.matrix);

			// Set the color when given as prop
			if (color) {
				colorArray.set(color, index * 3);
			} else {
				// Set the default color to white
				colorArray.set([1, 1, 1], index * 3);
			}
		});

		instancedMeshRef.current.instanceMatrix.needsUpdate = true;

		// Update the color buffer
		instancedMeshRef.current.geometry.setAttribute(
			"instanceColor",
			new BufferAttribute(colorArray, 3) // 3 values per color (R, G, B)
		);
	}, [instance]);

	return (
		<instancedMesh
			ref={instancedMeshRef}
			args={[geometry || new BoxGeometry(), material || new MeshStandardMaterial({ vertexColors: true }), instance.length]}
		/>
	);
};

export default InstantiatedMesh;
