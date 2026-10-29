import { PerformanceMonitor } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

const AutoPerformance = () => {
	const regress = useThree((state) => state.performance.regress);

	return <PerformanceMonitor onDecline={regress} />;
};

export default AutoPerformance;
