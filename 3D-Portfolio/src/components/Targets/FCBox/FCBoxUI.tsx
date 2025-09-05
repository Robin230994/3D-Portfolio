import React, { RefObject } from "react";
import { IUIComponentProps } from "../../../types/GLTypes";
import { DirectionalLight, Group, Mesh } from "three";
import { Object3D } from "three";
import { useControls } from "leva";
import { iot2Material } from "../../../Helper/GLMaterials";
import InteractionLabel from "../../InteractionLabel/InteractionLabel";

interface FCBoxUIProps extends IUIComponentProps {
	props: {
		data: { myData: { name: string; nodes: { [key: string]: Mesh | DirectionalLight }; selectObjectFocus: { name: string; object: Object3D } | null } };
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

	const { name, nodes, selectObjectFocus } = myData;
	const { setSelectObjectFocus } = myFunctions;
	const { fcBoxRef } = myRefs;

	const FCBoxTop: Mesh = nodes["FCBoxTop"] as Mesh;

	const { backLabelPos } = useControls("FCBoxLabel", {
		backLabelPos: { value: { x: 0, y: 0, z: 0 }, step: 0.001 },
	});

	return (
		<React.Fragment>
			<group
				name={name}
				ref={fcBoxRef}
				onClick={(e) => {
					if (fcBoxRef.current) {
						setSelectObjectFocus({ name: name, object: fcBoxRef.current });
					}
				}}>
				<group>
					<group position={FCBoxTop.position} rotation={FCBoxTop.rotation}>
						<mesh geometry={FCBoxTop.geometry} scale={FCBoxTop.scale} material={iot2Material}>
							{/* <Html wrapperClass="hover-label" position={[backLabelPos.x, backLabelPos.y, backLabelPos.z]} occlude={false} center>
								<button onClick={moveToLatestCameraPos}>Back</button>
							</Html> */}
							<InteractionLabel
								labelPos={[backLabelPos.x, backLabelPos.y, backLabelPos.z]}
								visible={selectObjectFocus !== null}
								dispatch={() => setSelectObjectFocus(null)}>
								Back
							</InteractionLabel>
						</mesh>
					</group>
				</group>
			</group>
		</React.Fragment>
	);
};

export default FCBoxUI;
