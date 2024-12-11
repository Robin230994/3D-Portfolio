import { useEffect, useRef } from "react";
import { BoxGeometry, BufferGeometry, InstancedMesh, Material, MeshStandardMaterial, NormalBufferAttributes, Object3D } from "three";

type Instances = {
	instance: Array<{
		position: [number, number, number];
		rotation?: [number, number, number];
	}>;
	geometry: BufferGeometry<NormalBufferAttributes> | undefined;
	material: Material | Material[] | undefined;
};

const InstantiatedMesh: React.FC<Instances> = ({ instance, geometry, material }) => {
	const instancedMeshRef = useRef<InstancedMesh>(null);

	useEffect(() => {
		if (!instancedMeshRef.current) return;
		const dummy = new Object3D();

		instance.forEach(({ position, rotation }, index) => {
			dummy.position.set(...position);
			if (rotation) {
				dummy.rotation.set(...rotation);
			}
			dummy.updateMatrix();

			instancedMeshRef.current!.setMatrixAt(index, dummy.matrix);
		});

		instancedMeshRef.current.instanceMatrix.needsUpdate = true;
	}, [instance]);

	return <instancedMesh ref={instancedMeshRef} args={[geometry || new BoxGeometry(), material || new MeshStandardMaterial(), instance.length]} />;
};

export default InstantiatedMesh;
