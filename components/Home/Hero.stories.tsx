import type { Meta, StoryObj } from '@storybook/react';
import { Hero } from './Hero';

const meta: Meta<typeof Hero> = {
  title: 'Pages/Home/Hero',
  component: Hero,
  parameters: {
    chromatic: { viewports: [320, 440, 600, 900] }
  }
};
export default meta;
type Story = StoryObj<typeof Hero>;

export const Default: Story = { args: {} };
