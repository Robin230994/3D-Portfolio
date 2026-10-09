import { FC, useState } from "react";
import { useFocusStore } from "../../Stores/useFocusStore";

type ColorOption = {
	name: string;
	hexCode: string;
};

const availableColors: ColorOption[] = [
	{ name: "Russian-Red", hexCode: "c60000" },
	{ name: "Apple-Green", hexCode: "4eb343" },
	{ name: "Maroon", hexCode: "5b362d" },
	{ name: "Cyan", hexCode: "5de5e7" },
	{ name: "Ultramarine", hexCode: "010b8f" },
	{ name: "Dark-Green", hexCode: "23692d" },
	{ name: "Lichen", hexCode: "96bc7f" },
	{ name: "Metallic-Gold", hexCode: "d4af37" },
	{ name: "Sandy-Brown", hexCode: "ff9e56" },
	{ name: "Light-Pink", hexCode: "ff727d" },
	{ name: "Dusty-Rose", hexCode: "c981a3" },
	{ name: "Shadow-Woods", hexCode: "877a5b" },
	{ name: "White", hexCode: "ffffff" },
	{ name: "Black", hexCode: "000000" },
];

const ColorPalette: FC = () => {
	/** HOOKS */
	const selectObjectFocus = useFocusStore((state) => state.selectObjectFocus);

	/** STATES */
	const [menuOpen, setMenuOpen] = useState<boolean>(false);
	const [menuClosing, setMenuClosing] = useState<boolean>(false);
	const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null);

	const closeMenu = () => setMenuClosing(true);

	if (selectObjectFocus?.name !== "PaintingBoard") return;
	return (
		<>
			{!menuOpen ? (
				<img className="color-palette-icon" src="images/PaintingBoard/painting-wood-palette-front.png" onClick={() => setMenuOpen(true)} />
			) : (
				<div
					className={`color-palette-container${menuClosing ? " color-palette-container--closing" : ""}`}
					onAnimationEnd={(event) => {
						if (!menuClosing || event.target !== event.currentTarget) return;
						setMenuOpen(false);
						setMenuClosing(false);
					}}>
					<div className="color-palette-menu">
						<div className="color-palette-header">
							{selectedColor ? (
								<>
									<img src={`/images/PaintingBoard/splashes/splash-${selectedColor.hexCode}.png`} width={"80px"} height="auto" />
									<p className="color-name">{selectedColor.name}</p>
								</>
							) : (
								<p className="color-name">Select a color</p>
							)}
						</div>
						<div className="color-palette-body">
							{availableColors.map((color) => (
								<img
									key={color.hexCode}
									src={`/images/PaintingBoard/splashes/splash-${color.hexCode}.png`}
									width={"150px"}
									height="auto"
									onClick={() => {
										setSelectedColor({ name: color.name, hexCode: color.hexCode });
										document.querySelector(".color-palette-header")?.scrollIntoView({ behavior: "smooth" });
									}}
								/>
							))}
						</div>
						<div className="color-palette-footer">
							<button className="close-palette-btn" onClick={closeMenu}>
								Close
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ColorPalette;
