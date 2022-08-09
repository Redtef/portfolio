import { MDXLayoutRenderer } from '@/components/MDXComponents';
import { getFileBySlug } from '@/lib/mdx';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { AuthorFrontMatter } from 'types/AuthorFrontMatter';

const DEFAULT_LAYOUT = 'AuthorLayout';

// @ts-ignore
export const getStaticProps: GetStaticProps<{
  authorDetails: { mdxSource: string; frontMatter: AuthorFrontMatter };
}> = async () => {
  const authorDetails = await getFileBySlug<AuthorFrontMatter>('authors', [
    'default',
  ]);
  // console.log(authorDetails)
  const { mdxSource, frontMatter } = authorDetails;
  return { props: { authorDetails: { mdxSource, frontMatter } } };
};

export default function Home({
  authorDetails,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { mdxSource, frontMatter } = authorDetails;
  return (
    <>
      {/* <PageSEO
        title={siteMetadata.title}
        description={siteMetadata.description}
      /> */}
      {/* <Banner frontMatter={author} /> */}
      <MDXLayoutRenderer
        layout={frontMatter.layout || DEFAULT_LAYOUT}
        mdxSource={mdxSource}
        frontMatter={frontMatter}
      />
    </>
  );
}
