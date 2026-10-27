import { useEffect, useMemo, useState } from "react";
import { useCodePlaygroundStore } from "../../../stores/useCodePlaygroundStore";

const PlaygroundPreview: React.FC = () => {
	const html = useCodePlaygroundStore((state) => state.html);
	const css = useCodePlaygroundStore((state) => state.css);
	const js = useCodePlaygroundStore((state) => state.js);

	const documentSource = useMemo(
		() =>
			`<!doctype html>
            <html>
                <head>
                    <meta charset="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <style>${css}</style>
                </head>
                <body>
                    ${html}
                    <script type="module">${js.replace(/<\/script/gi, "<\\/script")}</script>
                </body>
            </html>`,
		[html, css, js],
	);

	// Avoids rebuilding the iframe for every single typed character.
	const [preview, setPreview] = useState(documentSource);

	useEffect(() => {
		setTimeout(() => {
			setPreview(documentSource);
		}, 500);
	});

	return (
		<div className="screen-code-preview">
			<iframe title="Code playground preview" srcDoc={preview} sandbox="allow-scripts" />
		</div>
	);
};

export default PlaygroundPreview;
