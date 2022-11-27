import { styled } from '@storybook/theming';
import { styles } from '@storybook/components-marketing';

const { marketing } = styles;

const Title = styled.h2`
  ${marketing.hero1};
`;

export const Features = () => <Title>Insiders launch event</Title>;
