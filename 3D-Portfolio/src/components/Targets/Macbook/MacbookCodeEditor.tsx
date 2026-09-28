import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import { PlaygroundFile } from "../../../utils/Types";
import { useCodePlaygroundStore } from "../../../Stores/useCodePlaygroundStore";

const fileLabels: Record<PlaygroundFile, string> = {
	html: "index.html",
	css: "styles.css",
	js: "index.js",
};

const MacbookCodeEditor: React.FC = () => {
	const [activeFile, setActiveFile] = useState<PlaygroundFile>("html");

	const code = useCodePlaygroundStore((state) => state[activeFile]);
	const setFile = useCodePlaygroundStore((state) => state.setFile);

	return (
		<div className="code-editor">
			<div className="code-editor-tabs">
				{(Object.keys(fileLabels) as PlaygroundFile[]).map((file) => (
					<button key={file} className={`editor-tab ${activeFile === file ? "is-active" : ""}`} onClick={() => setActiveFile(file)}>
						{fileLabels[file]}
					</button>
				))}
			</div>
			<Editor
				height="100%"
				theme="vs-dark"
				language={activeFile === "js" ? "javascript" : activeFile}
				value={code}
				onChange={(value) => setFile(activeFile, value ?? "")}
				options={{ fontSize: 13, minimap: { enabled: false }, padding: { top: 12 }, scrollBeyondLastLine: false }}
			/>
		</div>
	);
};

export default MacbookCodeEditor;
