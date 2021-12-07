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
 import Layout from '@components/layout';
 import Header from '@components/header';
 
 import { Job } from '@lib/types';
 import { META_DESCRIPTION } from '@lib/constants';
 import styles from '../components/header.module.css';

 type Props = {
   jobs: Job[];
 };
 
 export default function LearnMore({ }: Props) {
   const meta = {
     title: 'Learn More - Open Components Hackathon',
     description: META_DESCRIPTION
   };
 
  return (
    <Page meta={meta}>
      <Layout>
        <Header hero="Learn More" description={meta.description} />
        <p className={styles['learn-more-description']}>
          unfoldingWord invites you to join our first Open Components Hackathon from Feb 28 till Mar 3, 2022 with a learner focused pre-event from Feb 21 till Feb 25. We will be focused on identifying and developing solutions for challenges within Bible translation. We hope this hackathon will inspire breakthrough ideas that help accelerate the global Bible translation efforts.
        </p>
        <p className={styles['learn-more-description']}>
          The vision of the Open Components Ecosystem is a global community of Bible technologists focused on creating open source modular and reusable Bible software.The reuse of Open components in a decentralized and collaborative model of development will lead to innovative and creative technologies that will further equip the global church to produce, distribute, and use Bible translations and biblical content in any language,on any technology, and in any format needed. We would love for you to join this growing community and explore Bible technology in collaboration with others.
        </p>
      </Layout>
    </Page>
   );
 }
