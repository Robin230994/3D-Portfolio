import { Html } from "@react-three/drei";
import { useEffect, useState } from "react";

const InteractionLabel = ({
	visible,
	children,
	labelPos,
	dispatch,
}: {
	visible: boolean;
	children: React.ReactNode;
	labelPos: [number, number, number];
	dispatch?: () => void;
}) => {
	const [, setShow] = useState(false);

	useEffect(() => {
		if (visible) {
			setShow(true);
		} else {
			const timer = setTimeout(() => setShow(false), 300);
			return () => clearTimeout(timer);
		}
	}, [visible]);

	return (
		<Html
			position={labelPos}
			wrapperClass={`hover-label ${visible ? "visible" : ""}`}
			occlude={false}
			center
			style={{ pointerEvents: visible ? "auto" : "none" }}>
			{dispatch && (
				<button
					onClick={(e) => {
						e.stopPropagation();
						dispatch?.();
					}}>
					{children}
				</button>
			)}
		</Html>
	);
};

export default InteractionLabel;
