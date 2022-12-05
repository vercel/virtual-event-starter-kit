import * as THREE from 'three';
import pack from 'pack-spheres';
import { styled } from '@storybook/theming';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { Center, CameraShake, Float } from '@react-three/drei';
import * as Random from 'canvas-sketch-util/random';
import { motion } from 'framer-motion-3d';
import { TetrisBlock, tetrisBlockTypes } from './TetrisBlock';
import { Logo3D } from './Logo3D';
import { useEffect, useState } from 'react';

const colors = ['#FC521F', '#CA90FF', '#1EA7FD', '#FFAE00', '#37D5D3', '#FC521F', '#66BF3C'];

const size = 25;
const bounds = 1.5;
const blocks = pack({
  sample: () => [...Random.insideCircle(), 0],
  outside: (position: [number, number, number], radius: number) =>
    new THREE.Vector3().fromArray([position[0], position[1], 0]).length() + radius >= bounds,
  minRadius: () => 0.05 * bounds, // Math.max(0.05, 0.05 + Math.min(1.0, Math.abs(Random.gaussian(0, 0.1)))),
  maxCount: 100,
  packAttempts: 4000,
  bounds,
  maxRadius: bounds * 0.125 * 0.75
}).map((sphere: any, index: number) => ({
  ...sphere,
  id: index,
  position: [
    sphere.position[0],
    sphere.position[1],
    Random.sign() * (0.25 * bounds + (Random.range(0, 1 * bounds) as number))
  ].map((v: number) => v * size),
  radius: sphere.radius * size,
  color: Random.pick(colors),
  type: Random.pick(tetrisBlockTypes),
  rotation: new THREE.Quaternion(...Random.quaternion()),
  delay: Random.range(1, 2),
  offset: {
    x: Random.range(0, Math.PI * 2),
    y: Random.range(0, Math.PI * 2),
    z: Random.range(0, Math.PI * 2)
  }
}));

function Rig() {
  const [vec] = useState(() => new THREE.Vector3());
  const { camera, mouse } = useThree();
  useFrame(() => camera.position.lerp(vec.set(mouse.x * 2, 1, 60), 0.05));
  return (
    <CameraShake
      maxYaw={0.01}
      maxPitch={0.01}
      maxRoll={0.01}
      yawFrequency={0.5}
      pitchFrequency={0.5}
      rollFrequency={0.4}
    />
  );
}

const Container = styled.div`
  height: 100vh;

  @supports (height: 100svh) {
    height: 100svh;
  }
`;

export const PuzzlePieces = () => {
  const [variant, setVariant] = useState<'initial' | 'expand'>('initial');

  useEffect(() => {
    const timeout = setTimeout(() => setVariant('expand'), 4000);
    return () => clearTimeout(timeout);
  });

  return (
    <Container>
      <Canvas camera={{ position: [0, 0, 50], fov: 50 }} performance={{ min: 0.1 }}>
        <ambientLight intensity={0.5} />
        <directionalLight intensity={0.3} position={[5, 25, 20]} />
        <Center>
          <Logo3D variant={variant} />
        </Center>
        <motion.group
          animate={variant === 'expand' ? { rotateY: [0, Math.PI * 2] } : {}}
          transition={{
            duration: 16,
            ease: 'linear',
            repeat: Infinity
          }}
        >
          {blocks.map((block: any) => (
            <motion.group
              key={block}
              animate={variant}
              variants={{
                expand: {
                  x: block.position[0],
                  y: block.position[1],
                  z: block.position[2]
                }
              }}
              position={[0, 0, -50]}
              quaternion={block.rotation}
            >
              <Center
                onCentered={({ container, width, height }) => {
                  const size = Math.max(width, height);
                  container.scale.setScalar((block.radius * 1.5) / size);
                }}
              >
                <motion.group
                  animate={
                    variant === 'expand'
                      ? {
                          rotateX: [0, Math.PI * 2],
                          rotateY: [0, Math.PI * 2],
                          rotateZ: [0, Math.PI * 2]
                        }
                      : {}
                  }
                  transition={{
                    duration: 24 * block.delay,
                    ease: 'linear',
                    repeat: Infinity
                  }}
                >
                  <TetrisBlock type={block.type} color={block.color} />
                </motion.group>
              </Center>
            </motion.group>
          ))}
        </motion.group>
        <Rig />
      </Canvas>
    </Container>
  );
};
