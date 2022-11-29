import { styled } from '@storybook/theming';
import { Footer } from '@components/Footer';
import { Nav } from '@components/Nav';
import { Hero } from './Hero';
import { FeaturesSection } from './FeaturesSection';
import { Illustration } from './Illustration';

const HeroContainer = styled.div`
  background: linear-gradient(180deg, #d9e6f2 0%, rgba(246, 249, 252, 0) 100%);
`;

export const HomePage = () => (
  <>
    <HeroContainer>
      <Nav />
      <Hero />
      <Illustration />
    </HeroContainer>
    <main>
      <FeaturesSection />
    </main>
    <Footer />
  </>
);
