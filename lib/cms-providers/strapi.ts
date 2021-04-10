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

const API_URL = `${process.env.STRAPI_API_URL}/graphql`;

/**
 * This transformResponse() function can be removed if you're using the
 * Strapi data directly. This transformation only happens to adapt the data
 * returned from the GraphQL api to the data structure used in the
 * starter so as not to have to modify the component files.
 */
function transformResponse(response: any[], _speakers?: any) {
  response.map((item: any) => {
    Object.keys(item).map(key => {
      // assign the urls directly if not an image
      const noAssign = ['image', 'logo', 'cardImage'];
      if (item[key]?.url && noAssign.indexOf(key) === -1) {
        item[key] = item[key].url;
      }
    });
  });

  return response;
}

async function fetchCmsAPI(query: string, { variables }: { variables?: Record<string, any> } = {}) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
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
    speakers {
      id
      title
      company
      bio
      slug
      name
      image {
        alternativeText
        width
        height
        url
        size
        formats
      }
      twitter
      github
      talk {
        id
        title
        start
        end
        description
      }   
    }
  }  
  `);

  const transformedData = transformResponse(data.speakers);
  return transformedData;
}

export async function getAllStages(): Promise<Stage[]> {
  const speakers = await getAllSpeakers();
  const data = await fetchCmsAPI(`
    {
      stages {
        id
        name
        slug
        stream
        order
        discord
        schedule(sort: "start:asc") {
          id
          title
          start
          end
          description
          speaker: speakers {
            id
            slug
            title
            bio
            name
            image {
              alternativeText
              width
              height
              url
              size
              formats
            }
            twitter
            github
            company
          }
        }
      }
    }
  `);

  const transformedData = transformResponse(data.stages, speakers);
  return transformedData;
}

export async function getAllSponsors(): Promise<Sponsor[]> {
  const data = await fetchCmsAPI(`
  {
    sponsors {
      id
      slug
      name
      website
      description
      callToAction
      callToActionLink
      discord
      links {
        text
        url
      }
      youtubeSlug
      tier
      tierRank
      cardImage {
        alternativeText
        width
        height
        url
      }
      logo {
        alternativeText
        width
        height
        url
        size
        formats
      }
    }
  }  
  `);

  const transformedData = transformResponse(data.sponsors);
  return transformedData;
}

export async function getAllJobs(): Promise<Job[]> {
  const data = await fetchCmsAPI(`
    {
      jobs {
        id
        companyName
        title
        description
        link
        discord
        rank
      }
    }
  `);

  const transformedData = transformResponse(data.jobs);
  return transformedData;
}
