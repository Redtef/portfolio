/* eslint-disable jsx-a11y/anchor-has-content */
import NextLink from 'next/link';
import React, { AnchorHTMLAttributes } from 'react';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { href?: string };

const CustomLink: React.FC<Props> = ({ href = '', children, ...rest }) => {
  const isInternalLink = href && href.startsWith('/');
  const isAnchorLink = href && href.startsWith('#');

  if (isInternalLink) {
    // New Next.js Link forwards anchor props — render Link directly
    return (
      <NextLink href={href} {...(rest as any)}>
        {children}
      </NextLink>
    );
  }

  if (isAnchorLink) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <a target='_blank' rel='noopener noreferrer' href={href} {...rest}>
      {children}
    </a>
  );
};

export default CustomLink;
