import * as THREE from 'three';
import pack from 'pack-spheres';
import { Center, Bounds } from '@react-three/drei';
import * as Random from 'canvas-sketch-util/random';
import { TetrisBlock, tetrisBlockTypes } from './TetrisBlock';

const colors = ['#FC521F', '#CA90FF', '#1EA7FD', '#FFAE00', '#37D5D3', '#FC521F', '#66BF3C'];

const bounds = 1.5;
const blocks = pack({
  // In sphere
  // sample: () => Random.insideSphere(1),
  // outside: (position: [number, number, number], radius: number) =>
  //   new THREE.Vector3().fromArray(position).length() + radius >= bounds,
  // In circle
  sample: () => [...Random.insideCircle(), 0],
  outside: (position: [number, number, number], radius: number) =>
    new THREE.Vector3().fromArray([position[0], position[1], 0]).length() + radius >= bounds,
  minRadius: () => Math.max(0.05, 0.05 + Math.min(1.0, Math.abs(Random.gaussian(0, 0.1)))),
  maxCount: 100,
  packAttempts: 4000,
  bounds,
  maxRadius: bounds * 0.125
}).map((sphere: any) => ({
  ...sphere,
  position: [sphere.position[0], sphere.position[1], Random.range(-bounds, bounds)].map(
    (v: number) => v * 25
  ),
  radius: sphere.radius * 25,
  color: Random.pick(colors),
  type: Random.pick(tetrisBlockTypes)
}));

export const PuzzlePieces = () => (
  <Bounds clip fit observe margin={1}>
    {blocks.map((block: any) => (
      <Center
        position={block.position}
        onCentered={({ container, width, height }) => {
          const size = Math.max(width, height);
          container.scale.setScalar((block.radius * 1.9) / size);
        }}
      >
        <group quaternion={new THREE.Quaternion(...Random.quaternion())}>
          <TetrisBlock type={block.type} color={block.color} />
        </group>
      </Center>
    ))}
  </Bounds>
);
