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
const IMAGE_API_URL = process.env.STRAPI_API_URL;

interface Image {
  url?: string;
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

/**
 * The default image url will be '/uploads/...
 * Here we add the IMAGE_API_URL prefix to allow locally stored assets to be displayed
 * @param image
 * @return image object with serialized url
 */
function serializeImage(image: Image) {
  if (!image?.url) return null;
  const imageUrl: string = image.url.startsWith('http')
    ? image.url
    : `${IMAGE_API_URL}${image.url}`;

  return {
    ...image,
    sizes: '',
    url: imageUrl
  };
}

/**
 * @param speaker
 * @returns speaker object with serialized image
 */
function serializeSpeaker(speaker: Speaker) {
  return {
    ...speaker,
    image: {
      ...speaker.image,
      ...serializeImage(speaker.image)
    }
  };
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

  return data.speakers.map(serializeSpeaker);
}

export async function getAllStages(): Promise<Stage[]> {
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

  return data.stages.map((stage: Stage) => ({
    ...stage,
    schedule: stage.schedule.map(talk => ({
      ...talk,
      speaker: talk.speaker.map(serializeSpeaker)
    }))
  }));
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

  return data.sponsors.map((sponsor: Sponsor) => ({
    ...sponsor,
    cardImage: {
      ...sponsor.cardImage,
      ...serializeImage(sponsor.cardImage)
    },
    logo: {
      ...sponsor.cardImage,
      ...serializeImage(sponsor.cardImage)
    }
  }));
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

  return data.jobs;
}
