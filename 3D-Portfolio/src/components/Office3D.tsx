import React from "react";

function Office3D() {
	return (
		<mesh>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color={"black"} />
		</mesh>
	);
}

export default Office3D;
