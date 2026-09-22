import { create } from "zustand";

export const VIRTUAL_DISPLAYS = {
	macbook: { left: 0, top: 0, width: 532, height: 341 },
	screen: { left: 532, top: 0, width: 560, height: 360 },
} as const;

export const VIRTUAL_DESKTOP_SIZE = {
	width: VIRTUAL_DISPLAYS.macbook.width + VIRTUAL_DISPLAYS.screen.width,
	height: Math.max(VIRTUAL_DISPLAYS.macbook.height, VIRTUAL_DISPLAYS.screen.height),
} as const;

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
