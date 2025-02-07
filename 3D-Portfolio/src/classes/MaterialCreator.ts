import {
	Material,
	LoadingManager,
	TextureLoader,
	MeshStandardMaterial,
	MeshStandardMaterialParameters,
	SRGBColorSpace,
	Texture,
	RepeatWrapping,
	MeshBasicMaterial,
	MeshLambertMaterial,
	MeshPhongMaterial,
	ShaderMaterial,
} from "three";
import { shaderMaterial } from "@react-three/drei";

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

	public loadTexture(path: string, callback?: (texture: Texture) => void): Texture | null {
		try {
			const textureToLoad = this.textureLoader.load(
				path,
				(loadedTexture) => {
					if (callback) {
						callback(loadedTexture);
					}
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

	public createEmptyBasicMaterial(materialName: string): MeshBasicMaterial {
		const emptyBasicMaterial = new MeshBasicMaterial();
		this.storedMaterials.set(materialName, emptyBasicMaterial);
		return emptyBasicMaterial;
	}

	public createEmptyLambertMaterial(materialName: string): MeshLambertMaterial {
		const emptyLambertMaterial = new MeshLambertMaterial();
		this.storedMaterials.set(materialName, emptyLambertMaterial);
		return emptyLambertMaterial;
	}

	public createEmptyPhongMaterial(materialName: string): MeshPhongMaterial {
		const emptyPhongMaterial = new MeshPhongMaterial();
		this.storedMaterials.set(materialName, emptyPhongMaterial);
		return emptyPhongMaterial;
	}

	public createShaderMaterial(materialName: string, uniforms: { [key: string]: any }, vertexShader: string, fragmentShader: string): ShaderMaterial {
		// Create custom shader material using Drei's shaderMaterial
		const ShaderMaterial: ShaderMaterial = shaderMaterial(uniforms, vertexShader, fragmentShader) as unknown as ShaderMaterial;
		this.storedMaterials.set(materialName, ShaderMaterial);
		return ShaderMaterial;
	}

	public addInstanciatedMaterial<T extends Material>(materialName: string, material: T) {
		this.storedMaterials.set(materialName, material);
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
