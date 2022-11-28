import type { Meta, StoryObj } from '@storybook/react';
import { FeaturesSection } from './FeaturesSection';

const meta: Meta<typeof FeaturesSection> = {
  title: 'Homepage/FeaturesSection',
  component: FeaturesSection,
  parameters: {
    chromatic: { viewports: [320, 440, 600, 900] }
  }
};
export default meta;
type Story = StoryObj<typeof FeaturesSection>;

export const Default: Story = { args: {} };
