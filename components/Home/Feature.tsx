import { styled } from '@storybook/theming';
import { AspectRatio, styles } from '@storybook/components-marketing';

const { marketing, color, breakpoints } = styles;

const TextWrapper = styled.div`
  margin: 0 auto;
  max-width: 92.30769231%;
  color: ${color.darkest};
`;
const Title = styled.div`
  ${marketing.textLargeBold};
  margin-bottom: 4px;

  @media (min-width: ${breakpoints[0]}px) {
    ${marketing.subheading};
  }
`;

const Description = styled.div`
  ${marketing.textSmall};

  @media (min-width: ${breakpoints[0]}px) {
    ${marketing.textLarge};
  }
`;

const Figure = styled(AspectRatio)<{ background: string }>`
  border-radius: 20px;
  background: ${({ background }) => background};
  margin-bottom: 1rem;
  max-height: 520px;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: ${breakpoints[0]}px) {
    margin-bottom: 2rem;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

const Icon = styled.img`
  flex: none;
  display: none;
  width: 80px;
  height: 80px;
  border-radius: 10px;
  margin-right: 30px;

  @media (min-width: ${breakpoints[0]}px) {
    display: block;
  }
`;

const Lower = styled.div`
  display: flex;
`;

interface FeatureProps {
  title: string;
  description: string;
  image: string;
  background: string;
  icon?: string;
}

export const Feature = ({ title, description, image, background, icon }: FeatureProps) => (
  <div>
    <Figure ratio="1 / 1" background={background}>
      <img src={image} alt="" />
    </Figure>
    <Lower>
      {icon && <Icon src={icon} alt="" />}
      <TextWrapper>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </TextWrapper>
    </Lower>
  </div>
);
