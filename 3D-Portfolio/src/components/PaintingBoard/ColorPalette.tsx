import { FC, useEffect, useState } from "react";
import { useFocusStore } from "../../Stores/useFocusStore";
import { ColorOption } from "../../utils/Types";
import { colorMixPresets } from "../../utils/Presets";
import usePaintingStore, { availableColors } from "../../Stores/usePaintingStore";

const getMixKey = (first: ColorOption, second: ColorOption) =>
	[first.id, second.id]
		.map((id) => id.toLowerCase())
		.sort()
		.join("__");

const mixHexColors = (firstHex: string, secondHex: string) => {
	const first = parseInt(firstHex, 16);
	const second = parseInt(secondHex, 16);

	const red = Math.round((((first >> 16) & 255) + ((second >> 16) & 255)) / 2);
	const green = Math.round((((first >> 8) & 255) + ((second >> 8) & 255)) / 2);
	const blue = Math.round(((first & 255) + (second & 255)) / 2);

	return [red, green, blue].map((channel) => channel.toString(16).padStart(2, "0")).join("");
};

const getMixedColor = (first: ColorOption, second: ColorOption): ColorOption => {
	const key = getMixKey(first, second);
	const definition = colorMixPresets[key];

	return {
		id: key,
		name: definition?.name,
		hexCode: mixHexColors(first.hexCode, second.hexCode),
	};
};

const ColorPalette: FC = () => {
	/** HOOKS */
	const selectedColor = usePaintingStore((state) => state.selectedColor);
	const mixColorOne = usePaintingStore((state) => state.mixColorOne);
	const mixColorTwo = usePaintingStore((state) => state.mixColorTwo);
	const mixedColor = usePaintingStore((state) => state.mixedColor);
	const brushSize = usePaintingStore((state) => state.brushSize);
	const selectObjectFocus = useFocusStore((state) => state.selectObjectFocus);
	const setSelectedColor = usePaintingStore((state) => state.setSelectedColor);
	const setMixColorOne = usePaintingStore((state) => state.setMixColorOne);
	const setMixColorTwo = usePaintingStore((state) => state.setMixColorTwo);
	const setMixedColor = usePaintingStore((state) => state.setMixedColor);
	const setBrushSize = usePaintingStore((state) => state.setBrushSize);

	/** STATES */
	const [menuOpen, setMenuOpen] = useState<boolean>(false);
	const [menuClosing, setMenuClosing] = useState<boolean>(false);
	const [mixModeActive, setMixModeActive] = useState<boolean>(false);

	const closeMenu = () => setMenuClosing(true);

	useEffect(() => {
		if (mixColorOne && mixColorTwo) {
			const mixedColor = getMixedColor(mixColorOne, mixColorTwo);
			setMixedColor(mixedColor);
		}
	}, [mixColorOne, mixColorTwo, setMixedColor]);

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
							{mixedColor ? (
								<>
									<img src={`/images/PaintingBoard/splashes/splash-mix.png`} width={"80px"} height="auto" />
									<p className="color-name">{mixedColor.name}</p>
								</>
							) : selectedColor ? (
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

							<div className="color-palette-mix-mode">
								<button
									className={mixModeActive ? "active" : ""}
									onClick={() => {
										if (!mixModeActive) {
											setMixModeActive(true);
										} else {
											setMixModeActive(false);
											setMixColorOne(null);
											setMixColorTwo(null);
											setMixedColor(null);
										}
									}}>
									Mix-Mode
								</button>

								{mixModeActive && (
									<div className="mixed-colors">
										{mixColorOne && (
											<div>
												<img src={`/images/PaintingBoard/splashes/splash-${mixColorOne.hexCode}.png`} width={"100px"} />
												<p>{mixColorOne.name}</p>
											</div>
										)}
										{mixColorTwo && (
											<div>
												<img src={`/images/PaintingBoard/splashes/splash-${mixColorTwo.hexCode}.png`} width={"100px"} />
												<p>{mixColorTwo.name}</p>
											</div>
										)}
									</div>
								)}
							</div>
							{availableColors.map((color) => (
								<img
									className={mixColorOne?.hexCode === color.hexCode || mixColorTwo?.hexCode === color.hexCode ? "active-mix-color" : ""}
									key={color.id}
									src={`/images/PaintingBoard/splashes/splash-${color.hexCode}.png`}
									width={"150px"}
									height="auto"
									onClick={() => {
										if (mixModeActive) {
											if (!mixColorOne) {
												setMixColorOne(color);
											} else if (!mixColorTwo) {
												setMixColorTwo(color);
											}
										} else {
											setSelectedColor(color);
										}
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
