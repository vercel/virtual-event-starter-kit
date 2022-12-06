import { styled } from '@storybook/theming';
import { styles } from '@storybook/components-marketing';
import { Spinner } from '@storybook/design-system';

const { color } = styles;

const Loader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: ${color.secondary};
  display: flex;
  align-items: center;
  justify-content: center;

  & > div {
    width: 16px;
    height: 16px;
  }
`;

export const LoadingSpinner = () => (
  <Loader>
    <Spinner inverse inline />
  </Loader>
);
