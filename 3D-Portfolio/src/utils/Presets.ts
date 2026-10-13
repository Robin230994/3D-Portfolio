import { ISong } from "./Interfaces";
import { AnimationConfig, CameraInfo, ColorMixDefinition } from "./Types";

export const cameraPresets: Record<string, CameraInfo> = {
	IntroPoint: {
		position: [0.008, 1.06, -0.135],
		target: [1.01, 0.91, -0.12],
		azimuthal: -90.87,
		polar: 81.37,
		hdeg2rad: 180,
		vdeg2rad: 20,
	},
	RoomPointOne: {
		position: [-3.38, 1.202, 0.533],
		target: [-2.876, 1.042, -0.329],
		azimuthal: -30.32,
		polar: 80.89,
		hdeg2rad: 180,
		vdeg2rad: 20,
	},
	RoomPointTwo: {
		position: [2.962, 0.795, 1.772],
		target: [3.357, 0.701, 0.718],
		azimuthal: -20.53,
		polar: 85.2,
		hdeg2rad: 180,
		vdeg2rad: 20,
	},
	RoomPointThree: {
		position: [-3.82, 1.44, -0.88],
		target: [-5.15, 1.03, -0.9],
		azimuthal: 88.82,
		polar: 72.86,
		hdeg2rad: 5,
		vdeg2rad: 5,
	},
	RoomPointFour: {
		position: [-1.43, 0, -1.41],
		target: [-2.28, 0.4, 2.23],
		azimuthal: 175.98,
		polar: 75.3,
		hdeg2rad: 15,
		vdeg2rad: 5,
	},

	FCBox: {
		position: [0.04, 1.17, -1.27],
		target: [0.09, 0.32, -6.4],
		azimuthal: -0.6,
		polar: 80.6,
		hdeg2rad: 8,
		vdeg2rad: 2,
	},
	Musterbox: {
		position: [-3.72, 1.48, -1.4],
		target: [-3.57, 0.45, -5.33],
		azimuthal: -1.5,
		polar: 77.4,
		hdeg2rad: 10,
		vdeg2rad: 5,
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
	Screen: {
		position: [5.3, 0.62, -0.4],
		target: [5.33, 0.3, -1.21],
		azimuthal: -2.04,
		polar: 68.67,
		hdeg2rad: 70,
		vdeg2rad: 15,
	},
	BillardTriangle: {
		position: [-6.07, 1.55, -2.07],
		target: [-8.71, 1.01, -2.02],
		azimuthal: 91.05,
		polar: 78.59,
		hdeg2rad: 10,
		vdeg2rad: 5,
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
	Window: {
		position: [6.08, 0.4, 0.02],
		target: [7.88, 0.43, 0.07],
		azimuthal: -91.62,
		polar: 90.92,
		hdeg2rad: 10,
		vdeg2rad: 8,
	},
	PaintingBoard: {
		position: [-1.48, 0.27, 1.21],
		target: [-1.49, -0.13, 1.92],
		azimuthal: 179.48,
		polar: 60.15,
		hdeg2rad: 15,
		vdeg2rad: 15,
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

export const musterboxAnimationPresets: Record<string, AnimationConfig<"Musterbox">> = {
	Idle: {
		action: "Idle",
		options: {
			loop: true,
			loopCount: Infinity,
		},
	},
	MusterboxOpen: {
		action: "MusterboxOpen",
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

export const colorMixPresets: Record<string, ColorMixDefinition> = {
	"apple-green__black": { name: "Forest Ink" },
	"apple-green__cyan": { name: "Lagoon Green" },
	"apple-green__dark-green": { name: "Evergreen" },
	"apple-green__dusty-rose": { name: "Sage Bloom" },
	"apple-green__lichen": { name: "Spring Moss" },
	"apple-green__light-pink": { name: "Apple Blossom" },
	"apple-green__maroon": { name: "Olive Grove" },
	"apple-green__metallic-gold": { name: "Golden Pear" },
	"apple-green__russian-red": { name: "Autumn Leaf" },
	"apple-green__sandy-brown": { name: "Meadow Clay" },
	"apple-green__shadow-woods": { name: "Mossy Bark" },
	"apple-green__terracotta": { name: "Olive Terracotta" },
	"apple-green__ultramarine": { name: "Peacock Green" },
	"apple-green__white": { name: "Mint Cream" },

	black__cyan: { name: "Deep Teal" },
	"black__dark-green": { name: "Pine Shadow" },
	"black__dusty-rose": { name: "Plum Smoke" },
	black__lichen: { name: "Lichen Shadow" },
	"black__light-pink": { name: "Rose Charcoal" },
	black__maroon: { name: "Black Cherry" },
	"black__metallic-gold": { name: "Antique Bronze" },
	"black__russian-red": { name: "Oxblood" },
	"black__sandy-brown": { name: "Umber" },
	"black__shadow-woods": { name: "Espresso" },
	black__terracotta: { name: "Burnt Sienna" },
	black__ultramarine: { name: "Midnight Blue" },
	black__white: { name: "Slate Grey" },

	"cyan__dark-green": { name: "Jade" },
	"cyan__dusty-rose": { name: "Mauve Mist" },
	cyan__lichen: { name: "Sea Glass" },
	"cyan__light-pink": { name: "Cotton Candy" },
	cyan__maroon: { name: "Deep Turquoise" },
	"cyan__metallic-gold": { name: "Aqua Gold" },
	"cyan__russian-red": { name: "Mulberry Blue" },
	"cyan__sandy-brown": { name: "Coastal Sand" },
	"cyan__shadow-woods": { name: "Petrol" },
	cyan__terracotta: { name: "Coral Reef" },
	cyan__ultramarine: { name: "Azure" },
	cyan__white: { name: "Ice Blue" },

	"dark-green__dusty-rose": { name: "Eucalyptus Rose" },
	"dark-green__lichen": { name: "Woodland Moss" },
	"dark-green__light-pink": { name: "Blush Sage" },
	"dark-green__maroon": { name: "Burgundy Moss" },
	"dark-green__metallic-gold": { name: "Gilded Moss" },
	"dark-green__russian-red": { name: "Holly Berry" },
	"dark-green__sandy-brown": { name: "Olive Drab" },
	"dark-green__shadow-woods": { name: "Deep Forest" },
	"dark-green__terracotta": { name: "Fern Clay" },
	"dark-green__ultramarine": { name: "Blue Spruce" },
	"dark-green__white": { name: "Pistachio" },

	"dusty-rose__lichen": { name: "Vintage Sage" },
	"dusty-rose__light-pink": { name: "Rose Petal" },
	"dusty-rose__maroon": { name: "Mulberry" },
	"dusty-rose__metallic-gold": { name: "Rosé Gold" },
	"dusty-rose__russian-red": { name: "Raspberry" },
	"dusty-rose__sandy-brown": { name: "Desert Rose" },
	"dusty-rose__shadow-woods": { name: "Cocoa Rose" },
	"dusty-rose__terracotta": { name: "Clay Rose" },
	"dusty-rose__ultramarine": { name: "Dusky Violet" },
	"dusty-rose__white": { name: "Powder Pink" },

	"lichen__light-pink": { name: "Petal Moss" },
	lichen__maroon: { name: "Olive Wine" },
	"lichen__metallic-gold": { name: "Wheatfield" },
	"lichen__russian-red": { name: "Autumn Moss" },
	"lichen__sandy-brown": { name: "Dried Grass" },
	"lichen__shadow-woods": { name: "Mushroom" },
	lichen__terracotta: { name: "Desert Sage" },
	lichen__ultramarine: { name: "Dusty Blue" },
	lichen__white: { name: "Willow Cream" },

	"light-pink__maroon": { name: "Berry Blush" },
	"light-pink__metallic-gold": { name: "Champagne" },
	"light-pink__russian-red": { name: "Watermelon" },
	"light-pink__sandy-brown": { name: "Peach" },
	"light-pink__shadow-woods": { name: "Taupe Rose" },
	"light-pink__terracotta": { name: "Apricot" },
	"light-pink__ultramarine": { name: "Periwinkle" },
	"light-pink__white": { name: "Baby Pink" },

	"maroon__metallic-gold": { name: "Mahogany Gold" },
	"maroon__russian-red": { name: "Crimson Wine" },
	"maroon__sandy-brown": { name: "Chestnut" },
	"maroon__shadow-woods": { name: "Dark Cocoa" },
	maroon__terracotta: { name: "Brick Red" },
	maroon__ultramarine: { name: "Imperial Purple" },
	maroon__white: { name: "Dusty Mauve" },

	"metallic-gold__russian-red": { name: "Burnished Copper" },
	"metallic-gold__sandy-brown": { name: "Honey Ochre" },
	"metallic-gold__shadow-woods": { name: "Walnut Gold" },
	"metallic-gold__terracotta": { name: "Amber Clay" },
	"metallic-gold__ultramarine": { name: "Antique Sapphire" },
	"metallic-gold__white": { name: "Vanilla Cream" },

	"russian-red__sandy-brown": { name: "Paprika" },
	"russian-red__shadow-woods": { name: "Red Mahogany" },
	"russian-red__terracotta": { name: "Vermilion" },
	"russian-red__ultramarine": { name: "Royal Violet" },
	"russian-red__white": { name: "Coral Pink" },

	"sandy-brown__shadow-woods": { name: "Raw Umber" },
	"sandy-brown__terracotta": { name: "Terracotta Sand" },
	"sandy-brown__ultramarine": { name: "Stormy Blue" },
	"sandy-brown__white": { name: "Warm Ivory" },

	"shadow-woods__terracotta": { name: "Roasted Clay" },
	"shadow-woods__ultramarine": { name: "Indigo Brown" },
	"shadow-woods__white": { name: "Mushroom Cream" },

	terracotta__ultramarine: { name: "Smoky Violet" },
	terracotta__white: { name: "Peach Cream" },

	ultramarine__white: { name: "Cornflower" },
};
