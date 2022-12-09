import type { Meta, StoryObj } from '@storybook/react';
import { CustomizationForm } from './CustomizationForm';

const meta: Meta<typeof CustomizationForm> = {
  title: 'Pages/TicketPage/CustomizationForm',
  component: CustomizationForm,
  parameters: {
    layout: 'centered'
  }
};

export default meta;
type Story = StoryObj<typeof CustomizationForm>;

export const Default: Story = {
  args: {
    setTicketGenerationState: () => {}
  }
};

export const Authenticated: Story = {
  args: {
    ...Default.args,
    defaultUsername: 'domyen'
  }
};

export const Error: Story = {
  args: {
    ...Default.args,
    defaultFormState: 'error',
    defaultErrorMsg: 'Something went wrong'
  }
};
