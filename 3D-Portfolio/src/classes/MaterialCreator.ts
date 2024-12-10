import { Material, LoadingManager, TextureLoader, MeshStandardMaterial, MeshStandardMaterialParameters, SRGBColorSpace, Texture, RepeatWrapping } from "three";
import { MaterialUpdateParams } from "../types/GLTypes";

import NullMaterialException from "../Exceptions/NullMaterialException";
import NonAccessibleTexturePathException from "../Exceptions/NonAccessibleTexturePathException";

type StandardTextureParams = {
	diffuseT: string | Texture;
	roughnessT?: string | Texture;
	normalT?: string | Texture;
	aoT?: string | Texture;
	displacementT?: string | Texture;
	metallnessT?: string | Texture;
};

export default class MaterialCreator {
	private static instance: MaterialCreator;

	private loadingManager: LoadingManager;
	private textureLoader: TextureLoader;
	private storedMaterials: Map<string, Material>;

	private constructor() {
		this.storedMaterials = new Map();
		this.loadingManager = new LoadingManager();
		this.textureLoader = new TextureLoader(this.loadingManager);
	}

	public static getInstance(): MaterialCreator {
		if (!MaterialCreator.instance) {
			MaterialCreator.instance = new MaterialCreator();
		}
		return MaterialCreator.instance;
	}

	public loadTexture(path: string): Texture | null {
		try {
			const textureToLoad = this.textureLoader.load(
				path,
				(loadedTexture) => {
					loadedTexture.colorSpace = SRGBColorSpace;
				},
				() => {},
				() => {
					throw new NonAccessibleTexturePathException(`Unable to access given texture path: ${path}`);
				}
			);

			return textureToLoad;
		} catch (error) {
			if (error instanceof NonAccessibleTexturePathException) {
				console.error(error.getExceptionMessage());
			} else {
				console.error(error);
			}
		}

		return null;
	}

	public createStandardMaterialFromTexture(materialName: string, textures: StandardTextureParams): MeshStandardMaterial {
		const diffuseTexture: Texture = typeof textures.diffuseT === "string" ? this.textureLoader.load(textures.diffuseT) : textures.diffuseT;
		diffuseTexture.colorSpace = SRGBColorSpace;
		diffuseTexture.wrapS = RepeatWrapping;
		diffuseTexture.wrapT = RepeatWrapping;
		diffuseTexture.flipY = false;

		const roughnessTexture = textures.roughnessT
			? typeof textures.roughnessT === "string"
				? this.textureLoader.load(textures.roughnessT)
				: textures.roughnessT
			: undefined;

		const normalTexture = textures.normalT ? (typeof textures.normalT === "string" ? this.textureLoader.load(textures.normalT) : textures.normalT) : undefined;

		const aoTexture = textures.aoT ? (typeof textures.aoT === "string" ? this.textureLoader.load(textures.aoT) : textures.aoT) : undefined;

		const displacementTexture = textures.displacementT
			? typeof textures.displacementT === "string"
				? this.textureLoader.load(textures.displacementT)
				: textures.displacementT
			: undefined;

		const metalnessTexture = textures.metallnessT
			? typeof textures.metallnessT === "string"
				? this.textureLoader.load(textures.metallnessT)
				: textures.metallnessT
			: undefined;

		const materialParams: MeshStandardMaterialParameters = {
			map: diffuseTexture,
			roughnessMap: roughnessTexture,
			normalMap: normalTexture,
			aoMap: aoTexture,
			displacementMap: displacementTexture,
			metalnessMap: metalnessTexture,
		};
		const createdMaterial = new MeshStandardMaterial(materialParams);
		this.storedMaterials.set(materialName, createdMaterial);
		return createdMaterial;
	}

	public createEmptyStandardMaterial(materialName: string): MeshStandardMaterial {
		const emptyStandardMaterial = new MeshStandardMaterial();
		this.storedMaterials.set(materialName, emptyStandardMaterial);
		return emptyStandardMaterial;
	}

	public tweakMaterial(name: string, updates: MaterialUpdateParams): boolean {
		try {
			const material = this.getMaterialByName(name);
			if (!material) {
				throw new NullMaterialException(`Unable to extract material by name: ${name}`);
			}

			Object.keys(updates).forEach((key) => {
				if (key in material) {
					(material as any)[key] = updates[key];
				}
			});
			material.needsUpdate = true;
			return true;
		} catch (error: unknown) {
			if (error instanceof NullMaterialException) {
				console.error(error.getExceptionMessage());
			} else {
				console.error(error);
			}
		}

		return false;
	}

	public getStoredMaterial(): Map<string, Material> {
		return this.storedMaterials;
	}

	public getMaterialByName(name: string): Material | null {
		for (const [materialName, material] of this.storedMaterials) {
			if (materialName === name) {
				return material;
			}
		}
		return null; // Return null if the material is not found
	}

	public getMaterialName(material: Material): string | null {
		for (const [name, storedMaterial] of this.storedMaterials.entries()) {
			if (storedMaterial === material) {
				return name;
			}
		}
		return null; // Return null if the material is not found
	}

	public getTypeOfMaterial(materialName: string): string | null {
		try {
			const material = this.storedMaterials.get(materialName);
			if (!material) {
				throw new NullMaterialException(`Unable to extract material by name: ${materialName}`);
			}
			return material.type;
		} catch (error) {
			if (error instanceof NullMaterialException) {
				console.error(error.getExceptionMessage());
			} else {
				console.error(error);
			}
		}

		return null;
	}
}
