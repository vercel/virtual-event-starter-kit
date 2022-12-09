import type { Meta, StoryObj } from '@storybook/react';
import { TicketActions } from './TicketActions';

const meta: Meta<typeof TicketActions> = {
  title: 'Pages/TicketPage/TicketActions',
  component: TicketActions,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'gradient' }
  }
};

export default meta;
type Story = StoryObj<typeof TicketActions>;

export const Default: Story = {
  args: {}
};
