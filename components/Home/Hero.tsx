import { styled } from '@storybook/theming';
import { styles } from '@storybook/components-marketing';
import { Cardinal } from '@storybook/design-system';
import { RegistrationForm } from '@components/RegistrationForm';
import { FreeStickers } from '@components/FreeStickers';
import { ByChromatic } from '@components/ByChromatic';
import { SITE_NAME_MULTILINE, SHORT_TIME, TIMEZONE } from '@lib/constants';

const { marketing, breakpoints, pageMargins } = styles;

const Container = styled.div`
  ${pageMargins};
  padding-top: 7rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;

  @media (min-width: ${breakpoints[2]}px) {
    grid-template-columns: 1fr minmax(auto, 480px);
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0;

  @media (min-width: 770px) {
    flex-direction: row;
    align-items: flex-end;
    gap: 40px;
  }

  @media (min-width: ${breakpoints[2]}px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
  }
`;

const Title = styled.h1`
  ${marketing.hero1};
  white-space: nowrap;

  @media (min-width: ${breakpoints[2]}px) {
    margin-bottom: 1rem;
  }
`;

const Copy = styled.h2`
  ${marketing.textLarge};
  margin-bottom: 1.5rem;
`;

const Register = styled(RegistrationForm)`
  margin-bottom: 1.25rem;
`;

const InfoWrapper = styled.div`
  display: flex;
  gap: 32px;
`;

const Info = styled(Cardinal)`
  padding: 0;
`;

const MetaWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 24px;

  @media (min-width: 770px) {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  @media (min-width: ${breakpoints[2]}px) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 0;
  }
`;

const Gradient = styled.div`
  background-size: 100%;

  background-image: linear-gradient(
    290deg,
    hsl(271deg 59% 42%) 0%,
    hsl(209deg 100% 44%) 20%,
    hsl(198deg 100% 45%) 29%,
    hsl(184deg 100% 42%) 36%,
    hsl(165deg 66% 54%) 43%,
    hsl(108deg 54% 63%) 50%,
    hsl(57deg 72% 47%) 57%,
    hsl(36deg 100% 55%) 64%,
    hsl(20deg 100% 63%) 71%,
    hsl(358deg 100% 68%) 80%,
    hsl(340deg 100% 64%) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

export const Hero = () => (
  <Container>
    <TitleWrapper>
      <Title>
        {SITE_NAME_MULTILINE[0]}
        <Gradient>{SITE_NAME_MULTILINE[1]}</Gradient>
      </Title>
      <MetaWrapper>
        <InfoWrapper>
          <Info size="small" text={TIMEZONE} count={SHORT_TIME} />
          <Info size="small" text="Online event" count="Watch live" />
        </InfoWrapper>
        <ByChromatic />
      </MetaWrapper>
    </TitleWrapper>
    <div>
      <Copy id="register">
        Join us for an online event about the future of UI development with Storybook. See what’s
        new in 7.0, meet world-class frontend devs, and check out the leading projects in the
        community.
      </Copy>
      <Register />
      <FreeStickers />
    </div>
  </Container>
);
