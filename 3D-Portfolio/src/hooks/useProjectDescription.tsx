import { useMemo } from "react";
import { useFocusStore } from "../Stores/useFocusStore";
import { IProjectDescription } from "../interfaces/GLlnterfaces";

const projectDescriptions: Record<string, IProjectDescription> = {
	Musterbox: {
		projectName: "Musterbox",
		heading: "Musterbox 2021 – Augmented-Reality-App für WEILBURGER Graphics",
		text:
			"Für das Musterbox-Projekt 2021 von WEILBURGER Graphics habe ich eine interaktive Augmented-Reality-App für iOS und Android entwickelt." +
			" Die Anwendung erweitert die physische Musterbox um eine digitale Ebene und ermöglicht es, die enthaltenen Druck- und Veredelungsbeispiele auch virtuell zu erkunden.\n\n" +
			" Im Mittelpunkt der Entwicklung stand dabei die Verbindung von realen und digitalen Inhalten. Über die App können Nutzer die Musterbox und ihre individuellen Boxen virtuell entdecken und direkt auf weiterführende Inhalte wie Tutorials, Produktionsinformationen und Verarbeitungstipps zugreifen." +
			" Die Inhalte wurden in Deutsch und Englisch bereitgestellt.\n\n Damit entstand eine digitale Ergänzung zur physischen Musterkollektion, die Produktinformationen, Schulungsmaterialien und interaktive AR-Erlebnisse in einer zentralen Anwendung zusammenführt." +
			" Die App wurde für iOS und Android umgesetzt und war sowohl in Verbindung mit der realen Musterbox als auch unabhängig davon nutzbar.",
		tags: ["App-Entwicklung", "3D"],
	},
};

const useProjectDescription = () => {
	const selectObjectFocusName = useFocusStore((state) => state.selectObjectFocus?.name ?? null);

	const project = useMemo(() => {
		if (!selectObjectFocusName) return null;

		return projectDescriptions[selectObjectFocusName] ?? null;
	}, [selectObjectFocusName]);

	return {
		project: project,
	};
};

export default useProjectDescription;
