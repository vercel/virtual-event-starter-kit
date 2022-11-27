import type { Meta, StoryObj } from '@storybook/react';
import { EmailForm } from './EmailForm';

const meta: Meta<typeof EmailForm> = {
  title: 'Layout/EmailForm',
  component: EmailForm,
  parameters: {
    layout: 'centered'
  }
};

export default meta;
type Story = StoryObj<typeof EmailForm>;

export const Primary: Story = {
  args: {
    inverse: false
  }
};
