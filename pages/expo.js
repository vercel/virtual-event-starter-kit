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

import Page from '@components/page';
import Header from '@components/header';
import Layout from '@components/layout';
import InnovatorsGrid from 'components/innovators-grid';

import { META_DESCRIPTION } from '@lib/constants';
import { getInnovators } from 'lib/cms-api';

export default function ExpoPage({ innovators }) {
  const meta = {
    title: 'Expo - TEDxCMU Catalyst',
    description: META_DESCRIPTION
  };

  return (
    <Page meta={meta}>
      <Layout>
        <Header hero="Expo" description={meta.description} />
        <InnovatorsGrid innovators={innovators} />
      </Layout>
    </Page>
  );
}

export async function getStaticProps() {
  const innovators = await getInnovators();

  return {
    props: {
      innovators
    },
    revalidate: 1
  };
}
