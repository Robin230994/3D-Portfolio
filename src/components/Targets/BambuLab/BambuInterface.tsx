import { Html } from "@react-three/drei";
import { useControls } from "leva";
import {
	Cloud,
	Computer,
	Folder,
	House,
	SlidersHorizontal,
	Wifi,
	TubeLotion,
	WavesVertical,
	Disc3,
	Settings,
	CircleQuestionMark,
	Pause,
	Square,
} from "lucide-react";

const BambuInterface = () => {
	console.log("rendered");
	const { interfacePos, interfaceRot } = useControls("BambuLab", {
		interfacePos: { value: { x: -2.935, y: 2.36, z: 1.63 }, step: 0.001 },
		interfaceRot: { value: { x: 0.25, y: Math.PI, z: 0 }, step: 0.01 },
	});
	return (
		<Html
			transform
			position={[interfacePos.x, interfacePos.y, interfacePos.z]}
			rotation={[interfaceRot.x, interfaceRot.y, interfaceRot.z]}
			scale={1}
			distanceFactor={1}>
			<div className="bambu-interface-container">
				<div className="bambu-interface-header">
					<div>
						<House size={6} color="#20C878" />
						<SlidersHorizontal size={6} color="#20C878" />
						<Folder size={6} color="#20C878" />
						<Computer size={6} color="#20C878" />
					</div>

					<div>
						<Wifi size={6} color="#20C878" />
						<Cloud size={6} color="#20C878" />
					</div>
				</div>
				<div className="bambu-interface-main">
					<div className="bambu-interface-content">
						<div className="bambu-print-file-container">
							<img src="/images/BambuLab/bambu-lab-x1c.png" />
							<button>Print Files</button>
						</div>
						<div className="bambu-settings-container">
							<div className="bambu-setting">
								<TubeLotion size={6} color="#aaa" />
								<div>
									<p className="bambu-setting-heading">Nozzle</p>
									<p>
										<span className="temperature">220</span> °C
									</p>
								</div>
							</div>
							<div className="bambu-setting">
								<WavesVertical size={6} color="#aaa" />
								<div>
									<p className="bambu-setting-heading">Bed</p>
									<p>
										<span className="temperature">36</span> °C
									</p>
								</div>
							</div>

							<div className="bambu-setting">
								<div>
									<img src="/images/BambuLab/white-spool.png" />
									<img src="/images/BambuLab/black-spool.png" />
									<img src="/images/BambuLab/red-spool.png" />
									<img src="/images/BambuLab/blue-spool.png" />
								</div>
							</div>
						</div>
					</div>
					<div className="bambu-options">
						<div>
							<Disc3 size={6} color="#aaa" />
							<p>Filament</p>
						</div>
						<div>
							<SlidersHorizontal size={6} color="#aaa" />
							<p>Control</p>
						</div>
						<div>
							<Settings size={6} color="#aaa" />
							<p>Settings</p>
						</div>
						<div>
							<CircleQuestionMark size={6} color="#aaa" />
							<p>Help</p>
						</div>
					</div>
				</div>
				<div className="bambu-interface-footer">
					<div className="bambu-process">
						<input type="range" min={0} max={100} />
						<p>0%</p>
					</div>
					<div className="bambu-print-controls">
						<div className="active">
							<Pause size={8} color="#fff" fill="#fff" />
						</div>
						<div>
							<Square size={8} color="#fff" fill="#fff" />
						</div>
					</div>
				</div>
			</div>
		</Html>
	);
};

export default BambuInterface;
