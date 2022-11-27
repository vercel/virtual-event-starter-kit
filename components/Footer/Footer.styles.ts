import { styled } from '@storybook/theming';
import { Link, Subheading } from '@storybook/design-system';
import { styles } from '@storybook/components-marketing';

const { background, color, typography, pageMargins, subheading, breakpoints } = styles;

const inverseBorder = 'rgba(255, 255, 255, 0.1)';

export const FooterWrapper = styled.footer<{ inverse?: boolean }>`
  background-color: ${props => (props.inverse ? color.midnight : background.app)};
  border-top: 1px solid ${props => (props.inverse ? inverseBorder : color.border)};
  padding-top: 3rem;
  padding-bottom: 3rem;

  @media (min-width: ${breakpoints[2]}px) {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
`;

export const LayoutWrapper = styled.div`
  ${pageMargins};
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 3rem 0;

  @media (min-width: ${breakpoints[2]}px) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  }
`;

export const Title = styled(Subheading)`
  ${subheading.regular};
  line-height: 20px;
  display: block;
  color: ${color.mediumdark};
  margin-bottom: 16px;
`;

export const Register = styled.div`
  flex: 1 1 50%;
`;

export const ColumnsWrapper = styled.div`
  flex: 1 1 50%;
  display: flex;
  gap: 3rem;

  @media (min-width: ${breakpoints[3]}px) {
    gap: 6rem;
  }
`;

export const Column = styled.div`
  flex: 1 1 50%;

  > a {
    line-height: 20px;
    display: block;
    margin-bottom: 12px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const FooterLink = styled(Link)`
  font-size: ${typography.size.s2}px;
`;
FooterLink.defaultProps = {
  tertiary: true
};

export const FooterText = styled.div`
  font-size: ${typography.size.s2}px;
  line-height: 20px;
  color: ${color.dark};
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;
