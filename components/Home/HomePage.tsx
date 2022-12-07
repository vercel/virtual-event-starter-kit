import { styled } from '@storybook/theming';
import { PuzzlePieces } from '@components/PuzzlePieces';
import { Hero } from './Hero';
import { FeaturesSection } from './FeaturesSection';

const GradientBackdrop = styled.div`
  background: linear-gradient(180deg, var(--bg-blue) 0%, rgba(246, 249, 252, 0) 100%);
`;

export const HomePage = () => (
  <>
    <PuzzlePieces />
    <GradientBackdrop>
      <Hero />
    </GradientBackdrop>
    <FeaturesSection />
  </>
);
