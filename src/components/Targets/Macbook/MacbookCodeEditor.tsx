import { Editor, OnMount } from "@monaco-editor/react";
import { useRef, useState } from "react";
import { PlaygroundFile } from "../../../utils/Types";
import { useCodePlaygroundStore } from "../../../stores/useCodePlaygroundStore";
import type { editor } from "monaco-editor";

const fileLabels: Record<PlaygroundFile, string> = {
	html: "index.html",
	css: "styles.css",
	js: "index.js",
};

const MacbookCodeEditor: React.FC = () => {
	const [activeFile, setActiveFile] = useState<PlaygroundFile>("html");

	const code = useCodePlaygroundStore((state) => state[activeFile]);
	const setFile = useCodePlaygroundStore((state) => state.setFile);

	const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

	const handleOnMount: OnMount = (editor) => {
		editorRef.current = editor;
	};

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
				width={"100%"}
				height="100%"
				theme="vs-dark"
				language={activeFile === "js" ? "javascript" : activeFile}
				value={code}
				onChange={(value) => setFile(activeFile, value ?? "")}
				onMount={handleOnMount}
				options={{ fontSize: 13, minimap: { enabled: false }, padding: { top: 12 }, scrollBeyondLastLine: false, wordWrap: "on", automaticLayout: true }}
			/>
		</div>
	);
};

export default MacbookCodeEditor;
