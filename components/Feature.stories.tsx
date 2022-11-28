import type { Meta, StoryObj } from '@storybook/react';
import { Feature } from './Feature';

const meta: Meta<typeof Feature> = {
  title: 'Homepage/Feature',
  component: Feature,
  parameters: {
    layout: 'centered'
  },
  decorators: [StoryFn => <div style={{ maxWidth: 520 }}>{StoryFn()}</div>]
};
export default meta;
type Story = StoryObj<typeof Feature>;

export const Default: Story = {
  args: {
    title: 'Performance overhaul',
    description:
      'Lorem ipsum dolor sit amet consectatur vestibulum aret sit click, hover, and type inside your story file. Powered by Jest and Testing.',
    image: '/perf.png',
    background: '#E3F3FF'
  }
};

export const WithIcon: Story = {
  args: {
    title: 'Official Figma integration',
    description:
      'Simulate user behavior like click, hover, and type inside your story file. Powered by Jest and Testing Library',
    image: '/figma.png',
    background: '#EEEEEE',
    icon: '/figma-icon.png'
  }
};
