import type { Meta, StoryObj } from '@storybook/react';
import { Nav } from './Nav';

const meta: Meta<typeof Nav> = {
  title: 'Components/Nav',
  component: Nav,
  tags: ['docsPage']
};

export default meta;
type Story = StoryObj<typeof Nav>;

export const Primary: Story = {
  args: {
    inverse: false
  }
};
