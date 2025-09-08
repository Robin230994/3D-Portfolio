import { useState } from "react";
import { FocusContext } from "../Context/FocusContext";
import { Object3D } from "three";

export const FocusContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [selectObjectFocus, setSelectObjectFocus] = useState<{ name: string; object: Object3D } | null>(null);

	return <FocusContext.Provider value={{ selectObjectFocus, setSelectObjectFocus }}>{children}</FocusContext.Provider>;
};
