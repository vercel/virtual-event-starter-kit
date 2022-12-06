import type { Meta, StoryObj } from '@storybook/react';
import Ticket from './ticket';

const meta: Meta<typeof Ticket> = {
  title: 'Components/Ticket',
  component: Ticket,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' }
  }
};

export default meta;
type Story = StoryObj<typeof Ticket>;

export const Default: Story = {
  args: {
    ticketNumber: 123456
  }
};

export const JustUsername: Story = {
  args: {
    username: 'rashy',
    ticketNumber: 123456
  }
};

export const AllUserData: Story = {
  args: {
    username: 'rashy',
    name: 'Marcus Rashford',
    ticketNumber: 123456
  }
};

export const SharePage: Story = {
  args: {
    ...AllUserData.args,
    sharePage: true
  }
};
