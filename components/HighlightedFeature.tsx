import { styled } from '@storybook/theming';
import { AspectRatio, styles } from '@storybook/components-marketing';

const { marketing, color, breakpoints } = styles;

const Container = styled.div<{ background: string }>`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  background: ${({ background }) => background};
  padding-top: 30px;
  overflow: hidden;

  @media (min-width: ${breakpoints[2]}px) {
    min-height: 512px;
    padding-top: 0;
    flex-direction: row;
    padding-left: 60px;
  }
`;

const Title = styled.h2`
  ${marketing.subheading};
  margin-bottom: 4px;
`;

const Description = styled.div`
  ${marketing.textLarge};
`;

const TextWrapper = styled.div`
  color: ${color.darkest};
  margin-left: 30px;
  margin-right: 30px;
  margin-bottom: 30px;

  @media (min-width: ${breakpoints[2]}px) {
    flex: 1 1 40%;
    max-width: 360px;
    margin: 0;
  }
`;

const Figure = styled.div`
  align-self: stretch;
  min-width: 0;
  display: flex;
  align-items: flex-end;
  flex: 1 1 auto;

  @media (min-width: ${breakpoints[2]}px) {
    flex: 1 1 60%;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center bottom;
    margin-left: auto;
    margin-right: auto;

    @media (min-width: ${breakpoints[2]}px) {
      margin-left: 0;
      margin-right: 0;
      object-fit: cover;
      object-position: left top;
    }
  }
`;

interface HighlightedFeatureProps {
  title: string;
  description: string;
  image: React.ReactNode;
  background: string;
}

export const HighlightedFeature = ({
  title,
  description,
  image,
  background
}: HighlightedFeatureProps) => (
  <Container background={background}>
    <TextWrapper>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </TextWrapper>

    <Figure>{image}</Figure>
  </Container>
);
