/* eslint-disable react/display-name */
import React, { useMemo } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import Image from 'next/image';
import CustomLink from './Link';
import TOCInline from './TOCInline';
import Pre from './Pre';
import { BlogNewsletterForm } from './NewsletterForm';
// Import known layouts statically to avoid dynamic require/Promise interop
// issues under Turbopack/Next 16 which can cause SSR/CSR hydration
// mismatches when require(...) returns a Promise/namespace object.
import AuthorLayout from '@/layouts/AuthorLayout';
import PostLayout from '@/layouts/PostLayout';
import PostSimple from '@/layouts/PostSimple';
import ListLayout from '@/layouts/ListLayout';
import CourseLayout from '@/layouts/CourseLayout';

const layouts: Record<string, any> = {
  AuthorLayout,
  PostLayout,
  PostSimple,
  ListLayout,
  CourseLayout,
};

const Wrapper: React.ComponentType<{ layout: string }> = ({
  layout,
  ...rest
}) => {
  const Layout = layouts[layout];
  if (!Layout) {
    // If the requested layout is unknown, log and render children as a
    // deterministic fallback so SSR and CSR match.
    // eslint-disable-next-line no-console
    console.error(`Unknown MDX layout requested: "${layout}"`);
    // @ts-ignore
    return <>{rest.children}</>;
  }
  return <Layout {...rest} />;
};

// mdx-bundler's types changed; use a loose `any` here to avoid
// breaking the build during migration. We keep runtime behavior.
export const MDXComponents: any = {
  Image,
  //@ts-ignore
  TOCInline,
  a: CustomLink,
  pre: Pre,
  wrapper: Wrapper,
  //@ts-ignore
  BlogNewsletterForm,
};

interface Props {
  layout: string;
  mdxSource: string;
  [key: string]: unknown;
}

export const MDXLayoutRenderer = ({ layout, mdxSource, ...rest }: Props) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource]);

  return <MDXLayout layout={layout} components={MDXComponents} {...rest} />;
};
