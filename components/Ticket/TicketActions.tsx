import { styled } from '@storybook/theming';
import { styles } from '@storybook/components-marketing';
import { Button, Icon } from '@storybook/design-system';

const { marketing, breakpoints, pageMargins } = styles;

const Title = styled.h1`
  ${marketing.hero2};
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

  @media (min-width: ${breakpoints[0]}px) {
    ${marketing.hero1};
  }
`;

const Subtitle = styled.div`
  ${marketing.textLarge};
`;

interface TicketActionsProps {}

export const TicketActions = ({}: TicketActionsProps) => (
  <div>
    {/* Ticket actions */}
    <Button appearance="secondary" size="medium">
      <Icon icon="github" /> Customize your ticket
    </Button>
    {/* {!sharePage && (
      <>
        {username ? (
          <div>
            <TicketActions username={username} />
            <TicketCopy username={username} />
          </div>
        ) : (
          <div className="styles['ticket-actions-placeholder']" />
        )}
      </>
    )} */}
  </div>
);
