/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
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

const API_URL = 'https://gapi.storyblok.com/v1/api';
const API_TOKEN = process.env.STORYBLOK_PREVIEW_TOKEN;

/**
 * This transformResponse() function can be removed if you're using the
 * Storyblok data directly. This transformation only happens to adapt the data
 * returned from the GraphQL api to the data structure used in the
 * starter so as not to have to modify the component files.
 */
function transformResponse(response: any[], _speakers?: any) {
  const content = response.map((r: any) => (r.content ? r.content : r));
  content.map((item: any) => {
    Object.keys(item).map(key => {
      // assign the urls directly if not an image
      const noAssign = ['image', 'logo', 'cardImage'];
      if (item[key].url && noAssign.indexOf(key) === -1) {
        item[key] = item[key].url;
      }

      // remove nesting from schedule and assign speakers
      if (key === 'schedule') {
        item[key] = item[key].map((slot: { content: any; speaker: any }) => {
          slot = slot.content;
          const speakers = _speakers?.filter(
            (speaker: any) => slot.speaker.indexOf(speaker.uuid) !== -1
          );
          slot.speaker = speakers;
          return slot;
        });
      }
    });
  });

  return content;
}

async function fetchCmsAPI(query: string, { variables }: { variables?: Record<string, any> } = {}) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Token: `${API_TOKEN}`
    },
    body: JSON.stringify({
      query,
      variables
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
    SpeakerItems(per_page: 100) {
      items {
        uuid
        content {
          name
          bio
          title
          slug
          twitter {
            url
          }
          github {
            url
          }
          company
          image {
            url: filename
          }
          talk {
            content
          }
        }
      }
    }
  }  
  `);

  const responseData = data.SpeakerItems.items.map((s: any) => {
    const speaker = s.content;
    speaker.talk = speaker.talk.content;
    speaker.uuid = s.uuid;
    return speaker;
  });
  const transformedData = transformResponse(responseData);
  return transformedData;
}

export async function getAllStages(): Promise<Stage[]> {
  const speakers = await getAllSpeakers();
  const data = await fetchCmsAPI(`
    {
      StageItems(per_page: 100) {
        items {
          content {
            name
            slug
            stream {
              url
            }
            discord {
              url
            }
            schedule {
              content
            }
          }
        }
      }
    }
  `);

  const transformedData = transformResponse(data.StageItems.items, speakers);
  return transformedData;
}

export async function getAllSponsors(): Promise<Sponsor[]> {
  const data = await fetchCmsAPI(`
  {
    CompanyItems(per_page: 100) {
      items {
        content {
          name
          description
          slug
          website {
            url
          }
          callToAction
          callToActionLink {
            url
          }
          discord {
            url
          }
          youtubeSlug
          tier
          links
          cardImage {
            url: filename
          }
          logo {
            url: filename
          }
        }
      }
    }
  }  
  `);

  const transformedData = transformResponse(data.CompanyItems.items);
  return transformedData;
}

export async function getAllJobs(): Promise<Job[]> {
  const data = await fetchCmsAPI(`
    {
      JobItems(per_page: 100) {
        items {
          content {
            companyName
            title
            description
            discord {
              url
            }
            link {
              url
            }
            rank
          }
        }
      }
    }
  `);

  const transformedData = transformResponse(data.JobItems.items);
  return transformedData;
}
