import type { Meta, StoryObj } from '@storybook/react';
import { StickerForm } from './StickerForm';

const meta: Meta<typeof StickerForm> = {
  title: 'Pages/Stickers/StickerForm',
  component: StickerForm,
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;
type Story = StoryObj<typeof StickerForm>;

export const Default: Story = {
  args: {
    value: {
      name: '',
      address: '',
      address2: '',
      cityTown: '',
      stateProvinceRegion: '',
      postalCode: '',
      country: ''
    },
    onChange: () => {},
    isLoading: false,
    onSubmit: () => {},
    handleRegister: () => {}
  }
};

export const Loading: Story = {
  args: {
    ...Default.args,
    isLoading: true
  }
};
