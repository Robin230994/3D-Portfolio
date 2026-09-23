import { create } from "zustand";

export const VIRTUAL_DISPLAYS = {
	macbook: { left: 0, top: 0, width: 532, height: 341 },
	screen: { left: 532, top: 0, width: 560, height: 360 },
} as const;

export const VIRTUAL_DESKTOP_SIZE = {
	width: VIRTUAL_DISPLAYS.macbook.width + VIRTUAL_DISPLAYS.screen.width,
	height: Math.max(VIRTUAL_DISPLAYS.macbook.height, VIRTUAL_DISPLAYS.screen.height),
} as const;

interface IVirtualFolderPositions {
	FinderFolder: { x: [min: number, max: number]; y: [min: number, max: number] };
	ProjectFolders: { [name: string]: { x: [min: number, max: number]; y: [min: number, max: number] } };
}

// Coordinates that determine the position of the folders and other elements inside the Desktop. X and Y always describe a range for the virtual cursor
export const VIRTUAL_POSITIONS: IVirtualFolderPositions = {
	FinderFolder: {
		x: [160, 435],
		y: [74, 257],
	},
	ProjectFolders: {
		"Alexander Dort GmbH": {
			x: [177, 217],
			y: [76, 142],
		},
		Pslzme: {
			x: [253, 293],
			y: [76, 142],
		},
		"Printers Lounge": {
			x: [329, 369],
			y: [76, 142],
		},
		"Dorji Sushi To Go": {
			x: [177, 217],
			y: [159, 225],
		},
		CYVED: {
			x: [253, 293],
			y: [159, 225],
		},
		"Matthias Holder": {
			x: [329, 369],
			y: [159, 225],
		},
		"ALDUS Group": {
			x: [177, 217],
			y: [242, 308],
		},
		"ALDUS Foils": {
			x: [253, 293],
			y: [242, 308],
		},
		"ALDUS Machines": {
			x: [329, 369],
			y: [242, 308],
		},
		"ALDUS Inks": {
			x: [177, 217],
			y: [325, 391],
		},
	},
};

interface IVirtualCursorStore {
	x: number; // Global virtual pixels from the desktop
	y: number; // Global virtual pixels from the desktop
	virtualWheel: {
		wheelEventID: number;
		deltaY: number;
		x: number;
		y: number;
	};
	setCursorPosition: (x: number, y: number) => void;
	sendVirtualWheelData: (deltaY: number, cursorX: number, cursorY: number) => void;
}

export const useVirtualCursorStore = create<IVirtualCursorStore>((set) => ({
	x: 0,
	y: 0,
	virtualWheel: {
		wheelEventID: 0,
		deltaY: 0,
		x: 0,
		y: 0,
	},
	setCursorPosition: (x, y) => set({ x, y }),
	sendVirtualWheelData: (deltaY, cursorX, cursorY) =>
		set((state) => ({
			virtualWheel: {
				wheelEventID: state.virtualWheel.wheelEventID + 1,
				deltaY,
				x: cursorX,
				y: cursorY,
			},
		})),
}));
