import clsx from 'clsx';

import useLoaded from '@/hooks/useLoaded';

import Comment from '@/components/content/Comment';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function ProjectsPage() {
  const isLoaded = useLoaded();

  return (
    <Layout>
      <Seo
        templateTitle='Links'
        description='dvlin friends, learn from each other and make progress together.'
      />
      <main>
        <section className={clsx(isLoaded && 'fade-in-start')}>
          <div className='layout'>
            <div className='mt-12 grid max-w-[820px] gap-4' data-fade='1'>
              <p className='text-[32px]'>Links</p>
            </div>
          </div>
          <figure className='mt-12'>
            <Comment />
          </figure>
        </section>
      </main>
    </Layout>
  );
}
