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

import { GetStaticProps, GetStaticPaths } from 'next';

import Page from '@components/page';
import Layout from '@components/layout';
import InnovatorSection from 'components/innovator-section';

import { META_DESCRIPTION } from '@lib/constants';
import { getInnovators } from 'lib/cms-api';

export default function InnovatorPage({ innovator }) {
  const meta = {
    title: 'Innovator - TEDxCMU Catalyst',
    description: META_DESCRIPTION
  };

  return (
    <Page meta={meta}>
      <Layout>
        <InnovatorSection innovator={innovator} />
      </Layout>
    </Page>
  );
}

export async function getStaticProps({ params }) {
  const slug = params?.slug;
  const innovators = await getInnovators();
  const innovator = innovators.find((i) => i.slug === slug) || null;

  if (!innovator) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      innovator
    },
    revalidate: 60
  };
}

export async function getStaticPaths() {
  const innovators = await getInnovators();
  const slugs = innovators.map((i) => ({ params: { slug: i.slug } }));

  return {
    paths: slugs,
    fallback: 'blocking'
  };
}
