import type { Meta, StoryObj } from '@storybook/react';
import { HomePage } from './index';

const meta: Meta<typeof HomePage> = {
  title: 'Pages/Home',
  component: HomePage,
  parameters: {
    chromatic: { viewports: [320, 440, 600, 900] }
  }
};
export default meta;
type Story = StoryObj<typeof HomePage>;

export const Default: Story = { name: 'HomePage' };
