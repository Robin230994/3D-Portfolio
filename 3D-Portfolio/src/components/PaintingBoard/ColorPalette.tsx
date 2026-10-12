import { FC, useState } from "react";
import { useFocusStore } from "../../Stores/useFocusStore";
import usePaintingStore, { availableColors } from "../../Stores/usePaintingStore";

const ColorPalette: FC = () => {
	/** HOOKS */
	const selectedColor = usePaintingStore((state) => state.selectedColor);
	const brushSize = usePaintingStore((state) => state.brushSize);
	const selectObjectFocus = useFocusStore((state) => state.selectObjectFocus);
	const setSelectedColor = usePaintingStore((state) => state.setSelectedColor);
	const setBrushSize = usePaintingStore((state) => state.setBrushSize);

	/** STATES */
	const [menuOpen, setMenuOpen] = useState<boolean>(false);
	const [menuClosing, setMenuClosing] = useState<boolean>(false);

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
							<div className="color-palette-brush-size-container">
								<p>Brush size:</p>
								<input
									type="number"
									min={1}
									max={10}
									step={1}
									value={brushSize}
									onChange={(event) => {
										const value = Number(event.target.value);
										if (!Number.isInteger(value)) return;
										if (value > 10 || value < 1) return;
										setBrushSize(value);
									}}
								/>
							</div>
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
