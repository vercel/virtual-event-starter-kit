import { styled } from '@storybook/theming';
import { PuzzlePieces } from '@components/PuzzlePieces';
import { Hero } from './Hero';
import { FeaturesSection } from './FeaturesSection';
import { Illustration } from './Illustration';

const GradientBackdrop = styled.div`
  background: linear-gradient(180deg, #d9e6f2 0%, rgba(246, 249, 252, 0) 100%);
`;

export const HomePage = () => (
  <>
    <GradientBackdrop>
      <PuzzlePieces />
      <Hero />
      {/* <Illustration /> */}
    </GradientBackdrop>
    <FeaturesSection />
  </>
);
