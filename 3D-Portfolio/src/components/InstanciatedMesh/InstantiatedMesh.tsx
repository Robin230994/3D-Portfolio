import { useEffect, useRef } from "react";
import { Color, ColorManagement } from "three";
import { BoxGeometry, BufferGeometry, InstancedMesh, Material, MeshStandardMaterial, NormalBufferAttributes, Object3D } from "three";

ColorManagement.enabled = true;

type Instances = {
	instance: Array<{
		position: [number, number, number];
		rotation?: [number, number, number];
		scale?: [number, number, number];
		color?: Color;
	}>;
	geometry: BufferGeometry<NormalBufferAttributes> | undefined;
	material?: Material | Material[] | undefined;
	name?: string;
};

const InstantiatedMesh: React.FC<Instances> = ({ instance, geometry, material, name }) => {
	const instancedMeshRef = useRef<InstancedMesh>(null);

	useEffect(() => {
		if (!instancedMeshRef.current) return;
		const dummy = new Object3D();

		instance.forEach(({ position, rotation, scale, color }, index) => {
			dummy.position.set(...position);
			if (rotation) {
				dummy.rotation.set(...rotation);
			}
			if (scale) {
				dummy.scale.set(...scale);
			} else {
				dummy.scale.set(1, 1, 1);
			}
			dummy.updateMatrix();

			instancedMeshRef.current!.setMatrixAt(index, dummy.matrix);

			// Set the color when given as prop
			if (color) {
				instancedMeshRef.current!.setColorAt(index, color);
			} else {
				instancedMeshRef.current!.setColorAt(index, new Color("#ffffff"));
			}
		});

		instancedMeshRef.current.instanceMatrix.needsUpdate = true;

		if (instancedMeshRef.current.instanceColor) {
			instancedMeshRef.current.instanceColor.needsUpdate = true;
		}
	}, [instance]);

	return (
		<instancedMesh
			name={name ? name : ""}
			ref={instancedMeshRef}
			frustumCulled={false}
			args={[geometry ? geometry : new BoxGeometry(), material === undefined ? new MeshStandardMaterial({ vertexColors: true }) : material, instance.length]}
		/>
	);
};

export default InstantiatedMesh;
