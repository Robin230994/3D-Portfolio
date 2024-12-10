import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.scss";
import Experience from "./Experience";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Experience />{" "}
	</StrictMode>
);
