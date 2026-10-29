import react from "@vitejs/plugin-react";
import restart from "vite-plugin-restart";
import glsl from "vite-plugin-glsl";

import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), glsl(), restart({ restart: ["./public/**"] })],
	build: {
		outDir: "../dist", // Output in the dist/ folder
		emptyOutDir: true, // Empty the folder first
		sourcemap: true, // Add sourcemap
	},
	server: {
		host: true, // Open to local network and display URL
		open: !("SANDBOX_URL" in process.env || "CODESANDBOX_HOST" in process.env), // Open if it's not a CodeSandbox
	},
});
