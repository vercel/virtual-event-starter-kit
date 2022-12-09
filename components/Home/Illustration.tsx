import { styled } from '@storybook/theming';
import { styles } from '@storybook/components-marketing';

const { pageMargins } = styles;

const Container = styled.div`
  ${pageMargins};
`;

const Canvas = styled.div`
  height: 400px;
  margin-top: 4rem;
  margin-bottom: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dotted #ccc;
`;

export const Illustration = ({ children }) => <Container>{children}</Container>;
