import { forwardRef, useMemo } from 'react';
import * as THREE from 'three';
import { Extrude } from '@react-three/drei';

export const SIDE = 10;
export const EXTRUDE_SETTINGS = {
  steps: 2,
  depth: SIDE,
  bevelEnabled: false
};
const colors = ['#FC521F', '#CA90FF', '#1EA7FD', '#FFAE00', '#37D5D3', '#FC521F', '#66BF3C'];

export type TetrisBlockType = keyof typeof TYPES;

interface TetrisBlockProps {
  type: TetrisBlockType;
  color: string;
  thickness?: number;
  roughness?: number;
  clearcoat?: number;
  clearcoatRoughness?: number;
  transmission?: number;
  ior?: number;
  attenuationColor?: string;
  attenuationDistance?: number;
}

export const TetrisBlock = forwardRef<THREE.Mesh, TetrisBlockProps>(
  (
    {
      type,
      color,
      // thickness = SIDE,
      // roughness = 0.4,
      // clearcoat = 1,
      // clearcoatRoughness = 1,
      // transmission = 0.8,
      // ior = 1.25,
      // attenuationColor = '#fff',
      // attenuationDistance = 0,
      ...props
    },
    ref
  ) => {
    const shape = useMemo(() => TYPES[type](), [type]);

    return (
      <Extrude args={[shape, EXTRUDE_SETTINGS]} ref={ref} {...props}>
        <meshStandardMaterial color={color} />
        {/* <meshPhysicalMaterial
          flatShading
          color={color}
          thickness={thickness}
          roughness={roughness}
          clearcoat={clearcoat}
          clearcoatRoughness={clearcoatRoughness}
          transmission={transmission}
          ior={ior}
          attenuationColor={attenuationColor}
          attenuationDistance={attenuationDistance}
        /> */}
      </Extrude>
    );
  }
);

// Semicircle
// Donut
// Triangle
// Circle/sphere
const TYPES = {
  I: () => {
    const _shape = new THREE.Shape();

    _shape.moveTo(0, 0);
    _shape.lineTo(3 * SIDE, 0);
    _shape.lineTo(3 * SIDE, SIDE);
    _shape.lineTo(0, SIDE);

    return _shape;
  },
  L: () => {
    const _shape = new THREE.Shape();

    _shape.moveTo(0, 0);
    _shape.lineTo(SIDE * 2, 0);
    _shape.lineTo(SIDE * 2, SIDE);
    _shape.lineTo(SIDE, SIDE);
    _shape.lineTo(SIDE, SIDE * 3);
    _shape.lineTo(0, SIDE * 3);

    return _shape;
  },
  O: () => {
    const _shape = new THREE.Shape();

    _shape.moveTo(0, 0);
    _shape.lineTo(SIDE, 0);
    _shape.lineTo(SIDE, SIDE);
    _shape.lineTo(0, SIDE);

    return _shape;
  },
  T: () => {
    const _shape = new THREE.Shape();

    _shape.moveTo(0, 0);
    _shape.lineTo(SIDE, 0);
    _shape.lineTo(SIDE, SIDE * 3);
    _shape.lineTo(0, SIDE * 3);
    _shape.lineTo(0, SIDE * 2);
    _shape.lineTo(-SIDE, SIDE * 2);
    _shape.lineTo(-SIDE, SIDE);
    _shape.lineTo(0, SIDE);

    return _shape;
  },
  Z: () => {
    const _shape = new THREE.Shape();

    _shape.moveTo(0, 0);
    _shape.lineTo(SIDE, 0);
    _shape.lineTo(SIDE, SIDE * 2);
    _shape.lineTo(0, SIDE * 2);
    _shape.lineTo(0, SIDE * 3);
    _shape.lineTo(-SIDE, SIDE * 3);
    _shape.lineTo(-SIDE, SIDE);
    _shape.lineTo(0, SIDE);

    return _shape;
  }
} as const;
export const tetrisBlockTypes = Object.keys(TYPES) as TetrisBlockType[];
