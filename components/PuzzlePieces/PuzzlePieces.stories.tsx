import type { Meta, StoryObj } from '@storybook/react';
import { PuzzlePieces } from './PuzzlePieces';

const meta: Meta<typeof PuzzlePieces> = {
  title: 'PuzzlePieces/PuzzlePieces',
  parameters: {
    layout: 'fullscreen'
  },
  component: PuzzlePieces
};
export default meta;
type Story = StoryObj<typeof PuzzlePieces>;

export const Default: Story = {};
