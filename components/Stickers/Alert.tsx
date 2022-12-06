import { styled } from '@storybook/theming';
import { styles } from '@storybook/components-marketing';

const { color, text } = styles;

const Title = styled.div`
  ${text.regularBold};
  color: ${color.darkest};
`;

const Copy = styled.div`
  ${text.regular};
  color: ${color.darkest};
`;

const AlertWrapper = styled.div`
  background: #e7fed8;
  border: 1px solid rgba(102, 191, 60, 0.2);
  border-radius: 4px;
  padding: 20px;
`;

interface AlertProps {
  title: string;
  message: string;
}

export const Alert = ({ title, message }: AlertProps) => (
  <AlertWrapper>
    <Title>{title}</Title>
    <Copy>{message}</Copy>
  </AlertWrapper>
);
