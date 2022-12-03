import type { Meta, StoryObj } from '@storybook/react';
import * as THREE from 'three';
import { StoryStage } from '../../.storybook/StoryStage';
import { PuzzlePieces } from './PuzzlePieces';

const meta: Meta<typeof PuzzlePieces> = {
  title: 'PuzzlePieces/Meshes/PuzzlePieces',
  parameters: {
    layout: 'fullscreen'
  },
  component: PuzzlePieces,
  decorators: [
    storyFn => {
      return <StoryStage cameraPosition={new THREE.Vector3(0, 0, 30)}>{storyFn()}</StoryStage>;
    }
  ]
};
export default meta;
type Story = StoryObj<typeof PuzzlePieces>;

export const Default: Story = {};
