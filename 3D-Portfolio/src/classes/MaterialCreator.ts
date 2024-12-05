import { Material, LoadingManager, TextureLoader, MeshStandardMaterial, MeshStandardMaterialParameters } from "three";

type StandardTextureParams = {
	diffuseT: string;
	roughnessT?: string;
	normalT?: string;
	aoT?: string;
	displacementT?: string;
	metallnessT?: string;
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

	public createStandardMaterial(materialName: string, textures: StandardTextureParams): Material {
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
}
