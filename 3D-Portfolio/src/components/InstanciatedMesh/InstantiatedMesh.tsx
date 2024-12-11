import { useEffect, useRef } from "react";
import { BoxGeometry, BufferGeometry, InstancedMesh, Material, MeshStandardMaterial, NormalBufferAttributes, Object3D } from "three";

type Instances = {
	instance: [
		{
			position: [x: number, y: number, z: number];
			rotation?: [x: number, y: number, z: number];
		}
	];
	geometry: BufferGeometry<NormalBufferAttributes> | undefined;
	material: Material | Material[] | undefined;
};

const InstantiatedMesh = (props: Instances) => {
	const instancedMeshRef = useRef<InstancedMesh>(null);

	useEffect(() => {
		if (!instancedMeshRef.current) return;
		const dummy = new Object3D();

		props.instance.forEach(({ position, rotation }, index) => {
			dummy.position.set(...position);
			if (rotation) {
				dummy.rotation.set(...rotation);
			}
			dummy.updateMatrix();

			instancedMeshRef.current!.setMatrixAt(index, dummy.matrix);
		});

		instancedMeshRef.current.instanceMatrix.needsUpdate = true;
	}, [props.instance]);

	return (
		<instancedMesh ref={instancedMeshRef} args={[props.geometry || new BoxGeometry(), props.material || new MeshStandardMaterial(), props.instance.length]} />
	);
};

export default InstantiatedMesh;
