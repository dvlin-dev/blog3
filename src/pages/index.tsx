import clsx from 'clsx';
import { InferGetStaticPropsType } from 'next';
import * as React from 'react';
import { InView } from 'react-intersection-observer';

import { trackEvent } from '@/lib/analytics';
import clsxm from '@/lib/clsxm';
import { getAllFilesFrontmatter, getFeatured } from '@/lib/mdx';
import { generateRss } from '@/lib/rss';
import useInjectContentMeta from '@/hooks/useInjectContentMeta';
import useLoaded from '@/hooks/useLoaded';

import Accent from '@/components/Accent';
import BlogCard from '@/components/content/blog/BlogCard';
import Layout from '@/components/layout/Layout';
import ButtonLink from '@/components/links/ButtonLink';
import CustomLink from '@/components/links/CustomLink';
import Seo from '@/components/Seo';

export default function HomePage({
  featuredPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const populatedPosts = useInjectContentMeta('blog', featuredPosts);

  const isLoaded = useLoaded();

  return (
    <Layout>
      <Seo />
      <main>
        <section className={clsxm(isLoaded && 'fade-in-start')}>
          <div className='md:mt-[120px]  text-left mt-[40px]'>
            <article className=''>
              <div className='flex flex-col items-start'>
                <Accent
                  className='mb-8 md:text-4xl text-[#555] dark:text-[#bbb] text-3xl'
                  data-fade='1'
                >
                  dvlin blog
                </Accent>
                {/* <div
                  className={clsxm(
                    'mt-2 text-[#555] dark:text-[#bbb]',
                    'lg:text-xl text-left text-lg'
                  )}
                  data-fade='4'
                >
                  Find me on
                  <div className='lg:my-4 my-2 gap-4 flex flex-wrap items-center'>
                    <CustomLink href='https://github.com/bowling00'>
                      <div className='flex items-center gap-1'>
                        <SiGithub />
                        GitHub
                      </div>
                    </CustomLink>
                    <CustomLink href='https://space.bilibili.com/519295997'>
                      <div className='flex items-center gap-1'>
                        <SiBilibili />
                        Bilibili （技术向）
                      </div>
                    </CustomLink>
                    <CustomLink href='https://space.bilibili.com/3546631402162997'>
                      <div className='flex items-center gap-1'>
                        <SiBilibili />
                        Bilibili （生活向，TODO: 待起号）
                      </div>
                    </CustomLink>
                    <CustomLink href='https://twitter.com/dvlin0'>
                      <div className='flex items-center gap-1'>
                        <SiTwitter />X
                      </div>
                    </CustomLink>
                  </div>
                </div> */}

                <div data-fade='5' className='mt-4 flex'>
                  <CustomLink
                    href='/blog'
                    onClick={() =>
                      trackEvent('Home: Read blogs', { type: 'navigate' })
                    }
                  >
                    To Blog
                  </CustomLink>
                  <CustomLink
                    href='/jottings'
                    className='ml-6'
                    onClick={() =>
                      trackEvent('Home: See more project', { type: 'navigate' })
                    }
                  >
                    To Jottings
                  </CustomLink>
                  <CustomLink
                    href='/projects'
                    className='ml-6'
                    onClick={() =>
                      trackEvent('Home: See more project', { type: 'navigate' })
                    }
                  >
                    To Projects
                  </CustomLink>
                </div>
              </div>
            </article>
          </div>
        </section>
        <InView triggerOnce rootMargin='-40% 0px'>
          {({ ref, inView }) => (
            <section
              ref={ref}
              className={clsx('py-20', inView && 'fade-in-start')}
            >
              <article className='layout' data-fade='0'>
                <h2 className='text-2xl md:text-4xl' id='blog'>
                  <Accent>Featured Posts</Accent>
                </h2>
                <ul className='mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
                  {populatedPosts.map((post, i) => (
                    <BlogCard
                      key={post.slug}
                      post={post}
                      className={clsx(i > 2 && 'hidden sm:block')}
                      type='blog'
                    />
                  ))}
                </ul>
                <ButtonLink
                  className='mt-4'
                  href='/blog'
                  onClick={() =>
                    trackEvent('Home: See more post', { type: 'navigate' })
                  }
                >
                  See more post
                </ButtonLink>
              </article>
            </section>
          )}
        </InView>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  generateRss();
  const blogs = await getAllFilesFrontmatter('blog');

  const featuredPosts = getFeatured(blogs, [
    'tech-vol-001',
    'tech-vol-002',
    'tech-vol-003',
  ]);

  return {
    props: { featuredPosts },
  };
}
