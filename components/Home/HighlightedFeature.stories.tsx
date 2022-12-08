import type { Meta, StoryObj } from '@storybook/react';
import { styled } from '@storybook/theming';
import { styles } from '@storybook/components-marketing';
import { HighlightedFeature } from './HighlightedFeature';

const { breakpoints } = styles;

const meta: Meta<typeof HighlightedFeature> = {
  title: 'Pages/Home/HighlightedFeature',
  component: HighlightedFeature,
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
type Story = StoryObj<typeof HighlightedFeature>;

const CSF = styled.img`
  @media (min-width: ${breakpoints[2]}px) {
    margin-bottom: -12%;
  }
`;
export const Default: Story = {
  args: {
    title: 'Performance overhaul',
    description:
      'Lorem ipsum dolor sit amet consectatur vestibulum aret sit click, hover, and type inside your story file. Powered by Jest and Testing.',
    image: <CSF src="/csf-example.png" />,
    background: '#E3F3FF'
  }
};

const StorybookUI = styled.img`
  @media (min-width: ${breakpoints[2]}px) {
    margin-bottom: -8%;
  }
`;
export const WideImage: Story = {
  args: {
    title: 'Design refresh',
    description:
      'Simulate user behavior like click, hover, and type inside your story file. Powered by Jest and Testing Library',
    image: <StorybookUI src="/sb-ui.png" />,
    background: '#FEF59F'
  }
};
