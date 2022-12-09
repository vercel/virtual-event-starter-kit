/**
 * Copyright 2020 Vercel Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Tilt from 'vanilla-tilt';
import { useRef, useEffect, useState } from 'react';
import { UserData } from '@lib/hooks/use-conf-data';
import { TicketGenerationState } from '@lib/constants';
import isMobileOrTablet from '@lib/is-mobile-or-tablet';
import { scrollTo } from '@lib/smooth-scroll';
import { styled } from '@storybook/theming';
import { styles } from '@storybook/components-marketing';
import TicketForm from './ticket-form';
import TicketVisual from './ticket-visual';
import { TicketActions } from './TicketActions';
import { CustomizationForm } from './CustomizationForm';
import TicketCopy from './ticket-copy';
import { DATE, SITE_NAME } from '@lib/constants';
import Form from '../remove/form';
import { FreeStickers } from '@components/FreeStickers';
import { RegistrationForm } from '@components/RegistrationForm';

const { marketing, breakpoints, color, pageMargins } = styles;

type TicketPageProps = {
  username: UserData['username'];
  ticketNumber: UserData['ticketNumber'];
  name: UserData['name'];
  sharePage?: boolean;
};

const Wrapper = styled.div`
  ${pageMargins};
  min-height: calc(100vh - 72px);
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  ${marketing.hero2};
  color: ${color.darkest};

  @media (min-width: ${breakpoints[0]}px) {
    ${marketing.hero1};
  }
`;

const Subtitle = styled.div`
  ${marketing.textLarge};
`;

const Divider = styled.hr`
  border-color: ${color.border};
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const CustomizationContainer = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 1rem;
`;

export const TicketPage = ({ username, name, ticketNumber, sharePage }: TicketPageProps) => {
  const ticketRef = useRef<HTMLDivElement>(null);
  const [ticketGenerationState, setTicketGenerationState] = useState<TicketGenerationState>(
    'default'
  );
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ticketRef.current && !window.matchMedia('(pointer: coarse)').matches) {
      Tilt.init(ticketRef.current, {
        glare: true,
        max: 5,
        'max-glare': 0.16,
        'full-page-listening': true
      });
    }
  }, [ticketRef]);

  useEffect(() => {
    if (!sharePage && divRef && divRef.current && isMobileOrTablet()) {
      scrollTo(divRef.current, -30);
    }
  }, [divRef, sharePage]);

  return (
    <Wrapper ref={divRef}>
      <div>
        <div>
          {sharePage ? (
            <>
              <Title>{name ? <>{name}’s Ticket</> : <>{SITE_NAME}</>}</Title>
              <Subtitle>
                {sharePage ? (
                  <>
                    Join {name ?? 'them'} on {DATE} for Storybook Day.
                  </>
                ) : (
                  <>Customize the ticket with your GitHub profile</>
                )}
              </Subtitle>
            </>
          ) : (
            <>
              <Title>{username ? <>Your custom ticket</> : <>You’re in!</>}</Title>
              <Subtitle>
                {username ? (
                  <>Customize the ticket with your GitHub profile</>
                ) : (
                  <>Share your ticket to invite others to join you.</>
                )}
              </Subtitle>
            </>
          )}
        </div>
        <CustomizationContainer>
          {!sharePage ? (
            <CustomizationForm
              defaultUsername={username}
              setTicketGenerationState={setTicketGenerationState}
            />
          ) : (
            <RegistrationForm sharePage />
          )}
        </CustomizationContainer>
        <FreeStickers />
        <Divider />
        {/* Ticket actions */}
        {/* <div>
        <Title>
          {sharePage ? (
            name ? (
              <>{name}’s Ticket</>
            ) : (
              <>{SITE_NAME}</>
            )
          ) : (
            <>
              You're in. <br /> Make it unique.
            </>
          )}
        </Title>
        <p>
          {sharePage ? (
            <>
              Join {name ?? 'them'} on {DATE}.
            </>
          ) : (
            <>Generate a unique ticket image with your GitHub profile.</>
          )}
        </p>
      </div> */}
      </div>
    </Wrapper>
  );
};
