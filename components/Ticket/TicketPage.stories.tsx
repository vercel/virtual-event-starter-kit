import type { Meta, StoryObj } from '@storybook/react';
import { TicketPage } from './TicketPage';

const meta: Meta<typeof TicketPage> = {
  title: 'Pages/TicketPage/TicketPage',
  component: TicketPage,
  parameters: {
    backgrounds: { default: 'gradient' }
  }
};

export default meta;
type Story = StoryObj<typeof TicketPage>;

export const Default: Story = {
  args: {
    ticketNumber: 123456
  }
};

export const Authenticated: Story = {
  args: {
    username: 'rashy',
    name: 'Marcus Rashford',
    ticketNumber: 123456
  }
};

export const SharePage: Story = {
  args: {
    ...Authenticated.args,
    sharePage: true
  }
};

export const ShareNoName: Story = {
  args: {
    username: 'rashy',
    sharePage: true
  }
};
