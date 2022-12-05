import type { Meta, StoryObj } from '@storybook/react';
import Ticket from './ticket';

const meta: Meta<typeof Ticket> = {
  title: 'Components/Ticket',
  component: Ticket,
  parameters: {
    layout: 'centered'
  }
};

export default meta;
type Story = StoryObj<typeof Ticket>;

export const Primary: Story = {};
