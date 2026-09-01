import { useMemo } from "react";
import { IProjectDescription } from "../interfaces/GLlnterfaces";
import { useProjectPanelStore } from "../Stores/useProjectPanelStore";

const projectDescriptions: Record<string, IProjectDescription> = {
	Musterbox: {
		projectName: "Musterbox",
		heading: "Musterbox 2021 – Augmented-Reality-App für Weilburger Graphics",
		text:
			"Für das Musterbox-Projekt 2021 von WEILBURGER Graphics habe ich eine interaktive Augmented-Reality-App für iOS und Android entwickelt." +
			" Ziel war es, die physische Musterkollektion durch eine digitale, interaktive Ebene zu erweitern und die verschiedenen Druck- und Veredelungsmuster virtuell erlebbar zu machen.\n\n" +
			"Die Anwendung wurde vollständig in Unity entwickelt und mit C# programmiert. Unity bildete dabei die technische Basis für die AR-Funktionalitäten, die Darstellung der 3D-Inhalte und die Interaktionen innerhalb der Anwendung." +
			" Eine zentrale Herausforderung bestand darin, die physischen Muster der Box zuverlässig mit den entsprechenden digitalen Inhalten zu verknüpfen und dabei eine intuitive Nutzerführung zu schaffen.\n\n" +
			"Über die AR-Funktionen können Nutzer die einzelnen Muster erkennen und zusätzliche digitale Inhalte direkt im räumlichen Kontext erleben." +
			" Neben interaktiven 3D-Elementen bietet die App weiterführende Informationen, Tutorials sowie Produktions- und Verarbeitungstipps. Die Inhalte wurden zweisprachig in Deutsch und Englisch umgesetzt.\n\n" +
			"Die einzelnen Musterboxen wurden dabei als eigenständige digitale Inhalte innerhalb der Anwendung abgebildet. Dadurch konnte die physische Musterbox als Ausgangspunkt für eine umfangreichere digitale Produkterfahrung genutzt werden, ohne dass die App ausschließlich von der physischen Box abhängig ist.\n\n" +
			"Neben der Entwicklung der AR- und Interaktionslogik lag mein Fokus auf der technischen Umsetzung und Optimierung der Anwendung für iOS und Android. So entstand eine plattformübergreifende Unity-Anwendung, die physische Produktmuster mit digitalen Informationen, 3D-Inhalten und interaktiven AR-Erlebnissen verbindet.",
		images: [
			{
				src: "/images/weilburger_musterbox_app.jpg",
				alt: "Musterbox App 2021",
			},
		],
		tags: ["App-Entwicklung", "3D", "Unity", "C#", "Augmented Reality", "iOS", "Android"],
		moreInfo: "https://www.alexanderdort.com/portfolio/musterbox-projekt-fuer-weilburger-graphics.html",
	},

	Musterbox01: {
		projectName: "Musterbox 01",
		heading: "Musterbox 01 - Glanz-/Matt-Kontraste aus dem Farbwerk",
		text: "Kombination aus matten und glänzenden UV-Lacken, die durch unterschiedliche Lackstrukturen einen kontrastreichen visuellen Effekt erzeugt.",
		tags: ["App-Entwicklung", "3D"],
		images: [
			{
				src: "/images/weilburger_musterbox_box01.jpg",
				alt: "Musterbox 01",
			},
		],
	},

	Musterbox02: {
		projectName: "Musterbox 02",
		heading: "Musterbox 02 - UV/UV-Hybrid Effekt auf MET-PET-Folie",
		text: "Hybrid-Lackierung auf metallisierter PET-Folie, bei der glänzende und matte Bereiche miteinander kombiniert werden.",
		tags: ["App-Entwicklung", "3D"],
		images: [
			{
				src: "/images/weilburger_musterbox_box02.jpg",
				alt: "Musterbox 02",
			},
		],
	},

	Musterbox03: {
		projectName: "Musterbox 03",
		heading: "Musterbox 03 - OB/UV-Hybrid Effekt Matt/Glanz",
		text: "Matt- und Glanzeffekte durch die Kombination von wasser- und UV-basierten Lacken. Zusätzlich sorgt ein Imprägnierlack auf der Innenseite für besondere Eigenschaften.",
		tags: ["App-Entwicklung", "3D"],
	},

	Musterbox04: {
		projectName: "Musterbox 04",
		heading: "Musterbox 04 - OB/WB-TWIN Effekt Matt/Glanz",
		text: "Matt-/Glanz-Kontrast mit wasserbasierten und öl-/UV-basierten Lacken. Die Innenseite erhält zusätzlich eine scheuerfeste Glanzlackierung.",
		tags: ["App-Entwicklung", "3D"],
	},

	Musterbox05: {
		projectName: "Musterbox 05",
		heading: "Musterbox 05 - UV-LED-Hybrid Effekt",
		text: "Hybrid-Effekt aus matten und glänzenden Lacken, speziell für den Einsatz mit moderner UV-LED-Drucktechnologie.",
		tags: ["App-Entwicklung", "3D"],
	},

	Musterbox06: {
		projectName: "Musterbox 06",
		heading: "Musterbox 06 - Deckweiß auf braunem Substrat",
		text: "Deckendes Weiß auf einem braunen Naturkarton. Der Effekt zeigt, wie sich helle Druckflächen auf dunklen Substraten realisieren lassen.",
		tags: ["App-Entwicklung", "3D"],
	},

	Musterbox07: {
		projectName: "Musterbox 07",
		heading: "Musterbox 07 - Haptischer Softlack auf UV-Basis",
		text: "Ein UV-basierter Softlack mit einer besonders weichen und angenehmen Haptik.",
		tags: ["App-Entwicklung", "3D"],
	},

	Musterbox08: {
		projectName: "Musterbox 08",
		heading: "Musterbox 08 - Haptischer, texturierter Mattlack",
		text: "Matter Lack mit strukturierter Oberfläche, der dem Druckprodukt eine deutlich spürbare Textur verleiht.",
		tags: ["App-Entwicklung", "3D"],
	},

	Musterbox09: {
		projectName: "Musterbox 09",
		heading: "Musterbox 09 - Haptischer Softlack mit Gummieffekt",
		text: "Eine besonders griffige Soft-Touch-Oberfläche mit einem haptischen Gummieffekt.",
		tags: ["App-Entwicklung", "3D"],
	},

	Musterbox10: {
		projectName: "Musterbox 10",
		heading: "Musterbox 10 - Haptischer Softlack auf Wasserbasis",
		text: "Wasserbasierter Mattlack mit einer weichen, samtigen Oberfläche und angenehmer Haptik.",
		tags: ["App-Entwicklung", "3D"],
	},

	Musterbox11: {
		projectName: "Musterbox 11",
		heading: "Musterbox 11 - Haptischer Softlack in Verbindung mit partiellem Siebdruck-Relieflack",
		text: "Kombination aus Soft-Touch-Lack und partiellem Siebdruck-Relieflack für einen fühlbaren, dreidimensionalen Effekt.",
		tags: ["App-Entwicklung", "3D"],
	},

	Musterbox12: {
		projectName: "Musterbox 12",
		heading: "Musterbox 12 - Haptischer Seidenmatt-Softlack",
		text: "Softlack mit seidenmatter Oberfläche, der eine dezente und hochwertige Haptik erzeugt.",
		tags: ["App-Entwicklung", "3D"],
	},

	Musterbox13: {
		projectName: "Musterbox 13",
		heading: "Musterbox 13 - Wasserbasierter Hochglanzlack",
		text: "Wasserbasierter Lack mit einer stark glänzenden Oberfläche für intensive Glanzeffekte.",
		tags: ["App-Entwicklung", "3D"],
	},

	Musterbox14: {
		projectName: "Musterbox 14",
		heading: "Musterbox 14 - Drucksilber und Silberlack in Kombination mit Hochglanzlack",
		text: "Kombination aus Drucksilber, Silberlack und Hochglanzlack für eine metallische und besonders auffällige Oberfläche.",
		tags: ["App-Entwicklung", "3D"],
	},

	Musterbox15: {
		projectName: "Musterbox 15",
		heading: "Musterbox 15 - Wasserbasierter Hochglanzlack",
		text: "Wasserbasierter Hochglanzlack für eine brillante, gleichmäßige und besonders glänzende Oberfläche.",
		tags: ["App-Entwicklung", "3D"],
	},

	Musterbox16: {
		projectName: "Musterbox 16",
		heading: "Musterbox 16 - Wasserbasierter Glanzlack",
		text: "Wasserbasierter Glanzlack mit einer klaren, glänzenden Oberfläche zur Veredelung.",
		tags: ["App-Entwicklung", "3D"],
	},

	Musterbox17: {
		projectName: "Musterbox 17",
		heading: "Musterbox 17 - Wasserbasierter Seidenmattlack",
		text: "Seidenmatter Wasserlack mit einer zurückhaltenden, hochwertigen Oberfläche zwischen Glanz und Matt.",
		tags: ["App-Entwicklung", "3D"],
	},

	Musterbox18: {
		projectName: "Musterbox 18",
		heading: "Musterbox 18 - Wasserbasierter Mattlack",
		text: "Wasserbasierter Mattlack für eine gleichmäßig matte und reduzierte Oberflächenwirkung.",
		tags: ["App-Entwicklung", "3D"],
	},

	Musterbox19: {
		projectName: "Musterbox 19",
		heading: "Musterbox 19 - Partieller UV-Drucklack auf OPP-Mattfolie",
		text: "Partieller UV-Glanzlack auf matter OPP-Folie, wodurch gezielte glänzende Bereiche als Kontrast zur matten Oberfläche hervorgehoben werden.",
		tags: ["App-Entwicklung", "3D"],
	},

	Musterbox20: {
		projectName: "Musterbox 20",
		heading: "Musterbox 20 - Prägbarer UV-Mattlack",
		text: "UV-Mattlack, der zusätzlich für eine Prägung geeignet ist und dadurch visuelle und haptische Effekte miteinander verbindet.",
		tags: ["App-Entwicklung", "3D"],
	},

	Musterbox21: {
		projectName: "Musterbox 21",
		heading: "Musterbox 21 - Partieller UV-Glanzlack inline auf scheuerfestem WB Matt-Primer",
		text: "Partieller UV-Glanzlack auf einem scheuerfesten, wasserbasierten Matt-Primer für kontrastreiche Matt-/Glanz-Effekte.",
		tags: ["App-Entwicklung", "3D"],
	},

	Musterbox22: {
		projectName: "Musterbox 22",
		heading: "Musterbox 22 - Partieller UV-Glanzlack inline auf WB Glanz-Primer",
		text: "Kombination aus wasserbasiertem Glanz-Primer und partiellem UV-Glanzlack für unterschiedliche Glanzwirkungen.",
		tags: ["App-Entwicklung", "3D"],
	},

	Musterbox23: {
		projectName: "Musterbox 23",
		heading: "Musterbox 23 - Flächiger UV-Glanzlack inline auf WB Glanz-Primer",
		text: "Flächiger UV-Glanzlack auf wasserbasiertem Glanz-Primer für eine besonders gleichmäßige und brillante Oberfläche.",
		tags: ["App-Entwicklung", "3D"],
	},

	Musterbox24: {
		projectName: "Musterbox 24",
		heading: "Musterbox 24 - Partieller WB-Perleffektlack mit flächigem UV-Glanzlack",
		text: "Perlmuttartiger, wasserbasierter Effektlack kombiniert mit flächigem UV-Glanzlack für eine schimmernde und hochwertige Oberfläche.",
		tags: ["App-Entwicklung", "3D"],
	},
};

const useProjectDescription = () => {
	const activeProject = useProjectPanelStore((state) => state.activeProject);

	const project = useMemo(() => {
		if (!activeProject) return null;

		return projectDescriptions[activeProject] ?? null;
	}, [activeProject]);

	return {
		project: project,
	};
};

export default useProjectDescription;
