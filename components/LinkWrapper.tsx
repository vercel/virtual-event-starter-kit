import * as React from 'react';
import NextLink from 'next/link';

export const LinkWrapper = ({
  children,
  href,
  isNext = true,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { isNext?: boolean }) =>
  isNext && href ? (
    <NextLink href={href}>
      {/* Note: Spreading props here means any props specific to NextLink _must_ be de-structured */}
      <a {...props}>{children}</a>
    </NextLink>
  ) : (
    <a href={href} {...props}>
      {children}
    </a>
  );
