import type { Meta, StoryObj } from '@storybook/react';
import { HighlightedFeature } from './HighlightedFeature';

const meta: Meta<typeof HighlightedFeature> = {
  title: 'Homepage/HighlightedFeature',
  component: HighlightedFeature,
  parameters: {
    layout: 'centered'
  }
};
export default meta;
type Story = StoryObj<typeof HighlightedFeature>;

export const Default: Story = {
  decorators: [StoryFn => <div style={{ height: 520 }}>{StoryFn()}</div>],
  args: {
    title: 'Performance overhaul',
    description:
      'Lorem ipsum dolor sit amet consectatur vestibulum aret sit click, hover, and type inside your story file. Powered by Jest and Testing.',
    image: <img src="csf-example.png" alt="" style={{ marginBottom: '-12%' }} />,
    background: '#E3F3FF'
  }
};
