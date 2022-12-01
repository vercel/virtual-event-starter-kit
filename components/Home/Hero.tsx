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
  padding-top: 90px;
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

  background-image: url("data:image/svg+xml,%3Csvg width='386' height='88' viewBox='0 0 386 88' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_220_13607)'%3E%3Crect width='386' height='88' fill='white'/%3E%3Crect x='-0.849609' y='-8' width='386.849' height='120' fill='%232A0481'/%3E%3Cellipse cx='83.1747' cy='80.5' rx='94.1747' ry='83.5' fill='url(%23paint0_radial_220_13607)'/%3E%3Cellipse cx='83.1747' cy='-6.5' rx='94.1747' ry='83.5' fill='url(%23paint1_radial_220_13607)'/%3E%3Cellipse cx='175.657' cy='-6.5' rx='94.1747' ry='83.5' fill='url(%23paint2_radial_220_13607)'/%3E%3Cellipse cx='175.657' cy='80.5' rx='94.1747' ry='83.5' fill='url(%23paint3_radial_220_13607)'/%3E%3Cellipse cx='268.142' cy='-6.5' rx='94.1747' ry='83.5' fill='url(%23paint4_radial_220_13607)'/%3E%3Cellipse cx='268.142' cy='80.5' rx='94.1747' ry='83.5' fill='url(%23paint5_radial_220_13607)'/%3E%3C/g%3E%3Cdefs%3E%3CradialGradient id='paint0_radial_220_13607' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate(83.1747 80.5) rotate(90) scale(83.5 94.1747)'%3E%3Cstop stop-color='%23FF7777'/%3E%3Cstop offset='1' stop-color='%23FF7777' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='paint1_radial_220_13607' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate(83.1747 -6.5) rotate(90) scale(83.5 94.1747)'%3E%3Cstop stop-color='%23FFC077'/%3E%3Cstop offset='1' stop-color='%23FFC077' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='paint2_radial_220_13607' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate(175.657 -6.5) rotate(90) scale(83.5 94.1747)'%3E%3Cstop stop-color='%23FDFF93'/%3E%3Cstop offset='1' stop-color='%23FDFF93' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='paint3_radial_220_13607' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate(175.657 80.5) rotate(90) scale(83.5 94.1747)'%3E%3Cstop stop-color='%23FDFF93'/%3E%3Cstop offset='1' stop-color='%23FDFF93' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='paint4_radial_220_13607' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate(268.142 -6.5) rotate(90) scale(83.5 94.1747)'%3E%3Cstop stop-color='%23FF778F'/%3E%3Cstop offset='1' stop-color='%23FF778F' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='paint5_radial_220_13607' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate(268.142 80.5) rotate(90) scale(83.5 94.1747)'%3E%3Cstop stop-color='%2377FFF7'/%3E%3Cstop offset='1' stop-color='%2377FFF7' stop-opacity='0'/%3E%3C/radialGradient%3E%3CclipPath id='clip0_220_13607'%3E%3Crect width='386' height='88' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E");

  /* background: rgb(255, 119, 119); */
  /* background: linear-gradient(
      72deg,
      rgba(255, 119, 119, 1) 0%,
      rgba(255, 192, 119, 1) 17%,
      rgba(253, 255, 147, 1) 35%,
      rgba(119, 255, 247, 1) 55%,
      rgba(255, 119, 143, 1) 75%,
      rgba(42, 4, 129, 1) 100%
    ),
    rgba(42, 4, 129, 1); */
  /* background: radial-gradient(circle 188px at -1.2% -1.6%, #ff7777 0%, rgba(255, 119, 119, 0) 100%),
    radial-gradient(circle 188px at -1.2% -47.8%, #ffc077 0%, rgba(255, 192, 119, 0) 100%),
    radial-gradient(circle 188px at 54.2% -47.8%, #fdff93 0%, rgba(253, 255, 147, 0) 100%),
    radial-gradient(circle 188px at 6.7% 75%, #fdff93 0%, rgba(253, 255, 147, 0) 100%),
    radial-gradient(circle 188px at 109.6% -47.8%, #ff778f 0%, rgba(255, 119, 143, 0)),
    radial-gradient(circle 188px at 109.6% -1.6%, #77fff7 0%, rgba(119, 255, 247, 0) 100%)
      rgba(42, 4, 129, 1); */
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
