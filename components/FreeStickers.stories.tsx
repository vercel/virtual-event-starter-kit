import type { Meta, StoryObj } from '@storybook/react';
import { FreeStickers } from './FreeStickers';

const meta: Meta<typeof FreeStickers> = {
  title: 'Components/FreeStickers',
  component: FreeStickers,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    image: {
      control: {
        type: null
      }
    }
  }
};
export default meta;
type Story = StoryObj<typeof FreeStickers>;

export const Default: Story = {};
