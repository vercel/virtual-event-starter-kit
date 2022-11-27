import React from 'react';
import { ByChromatic } from '@components/ByChromatic';
import { EmailForm } from '@components/EmailForm';
import { LinkWrapper } from '@components/LinkWrapper';
import {
  Title,
  FooterWrapper,
  LayoutWrapper,
  Column,
  FooterLink,
  ColumnsWrapper,
  Register,
  FooterText
} from './Footer.styles';

export const Footer = () => {
  return (
    <FooterWrapper>
      <LayoutWrapper>
        <Register>
          <Title>Get your ticket</Title>
          <EmailForm />
          <ByChromatic />
        </Register>

        <ColumnsWrapper>
          <Column>
            <Title>Event details</Title>
            <FooterText>March 1, 2023</FooterText>
            <FooterText>10am – 12pm live premier</FooterText>
            <FooterLink tertiary href="/code-of-conduct" LinkWrapper={LinkWrapper}>
              Privacy policy
            </FooterLink>
            <FooterLink tertiary href="/privacy-policy" LinkWrapper={LinkWrapper}>
              Code of conduct
            </FooterLink>
          </Column>
          <Column>
            <Title>Get involved</Title>
            <FooterLink tertiary href="https://twitter.com/storybookjs">
              Twitter
            </FooterLink>
            <FooterLink tertiary href="https://discord.gg/storybook">
              Discord chat
            </FooterLink>
            <FooterLink tertiary href="https://www.youtube.com/c/StorybookJS">
              YouTube
            </FooterLink>
            <FooterLink tertiary href="http://github.com/storybookjs">
              GitHub
            </FooterLink>
          </Column>
        </ColumnsWrapper>
      </LayoutWrapper>
    </FooterWrapper>
  );
};
