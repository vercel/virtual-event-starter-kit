import React from 'react';
import { styled } from '@storybook/theming';
import { Logos } from '@storybook/design-system';
import { styles } from '@storybook/components-marketing';

const { color, marketing } = styles;

const Label = styled.div`
  ${marketing.textSmall};
  color: ${color.dark};
`;

const ChromaticLogo = styled(Logos.Chromatic)`
  height: 20px;
  margin-left: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 24px;
`;

export const ByChromatic = () => (
  <Wrapper>
    <Label>Brought to you by</Label>
    <ChromaticLogo />
  </Wrapper>
);
