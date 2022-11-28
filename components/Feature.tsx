import { styled } from '@storybook/theming';
import { AspectRatio, styles } from '@storybook/components-marketing';

const { marketing, color } = styles;

const TextWrapper = styled.div`
  margin: 0 auto;
  max-width: 92.30769231%;
  color: ${color.darkest};
`;
const Title = styled.div`
  ${marketing.subheading};
  margin-bottom: 4px;
`;

const Description = styled.h2`
  ${marketing.textLarge};
`;

const Figure = styled(AspectRatio)<{ background: string }>`
  border-radius: 20px;
  background: ${({ background }) => background};
  margin-bottom: 30px;
  max-height: 520px;
  margin-left: auto;
  margin-right: auto;

  img {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

const Icon = styled.img`
  flex: none;
  display: block;
  width: 80px;
  height: 80px;
  border-radius: 10px;
  margin-right: 30px;
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
