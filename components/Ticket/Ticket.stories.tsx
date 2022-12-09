import type { Meta, StoryObj } from '@storybook/react';
import Ticket from './ticket';

const meta: Meta<typeof Ticket> = {
  title: 'Pages/Ticket',
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
    username: 'rashyskdjf kdjf ksdjf ksdjf kdsj fkjd',
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

export const SharePageNoName: Story = {
  args: {
    username: 'rashy',
    sharePage: true
  }
};
