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
import StageContainer from '@components/stage-container';
import Layout from '@components/layout';

import { getAllStages } from '@lib/cms-api';
import { Stage } from '@lib/types';
import { META_DESCRIPTION } from '@lib/constants';

type Props = {
  stage: Stage;
  allStages: Stage[];
};

export default function StagePage({ stage, allStages }: Props) {
  const meta = {
    title: 'Demo - Virtual Event Starter Kit',
    description: META_DESCRIPTION
  };
  return (
    <Page meta={meta} fullViewport>
      <Layout isLive={stage.isLive}>
        <StageContainer stage={stage} allStages={allStages} />
      </Layout>
    </Page>
  );
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug;
  const stages = await getAllStages();
  const stage = stages.find((s: Stage) => s.slug === slug) || null;

  if (!stage) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      stage,
      allStages: stages
    },
    revalidate: 60
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const stages = await getAllStages();
  const slugs = stages.map((s: Stage) => ({ params: { slug: s.slug } }));

  return {
    paths: slugs,
    fallback: false
  };
};
