import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, Sprite, SpriteMaterial } from "three";
import MaterialCreator from "../../classes/MaterialCreator";

interface IMusicNoteProps {
	playing: boolean;
	position: [number, number, number];
}

interface Note {
	sprite: Sprite;
	velocity: number;
	age: number;
	lifetime: number;
}

const materialCreator = MaterialCreator.getInstance();
const noteTexture = materialCreator.loadTexture("/images/music-note.png");

const MusicNote: React.FC<IMusicNoteProps> = ({ playing, position }) => {
	const musicNoteRef = useRef<Group>(null);

	const notes = useRef<Note[]>([]);

	useEffect(() => {
		if (!playing) return;

		const interval = setInterval(() => {
			const material = new SpriteMaterial({
				map: noteTexture,
				transparent: true,
			});

			const sprite = new Sprite(material);

			sprite.position.set(position[0] + (Math.random() - 0.5) * 0.15, position[1], position[2] + (Math.random() - 0.5) * 0.15);

			sprite.scale.setScalar(0.12);

			musicNoteRef.current?.add(sprite);

			notes.current.push({
				sprite,
				velocity: 0.25 + Math.random() * 0.2,
				age: 0,
				lifetime: 2 + Math.random(),
			});
		}, 850);

		return () => clearInterval(interval);
	}, [playing, position]);

	useFrame((_, delta) => {
		notes.current = notes.current.filter((note) => {
			note.age += delta;

			note.sprite.position.y += note.velocity * delta;

			note.sprite.position.x += Math.sin(note.age * 4) * delta * 0.05;

			note.sprite.material.rotation += delta;

			note.sprite.material.opacity = 1 - note.age / note.lifetime;

			note.sprite.scale.multiplyScalar(1 + delta * 0.05);

			if (note.age >= note.lifetime) {
				musicNoteRef.current?.remove(note.sprite);
				note.sprite.material.dispose();

				return false;
			}

			return true;
		});
	});

	return <group ref={musicNoteRef} />;
};

export default MusicNote;
