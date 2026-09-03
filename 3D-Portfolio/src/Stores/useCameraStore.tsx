import { create } from "zustand";
import { CameraInfo } from "../types/GLTypes";
import { cameraPresets } from "../Presets/Presets";

export const ROOM_POSITION_ORDER = ["IntroPoint", "RoomPointOne", "RoomPointTwo", "RoomPointThree", "RoomPointFour"];
export type RoomPositionKey = (typeof ROOM_POSITION_ORDER)[number];

interface CameraState {
	currentCameraPlaceKey: RoomPositionKey;
	currentCameraPlaceInfo: CameraInfo;
	setCurrentCameraPlace: (place: RoomPositionKey) => void;

	cameraIsMoving: boolean;
	setCameraIsMoving: (moving: boolean) => void;

	isDragging: boolean;
	setDragging: (value: boolean) => void;

	userMovedCamera: boolean;
	setUserMovedCamera: (value: boolean) => void;

	setNextRoom: (direction: "left" | "right") => void;
}

export const useCameraStore = create<CameraState>((set, get) => ({
	currentCameraPlaceKey: "IntroPoint",
	currentCameraPlaceInfo: cameraPresets.IntroPoint,
	setCurrentCameraPlace: (key) =>
		set({
			currentCameraPlaceKey: key,
			currentCameraPlaceInfo: cameraPresets[key],
		}),

	// CAMERA MOVEMENT
	cameraIsMoving: false,
	setCameraIsMoving: (moving) => set({ cameraIsMoving: moving }),

	isDragging: false,

	setDragging: (value) =>
		set({
			isDragging: value,
		}),

	userMovedCamera: false,
	setUserMovedCamera: (value) => set({ userMovedCamera: value }),

	setNextRoom: (direction) => {
		const { currentCameraPlaceKey } = get();

		const roomIndex = ROOM_POSITION_ORDER.indexOf(currentCameraPlaceKey);

		const nextIndex =
			direction === "left" ? (roomIndex + 1) % ROOM_POSITION_ORDER.length : (roomIndex - 1 + ROOM_POSITION_ORDER.length) % ROOM_POSITION_ORDER.length;

		const nextKey = ROOM_POSITION_ORDER[nextIndex];

		set({
			currentCameraPlaceKey: nextKey,
			currentCameraPlaceInfo: cameraPresets[nextKey],
		});
	},
}));
