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
import { Job, Sponsor, Stage, Speaker } from '@lib/types';

const API_URL = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`;
const API_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;

async function fetchCmsAPI(query: string) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`
    },
    body: JSON.stringify({
      query
    })
  });

  const json = await res.json();
  if (json.errors) {
    // eslint-disable-next-line no-console
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }

  return json.data;
}

export async function getAllSpeakers(): Promise<Speaker[]> {
  const data = await fetchCmsAPI(`
    {
      speakerCollection {
        items {
          name
          bio
          title
          slug
          twitter
          github
          company
          talk {
            ... on Talk {
              title
              description
            }
          }
          image {
            url
          }
          imageSquare: image {
            url
          }
        }
      }
    }
  `);

  return data.speakerCollection.items.map((speaker: any) => speaker);
}

export async function getAllStages(): Promise<Stage[]> {
  const data = await fetchCmsAPI(`
    {
      stageCollection {
        items {
            name
            slug
            stream
            discord
            scheduleCollection(limit: 0) {
              items {
                ... on Talk {
                  title
                  start
                  end
                  speakerCollection(limit: 5) {
                    items {
                      ... on Speaker {
                      name
                      slug
                      image {
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  return data.stageCollection.items.reduce((allStages: any, stage: any) => {
    const schedule = stage.scheduleCollection.items.map((talk: any) => ({
      speaker: talk.speakerCollection.items.map((speaker: any) => speaker),
      ...talk
    }));
    return [{ schedule, ...stage }, ...(allStages || [])];
  }, []);
}

export async function getAllSponsors(): Promise<Sponsor[]> {
  const data = await fetchCmsAPI(`
    {
      companyCollection(order: tierRank_ASC, limit: 100) {
        items {
            sys {
              id
            }
            name
            description
            slug
            website
            callToAction
            callToActionLink
            discord
            youtubeSlug
            tier
            links 
            cardImage {
              url
            }
            logo {
              url
            }
        }
      }
    }
  `);

  return data.companyCollection.items.reduce((allSponsors: any, sponsor: any) => {
    return [{ id: sponsor.sys.id, ...sponsor }, ...(allSponsors || [])];
  }, []);
}

export async function getAllJobs(): Promise<Job[]> {
  const data = await fetchCmsAPI(`
    {
      jobCollection(order: rank_ASC, limit: 100) {
        items {
            sys {
              id
            }
            companyName
            title
            description
            discord
            link
            rank
        }
      }
    }
  `);

  return data.jobCollection.items.reduce((allJobs: any, job: any) => {
    return [{ id: job.sys.id, ...job }, ...(allJobs || [])];
  }, []);
}
