import * as React from 'react';
import Script from 'next/script';

const trackingId = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

export const Analytics = () =>
  trackingId ? (
    // See: https://nextjs.org/docs/messages/next-script-for-ga
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${trackingId}');
        `}
      </Script>
    </>
  ) : null;

type TrackCustomEvent = (options: {
  action?: 'click' | 'subscribe';
  category: 'Component' | 'Project' | 'add-your-project' | 'newsletter' | 'search';
  label: string;
  value?: number;
}) => void;

export const trackCustomEvent: TrackCustomEvent = ({
  action = 'click',
  category,
  label,
  value
}) => {
  typeof window !== 'undefined' &&
    // @ts-expect-error - It's fine, TS...
    typeof window.gtag !== 'undefined' &&
    // See: https://developers.google.com/analytics/devguides/collection/gtagjs/events#send_events
    // @ts-expect-error - It's fine, TS...
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
};
