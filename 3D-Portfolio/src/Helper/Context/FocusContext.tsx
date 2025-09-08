import { createContext } from "react";
import { Object3D } from "three";

type FocusContextType = {
	selectObjectFocus: { name: string; object: Object3D } | null;
	setSelectObjectFocus: React.Dispatch<React.SetStateAction<{ name: string; object: Object3D } | null>>;
};

export const FocusContext = createContext<FocusContextType | undefined>(undefined);
