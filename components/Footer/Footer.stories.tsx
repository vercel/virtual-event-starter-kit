import React, { forwardRef } from 'react';
import { Footer } from './Footer';

export default {
  title: 'Layout/Footer',
  component: Footer,
  parameters: {
    chromatic: { viewports: [320, 440, 600, 900] },
    layout: 'fullscreen'
  },
  args: {
    subscriberCount: 5363
  }
};

const FakeGatsbyLink = forwardRef<HTMLAnchorElement, { to: string }>(
  ({ children, to, ...props }, ref) => (
    <a href={to} ref={ref} {...props}>
      {children}
    </a>
  )
);
FakeGatsbyLink.displayName = 'FakeGatsbyLink';

export const Default = { args: {} };
