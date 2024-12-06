import { Material, LoadingManager, TextureLoader, MeshStandardMaterial, MeshStandardMaterialParameters } from "three";
import NullMaterialException from "../Exceptions/NullMaterialException";

type StandardTextureParams = {
	diffuseT: string;
	roughnessT?: string;
	normalT?: string;
	aoT?: string;
	displacementT?: string;
	metallnessT?: string;
};

type MaterialUpdateParams = {
	[key: string]: unknown;
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

	public createStandardMaterial(materialName: string, textures: StandardTextureParams): MeshStandardMaterial {
		const diffuseTexture = this.textureLoader.load(textures.diffuseT);
		const roughnessTexture = textures.roughnessT ? this.textureLoader.load(textures.roughnessT) : undefined;
		const normalTexture = textures.normalT ? this.textureLoader.load(textures.normalT) : undefined;
		const aoTexture = textures.aoT ? this.textureLoader.load(textures.aoT) : undefined;
		const displacementTexture = textures.displacementT ? this.textureLoader.load(textures.displacementT) : undefined;
		const metalnessTexture = textures.metallnessT ? this.textureLoader.load(textures.metallnessT) : undefined;

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

	public tweakMaterial(name: string, updates: MaterialUpdateParams): boolean {
		try {
			const material = this.getMaterialByName(name);
			if (!material) {
				throw new NullMaterialException("Unable to extract material by name");
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
}
