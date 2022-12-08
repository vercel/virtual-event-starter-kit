import type { Meta, StoryObj } from '@storybook/react';
import { ByChromatic } from './ByChromatic';

const meta: Meta<typeof ByChromatic> = {
  title: 'Components/ByChromatic',
  component: ByChromatic,
  parameters: {
    layout: 'centered'
  }
};

export default meta;
type Story = StoryObj<typeof ByChromatic>;

export const Primary: Story = {};
