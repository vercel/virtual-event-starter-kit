import { styled } from '@storybook/theming';
import { styles } from '@storybook/components-marketing';

const { color, background, text } = styles;

const Title = styled.div`
  ${text.regularBold};
  color: ${color.darkest};
`;

const Copy = styled.div`
  ${text.regular};
  color: ${color.darkest};
`;

const AlertWrapper = styled.div<{ type: 'success' | 'error' }>`
  background: ${props => (props.type === 'error' ? background.negative : background.positive)};
  border: 1px solid
    ${props => (props.type === 'error' ? 'rgba(255, 68, 0, 0.2)' : 'rgba(102, 191, 60, 0.2)')};
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 1rem;
`;

interface AlertProps {
  title: string;
  message: string;
  type?: 'success' | 'error';
}

export const Alert = ({ title, message, type = 'success' }: AlertProps) => (
  <AlertWrapper type={type}>
    <Title>{title}</Title>
    <Copy>{message}</Copy>
  </AlertWrapper>
);
