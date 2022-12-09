import { styles } from '@storybook/components-marketing';
import { styled } from '@storybook/theming';
import { Button } from '@storybook/design-system';

const { spacing, color, typography, background, breakpoints } = styles;

const ErrorAlert = styled.div`
  background: ${background.lightest};
  display: flex;
  border: 1px solid ${color.negative};
  border-radius: ${spacing.borderRadius.small}px;
  overflow: hidden;

  flex-wrap: wrap;

  @media (min-width: ${breakpoints[1]}px) {
    flex-wrap: nowrap;
  }
`;

const ErrorMessage = styled.div`
  flex: 1 1 auto;
  background: ${color.lightest};
  color: ${color.negative};
  font-size: ${typography.size.s2}px;
  font-weight: ${typography.weight.bold};
  line-height: 20px;
  padding: 10px 15px;
  text-align: center;

  @media (min-width: ${breakpoints[1]}px) {
    text-align: left;
  }
`;

const RetryButton = styled(Button)`
  background: ${color.negative};
  color: ${color.lightest};
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: ${spacing.borderRadius.small}px;
  border-bottom-right-radius: ${spacing.borderRadius.small}px;
  flex: none;
  width: 100%;

  @media (min-width: ${breakpoints[1]}px) {
    width: auto;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: ${spacing.borderRadius.small}px;
    border-bottom-right-radius: ${spacing.borderRadius.small}px;
  }

  &:hover {
    background: ${color.negative};
  }

  &:active {
    background: ${color.negative};
  }
`;

interface RetryProps {
  message: string;
  onTryAgain: (e: React.MouseEvent) => void;
}

export const Retry = ({ message, onTryAgain, ...props }: RetryProps) => (
  <ErrorAlert {...props}>
    <ErrorMessage>{message}</ErrorMessage>
    <RetryButton appearance="inverse" type="button" onClick={onTryAgain}>
      Try Again
    </RetryButton>
  </ErrorAlert>
);
