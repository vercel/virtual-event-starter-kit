import { styled } from '@storybook/theming';
import { styles } from '@storybook/components-marketing';

const { marketing, color, breakpoints } = styles;

const Container = styled.div<{ background: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  background: ${({ background }) => background};
  height: 100%;
  padding-top: 30px;
  overflow: hidden;

  @media (min-width: ${breakpoints[2]}px) {
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
  flex: 1 1 40%;
  margin-bottom: 30px;
  margin-left: 30px;
  margin-right: 30px;

  @media (min-width: ${breakpoints[2]}px) {
    max-width: 360px;
    margin: 0;
  }
`;

const Figure = styled.div`
  flex: 1 1 60%;
  align-self: stretch;
  min-width: 0;
  display: flex;
  align-items: flex-end;

  img {
    display: block;
    width: 100%;
    margin: 0 auto;

    @media (min-width: ${breakpoints[2]}px) {
      margin: 0;
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
