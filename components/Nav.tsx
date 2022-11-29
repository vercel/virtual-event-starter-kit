import React, { FunctionComponent } from 'react';
import { styled } from '@storybook/theming';
import { Logos, Button } from '@storybook/design-system';
import { styles, NavItem } from '@storybook/components-marketing';

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

const Wrapper = styled.div<{ inverse?: boolean }>`
  box-shadow: ${props => (props.inverse ? 'rgba(255, 255, 255, 0.1)' : color.tr10)} 0 -1px 0px 0px inset;
  padding-top: ${spacing.padding.medium}px;
  padding-bottom: ${spacing.padding.medium}px;
`;

const NavContainer = styled.nav`
  ${pageMargins}
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

interface NavProps {
  activeSection?: 'home' | 'why' | 'docs' | 'integrations' | 'showcase' | 'community';
}

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

export const Nav: FunctionComponent<NavProps> = ({ activeSection = 'home' }) => {
  return (
    <Wrapper>
      <NavContainer>
        <LogoNavItem aria-label="home" href="navLinks.home.url">
          <StorybookLogo role="presentation" />
          <YearTag>2023</YearTag>
        </LogoNavItem>
        <NavLinks>
          <NavItem active={activeSection === 'why'} variant="default" href="#sneak-peek">
            Sneak peek
          </NavItem>
          <NavItem
            active={activeSection === 'showcase'}
            variant="default"
            href="https://discord.gg/storybook"
          >
            Discord
          </NavItem>
          <NavItem
            active={activeSection === 'integrations'}
            variant="default"
            href="https://twitter.com/storybookjs"
          >
            Twitter
          </NavItem>
        </NavLinks>
        <Button size="small" appearance="secondary">
          Get your free ticket
        </Button>
      </NavContainer>
    </Wrapper>
  );
};
