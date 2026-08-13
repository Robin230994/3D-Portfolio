import { ISong } from "../interfaces/GLlnterfaces";
import { AnimationConfig, CameraInfo } from "../types/GLTypes";

export const cameraPresets: Record<string, CameraInfo> = {
	IntroPoint: {
		position: [6.1, 0.4, 1.1],
		target: [8.1, 0.2, 0.1],
		azimuthal: -93.2,
		polar: 92,
		hdeg2rad: 15,
		vdeg2rad: 5,
	},
	RoomPointOne: {
		position: [1.6, 1.0, 1.58],
		target: [5.72, -0.3, -0.74],
		azimuthal: -60.25,
		polar: 68.25,
		hdeg2rad: 10,
		vdeg2rad: 5,
	},
	RoomPointTwo: {
		position: [-0.31, 1.62, 0.75],
		target: [-2.23, 0.08, -3.99],
		azimuthal: 17,
		polar: 75.25,
		hdeg2rad: 15,
		vdeg2rad: 5,
	},
	RoomPointThree: {
		position: [-1.17, 1.5, -2.23],
		target: [-2.89, 0.49, 2.23],
		azimuthal: 160,
		polar: 75.3,
		hdeg2rad: 15,
		vdeg2rad: 5,
	},
	FCBox: {
		position: [0.04, 1.17, -1.27],
		target: [0.09, 0.32, -6.4],
		azimuthal: -0.6,
		polar: 80.6,
		hdeg2rad: 2,
		vdeg2rad: 2,
	},
	Musterbox: {
		position: [-3.68, 1.48, -1.4],
		target: [-3.61, 0.65, -5.33],
		azimuthal: -1.5,
		polar: 80.5,
		hdeg2rad: 2,
		vdeg2rad: 2,
	},
	OcculusQuest: {
		position: [2.93, 0.24, -0.75],
		target: [2.9, -1.9, -3.5],
		azimuthal: 0.8,
		polar: 52.1,
		hdeg2rad: 6,
		vdeg2rad: 2,
	},
	BambuLab: {
		position: [-3.75, 1.22, 0.6],
		target: [-3.83, -0.13, 4.04],
		azimuthal: 178.7,
		polar: 72,
		hdeg2rad: 2,
		vdeg2rad: 5,
	},
	MacbookTopSide: {
		position: [5.15, 0.2, -0.9],
		target: [5.3, -4.1, -10],
		azimuthal: -1,
		polar: 64.8,
		hdeg2rad: 2,
		vdeg2rad: 0,
	},
	BillardTriangle: {
		position: [-5.74, 1.73, -2.12],
		target: [-6.68, 1.28, -2.12],
		azimuthal: 90,
		polar: 63,
		hdeg2rad: 4,
		vdeg2rad: 3,
	},
	Clock: {
		position: [1.76, 1.93, -2.46],
		target: [1.76, 1.85, -2.99],
		azimuthal: 0,
		polar: 90,
		hdeg2rad: 0,
		vdeg2rad: 0,
	},
	PictureFrame: {
		position: [0.98, 1.28, 2.15],
		target: [0.98, 1.28, 2.53],
		azimuthal: 181.4,
		polar: 87.5,
		hdeg2rad: 5,
		vdeg2rad: 5,
	},
};

export const robbiPresets: Record<string, { position: [number, number, number]; rotation: [number, number, number] }> = {
	PosOne: {
		position: [7.18, 1.23, 0],
		rotation: [0, -1.46, 0],
	},
};

export const officeChairAnimationPresets: Record<string, AnimationConfig<"OfficeChair">> = {
	Idle: {
		action: "idle",
		options: {
			loop: true,
			loopCount: Infinity,
		},
	},
	ChairRotation: {
		action: "ChairRotation",
		options: {
			loop: false,
			loopCount: 1,
		},
	},
};

export const macbookAnimationPresets: Record<string, AnimationConfig<"MacbookTopSide">> = {
	MacbookOpen: {
		action: "MacbookOpen",
		options: {
			loop: false,
			loopCount: 1,
		},
	},
};

export const robbiAnimationPresets: Record<string, AnimationConfig<"Robbi">> = {
	Idle: {
		action: "Idle",
		options: {
			loop: true,
			loopCount: Infinity,
		},
	},
	Idle02: {
		action: "Idle02",
		options: {
			loop: true,
			loopCount: Infinity,
		},
	},
	walk: {
		action: "walk",
		options: {
			loop: true,
			loopCount: Infinity,
		},
	},
	sit: {
		action: "sit",
		options: {
			loop: false,
			loopCount: 1,
		},
	},
	sitIdle: {
		action: "sit-idle",
		options: {
			loop: true,
			loopCount: Infinity,
		},
	},
	wave: {
		action: "wave",
		options: {
			loop: false,
			loopCount: 1,
		},
	},
};

export const songs: Array<ISong> = [
	{
		id: 1,
		title: "Lofi",
		file: "/music/lofi-chill.mp3",
	},
	{
		id: 2,
		title: "Blues",
		file: "/music/blues.mp3",
	},
];
