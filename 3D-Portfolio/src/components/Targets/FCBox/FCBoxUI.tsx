import React, { RefObject } from "react";
import { IUIComponentProps } from "../../../types/GLTypes";
import { DirectionalLight, Group, Mesh } from "three";
import { Object3D } from "three";
import { useControls } from "leva";
import { iot2Material } from "../../../Helper/GLMaterials";
import InteractionLabel from "../../InteractionLabel/InteractionLabel";

interface FCBoxUIProps extends IUIComponentProps {
	props: {
		data: {
			myData: {
				name: string;
				nodes: { [key: string]: Mesh | DirectionalLight };
				selectObjectFocus: { name: string; object: Object3D } | null;
				cameraIsMoving: boolean;
			};
		};
		functions: {
			myFunctions: {
				setSelectObjectFocus: React.Dispatch<React.SetStateAction<{ name: string; object: Object3D } | null>>;
			};
		};
		refs: { myRefs: { fcBoxRef: RefObject<Group> } };
	};
}

const FCBoxUI: React.FC<FCBoxUIProps> = ({ props }) => {
	const { myData } = props.data;
	const { myFunctions } = props.functions;
	const { myRefs } = props.refs;

	const { name, nodes, selectObjectFocus, cameraIsMoving } = myData;
	const { setSelectObjectFocus } = myFunctions;
	const { fcBoxRef } = myRefs;

	const FCBoxTop: Mesh = nodes["FCBoxTop"] as Mesh;

	const { backLabelPos } = useControls("FCBoxLabel", {
		backLabelPos: { value: { x: -40, y: 0, z: 9 }, step: 0.1 },
	});

	return (
		<React.Fragment>
			<group
				name={name}
				ref={fcBoxRef}
				onClick={() => {
					if (fcBoxRef.current) {
						setSelectObjectFocus({ name: name, object: fcBoxRef.current });
					}
				}}>
				<group>
					<group position={FCBoxTop.position} rotation={FCBoxTop.rotation}>
						<mesh geometry={FCBoxTop.geometry} scale={FCBoxTop.scale} material={iot2Material}>
							<InteractionLabel
								labelPos={[backLabelPos.x, backLabelPos.y, backLabelPos.z]}
								visible={!cameraIsMoving && selectObjectFocus?.name === name}
								dispatch={() => setSelectObjectFocus(null)}>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
									<path
										fillRule="evenodd"
										d="M9.53 2.47a.75.75 0 0 1 0 1.06L4.81 8.25H15a6.75 6.75 0 0 1 0 13.5h-3a.75.75 0 0 1 0-1.5h3a5.25 5.25 0 1 0 0-10.5H4.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z"
										clipRule="evenodd"
									/>
								</svg>
							</InteractionLabel>
						</mesh>
					</group>
				</group>
			</group>
		</React.Fragment>
	);
};

export default FCBoxUI;
