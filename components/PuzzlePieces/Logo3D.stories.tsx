import type { Meta, StoryObj } from '@storybook/react';
import * as THREE from 'three';
import { StoryStage } from '../../.storybook/StoryStage';
import { Logo3D } from './Logo3D';

const meta: Meta<typeof Logo3D> = {
  title: 'PuzzlePieces/Meshes/Logo3D',
  parameters: {
    layout: 'fullscreen'
  },
  component: Logo3D,
  decorators: [
    storyFn => {
      return <StoryStage cameraPosition={new THREE.Vector3(0, 0, 30)}>{storyFn()}</StoryStage>;
    }
  ]
};
export default meta;
type Story = StoryObj<typeof Logo3D>;

export const Default: Story = {};
