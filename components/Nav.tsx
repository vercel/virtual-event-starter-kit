import React from 'react';
import { styled } from '@storybook/theming';
import { Logos, Button } from '@storybook/design-system';
import { styles, NavItem } from '@storybook/components-marketing';
import { SNEAK_PEEK_URL, DISCORD_URL, TWITTER_URL } from '@lib/constants';
import { LinkWrapper } from '@components/LinkWrapper';

const { pageMargins, spacing, color, breakpoints, typography } = styles;

const LogoNavItem = styled(NavItem)`
  background-color: transparent;

  &:hover,
  &:focus,
  &:active {
    background-color: transparent;
    outline: 2px solid ${color.secondary};
  }

  @media (min-width: ${breakpoints[2]}px) {
    margin-right: 24px;
  }
`;

const StorybookLogo = styled(Logos.Storybook)`
  height: 20px;
  display: block;
`;
const YearTag = styled.span`
  color: #e69d00;
  border-radius: ${spacing.borderRadius.small}px;
  font-size: ${typography.size.s1}px;
  font-weight: ${typography.weight.bold};
  line-height: 16px;
  margin-left: 6px;
  border: 1px solid #e69d00;
  padding: 2px 6px;
`;

const Wrapper = styled.div<{ inverse?: boolean; transparent?: boolean }>`
  box-shadow: ${props => (props.inverse ? 'rgba(255, 255, 255, 0.1)' : color.tr10)} 0 -1px 0px 0px inset;
  padding-top: ${spacing.padding.medium}px;
  padding-bottom: ${spacing.padding.medium}px;
  background-color: ${props => (props.transparent ? 'transparent' : '#d9e6f2')};
`;

const NavContainer = styled.nav`
  ${pageMargins}
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavLinks = styled.div`
  display: none;
  align-items: center;

  > * {
    margin-right: 9px;
  }

  @media (min-width: ${breakpoints[1] * 1.25}px) {
    display: flex;
  }
`;

interface NavProps {
  transparent?: boolean;
}

export const Nav = ({ transparent }: NavProps) => {
  return (
    <Wrapper transparent={transparent}>
      <NavContainer>
        <LogoNavItem aria-label="home" href="/" LinkWrapper={LinkWrapper}>
          <StorybookLogo role="presentation" />
          <YearTag>2023</YearTag>
        </LogoNavItem>
        <NavLinks>
          <NavItem variant="default" href={SNEAK_PEEK_URL}>
            Sneak peek
          </NavItem>
          <NavItem variant="default" href={DISCORD_URL}>
            Discord
          </NavItem>
          <NavItem variant="default" href={TWITTER_URL}>
            Twitter
          </NavItem>
        </NavLinks>
        <Button size="small" appearance="secondary" isLink href="#register">
          Get your free ticket
        </Button>
      </NavContainer>
    </Wrapper>
  );
};
