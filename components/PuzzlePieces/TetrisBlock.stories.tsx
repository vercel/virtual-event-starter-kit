import type { Meta, StoryObj } from '@storybook/react';
import * as THREE from 'three';
import { Center } from '@react-three/drei';
import { StoryStage } from '../../.storybook/StoryStage';
import { TetrisBlock, TetrisBlockType } from './TetrisBlock';

const meta: Meta<typeof TetrisBlock> = {
  title: 'PuzzlePieces/TetrisBlock',
  parameters: {
    layout: 'fullscreen'
  },
  component: TetrisBlock,
  decorators: [
    storyFn => {
      return <StoryStage cameraPosition={new THREE.Vector3(-30, 30, 30)}>{storyFn()}</StoryStage>;
    }
  ],
  argTypes: {
    thickness: { control: { type: 'range', min: 0, max: 20 } },
    roughness: { control: { type: 'range', min: 0, max: 1, step: 0.1 } },
    clearcoat: { control: { type: 'range', min: 0, max: 1, step: 0.1 } },
    clearcoatRoughness: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 }
    },
    transmission: { control: { type: 'range', min: 0.9, max: 1, step: 0.01 } },
    ior: { control: { type: 'range', min: 1, max: 2.3, step: 0.05 } },
    attenuationColor: { control: 'color' },
    attenuationDistance: {
      control: { type: 'range', min: 0, max: 1, step: 0.01 }
    }
  },
  args: {
    thickness: 5,
    roughness: 1,
    clearcoat: 1,
    clearcoatRoughness: 0,
    transmission: 1,
    ior: 1.25,
    attenuationColor: '#fff',
    attenuationDistance: 1
  }
};
export default meta;
type Story = StoryObj<typeof TetrisBlock>;

const ShapeScene = ({ type }: { type: TetrisBlockType }) => (
  <TetrisBlock type={type} color="#1EA7FD" />
);

export const I: Story = { render: () => <ShapeScene type="I" /> };
export const L: Story = { render: () => <ShapeScene type="L" /> };
export const O: Story = { render: () => <ShapeScene type="O" /> };
export const T: Story = { render: () => <ShapeScene type="T" /> };
export const Z: Story = { render: () => <ShapeScene type="Z" /> };

export const CentredInSphere: Story = {
  render: () => (
    <>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <Center
        position={[25, 0, 0]}
        onCentered={({ container, width, height }) => {
          container.scale.setScalar(0.5);
        }}
      >
        <ShapeScene type="Z" />
      </Center>
    </>
  )
};
