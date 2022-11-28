import type { Meta, StoryObj } from '@storybook/react';
import { Features } from './Features';

const meta: Meta<typeof Features> = {
  title: 'Homepage/Features',
  component: Features,
  parameters: {
    chromatic: { viewports: [320, 440, 600, 900] }
  }
};
export default meta;
type Story = StoryObj<typeof Features>;

export const Default: Story = { args: {} };
