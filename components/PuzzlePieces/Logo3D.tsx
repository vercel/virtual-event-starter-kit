import { useMemo, useRef } from 'react';
import { Group, Euler, Quaternion } from 'three';
import useSpline from '@splinetool/r3f-spline';
import { useThree, useFrame } from '@react-three/fiber';
import { Center } from '@react-three/drei';
import { motion } from 'framer-motion-3d';

const logoVariants = {
  expand: {
    rotateY: Math.PI * 2 * 3,
    transition: {
      delay: 1,
      type: 'spring',
      mass: 5,
      stiffness: 1000,
      damping: 100,
      restDelta: 0.0001
    }
  }
};

interface Logo3DProps {
  variant: 'initial' | 'expand';
}

export const Logo3D = ({ variant, ...props }: Logo3DProps) => {
  const { nodes, materials } = useSpline(
    'https://prod.spline.design/l6cvMIdDhg1HImzF/scene.splinecode'
  );
  const viewport = useThree(state => state.viewport);
  const ref = useRef<Group>(null!);

  const { mouse } = useThree();
  const [rEuler, rQuaternion] = useMemo(() => [new Euler(), new Quaternion()], []);
  useFrame(() => {
    if (ref.current) {
      // Rotate the logo to face the mouse
      rEuler.set((-mouse.y * Math.PI) / 10, (mouse.x * Math.PI) / 6, 0);
      ref.current.quaternion.slerp(rQuaternion.setFromEuler(rEuler), 0.1);
    }
  });

  return (
    <Center
      ref={ref}
      onCentered={({ container, height, width }) => {
        const scale =
          viewport.height > viewport.width ? viewport.width / width : viewport.height / height;
        container.scale.setScalar(scale * 0.75);
      }}
    >
      <motion.group {...props} variants={logoVariants} animate={variant} dispose={null}>
        <group name="Storybook 3D logo">
          <group
            name="storybook-fg"
            position={[-450.54, 486.98, -86.59]}
            rotation={[-0.09, 0.05, 0]}
            scale={1}
          >
            <mesh
              name="bookmark"
              geometry={nodes['Shape 0'].geometry}
              material={materials.White}
              castShadow
              position={[702.66, 10, 0]}
            />
            <mesh
              name="letter-s"
              geometry={nodes['Shape 01'].geometry}
              material={materials.White}
              castShadow
              position={[317.1, -180.09, 0.01]}
            />
          </group>
          <group
            name="storybook-bg"
            position={[-450.54, 486.98, -56.59]}
            rotation={[-0.09, 0.05, 0]}
            scale={1}
          >
            <mesh
              name="pink-background"
              geometry={nodes['Shape 02'].geometry}
              material={materials.Pink}
              receiveShadow
              position={[109.27, -0.1, 0]}
            />
          </group>
        </group>
      </motion.group>
    </Center>
  );
};
