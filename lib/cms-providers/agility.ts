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
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-var-requires */

const agilityContentSync = require('@agility/content-sync');
const agilityFileSystem = require('@agility/content-sync/src/store-interface-filesystem');

import { Job, Speaker, Sponsor, Stage } from '../types';

const agilityConfig = {
  guid: process.env.AGILITY_GUID,
  fetchAPIKey: process.env.AGILITY_API_FETCH_KEY,
  previewAPIKey: process.env.AGILITY_API_PREVIEW_KEY,
  languageCode: 'en-us',
  channelName: 'website',
  securityKey: process.env.AGILITY_SECURITY_KEY
};

export async function getAllSpeakers(): Promise<Speaker[]> {
  const agility = await syncContentAndGetClient(null);
  const speakers = await agility.getContentList({
    referenceName: 'speakers',
    languageCode: agilityConfig.languageCode
  });
  const schedule = await agility.getContentList({
    referenceName: 'schedule',
    languageCode: agilityConfig.languageCode
  });
  const languageCode = agilityConfig.languageCode;

  const lst: Speaker[] = [];

  await asyncForEach(speakers, async (speaker: any) => {
    speaker = await expandContentItem({ agility, contentItem: speaker, languageCode, depth: 1 });

    const talks = schedule
      .filter((t: any) => {
        return `,${t.fields.speakerIDs},`.indexOf(`,${speaker.contentID},`) !== -1;
      })
      .map((t: any) => {
        return {
          title: t.fields.name,
          description: t.fields.description
        };
      });

    const talk = (talks || []).length > 0 ? talks[0] : null;

    lst.push({
      name: speaker.fields.name,
      title: speaker.fields.title,
      bio: speaker.fields.bio,
      slug: speaker.fields.slug,
      twitter: speaker.fields.twitter,
      github: speaker.fields.github,
      company: speaker.fields.company.fields.name,
      image: {
        url: `${speaker.fields.image.url}?w=300&h=400&c=1`
      },
      imageSquare: {
        url: `${speaker.fields.image.url}?w=192&h=192&c=1`
      },
      talk
    });
  });

  return lst.sort((a, b) => (a.name > b.name ? 1 : -1));
}

export async function getAllStages(): Promise<Stage[]> {
  const agility = await syncContentAndGetClient(null);
  const languageCode = agilityConfig.languageCode;
  const stages = await agility.getContentList({ referenceName: 'stages', languageCode });
  await expandContentList({ agility, contentItems: stages, languageCode, depth: 2 });

  const lst: Stage[] = stages
    .sort((a: any, b: any) => (a.properties.itemOrder > b.properties.itemOrder ? 1 : -1))
    .map((stage: any) => {
      const schedule: any[] = stage.fields.schedule?.map((talk: any) => {
        return {
          title: talk.fields.name,
          start: talk.fields.start,
          end: talk.fields.end,
          speaker: talk.fields.speaker?.map((speaker: any) => {
            return {
              name: speaker.fields.name,
              slug: speaker.fields.slug,
              image: {
                url: `${speaker.fields.image.url}?w=120&h=120&c=1`
              }
            };
          })
        };
      });

      return {
        name: stage.fields.name,
        slug: stage.fields.slug,
        stream: stage.fields.stream,
        discord: stage.fields.discord,
        schedule
      };
    });

  return lst;
}

export async function getAllSponsors(): Promise<Sponsor[]> {
  const agility = await syncContentAndGetClient(null);
  const languageCode = agilityConfig.languageCode;

  let companies = await agility.getContentList({
    referenceName: 'companies',
    languageCode: agilityConfig.languageCode
  });
  companies = companies.sort((a: any, b: any) => (a.fields.tierRank > b.fields.tierRank ? 1 : -1));

  const lst: Sponsor[] = [];
  await asyncForEach(companies, async (company: any) => {
    company = await expandLinkedList({
      agility,
      contentItem: company,
      languageCode,
      fieldName: 'links',
      sortIDField: null,
      excludeNonSortedIds: false
    });

    let links = [];

    if (company.fields.links) {
      links = company.fields.links.map((link: any) => {
        return {
          url: link.fields.link.href,
          text: link.fields.link.text
        };
      });
    }

    lst.push({
      name: company.fields.name,
      discord: company.fields.discord,
      slug: company.fields.slug,
      website: company.fields.website,
      callToAction: company.fields.callToAction.text,
      callToActionLink: company.fields.callToAction.href,
      youtubeSlug: company.fields.youtubeSlug,
      tier: company.fields.tier,
      description: company.fields.description,
      cardImage: {
        url: `${company.fields.cardImage.url}`
      },
      logo: {
        url: `${company.fields.logo.url}`
      },
      links
    });
  });

  return lst;
}

export async function getAllJobs(): Promise<Job[]> {
  const agility = await syncContentAndGetClient(null);
  const languageCode = agilityConfig.languageCode;
  let jobs = await agility.getContentList({
    referenceName: 'jobs',
    languageCode: agilityConfig.languageCode
  });

  jobs = jobs.sort((a: any, b: any) => (a.fields.rank > b.fields.rank ? 1 : -1));

  await expandContentList({ agility, contentItems: jobs, languageCode, depth: 1 });

  return jobs
    .map((job: any) => {
      return {
        id: job.contentID,
        companyName: job.fields.company?.fields.name,
        title: job.fields.name,
        description: job.fields.description,
        discord: job.fields.discord,
        link: job.fields.link,
        rank: parseInt(job.fields.rank)
      };
    })
    .sort((a: any, b: any) => (a.rank > b.rank ? 1 : -1));
}

const getSyncClient = (context: any) => {
  let { isPreview, isDevelopmentMode } = context || {};

  if (isDevelopmentMode === undefined) {
    isDevelopmentMode = process.env.NODE_ENV === 'development';
  }

  if (isPreview === undefined) {
    isPreview = isDevelopmentMode;
  }

  const apiKey = isPreview ? agilityConfig.previewAPIKey : agilityConfig.fetchAPIKey;

  if (!agilityConfig.guid) {
    console.log('Agility CMS => No GUID was provided.');
    return null;
  }

  let cachePath = `node_modules/@agility/content-sync/cache/${agilityConfig.guid}/${
    isPreview ? 'preview' : 'live'
  }`;

  if (!isDevelopmentMode) {
    cachePath = `/tmp/agilitycache/${agilityConfig.guid}/${isPreview ? 'preview' : 'live'}`;
  }

  const client = agilityContentSync.getSyncClient({
    guid: agilityConfig.guid,
    apiKey: apiKey,
    isPreview: isPreview,
    languages: [agilityConfig.languageCode],
    channels: [agilityConfig.channelName],
    store: {
      interface: agilityFileSystem,
      options: {
        rootPath: cachePath
      }
    }
  });

  return client;
};

const syncContentAndGetClient = async (context: any) => {
  const client = getSyncClient(context);

  await client.runSync();

  return client.store;
};

const expandContentList = async ({
  agility,
  contentItems,
  languageCode,
  depth
}: {
  agility: any;
  contentItems: any;
  languageCode: string;
  depth: number;
}) => {
  await asyncForEach(contentItems, async (contentItem: any) => {
    await expandContentItem({ agility, contentItem, languageCode, depth });
  });
};

const expandContentItem = async ({
  agility,
  contentItem,
  languageCode,
  depth = 1
}: {
  agility: any;
  contentItem: any;
  languageCode: string;
  depth: number;
}) => {
  if (!contentItem) return null;

  const api = agility;

  if (depth > 0) {
    let fields = contentItem.fields;
    if (!fields) fields = contentItem.customFields;

    for (const fieldName in fields) {
      const fieldValue = fields[fieldName];

      if (fieldValue.contentid > 0) {
        const childItem = await api.getContentItem({
          contentID: fieldValue.contentid,
          languageCode,
          depth: depth - 1
        });
        if (childItem != null) fields[fieldName] = childItem;
      } else if (fieldValue.sortids && fieldValue.sortids.split) {
        const sortIDAry = fieldValue.sortids.split(',');
        const childItems = [];

        for (const childItemID of sortIDAry) {
          const childItem = await api.getContentItem({
            contentID: childItemID,
            languageCode,
            depth: depth - 1
          });
          if (childItem != null) childItems.push(childItem);
        }
        fields[fieldName] = childItems;
      }
    }
  }
  return contentItem;
};

const expandLinkedList = async ({
  agility,
  contentItem,
  languageCode,
  fieldName,
  sortIDField = null,
  excludeNonSortedIds = false
}: {
  agility: any;
  contentItem: any;
  languageCode: string;
  fieldName: string;
  sortIDField: string | null;
  excludeNonSortedIds: boolean;
}) => {
  if (!contentItem) return null;

  const fieldObj = contentItem.fields[fieldName];
  if (!fieldObj) {
    contentItem.fields[fieldName] = [];
    return contentItem;
  }

  const referenceName = fieldObj.referencename;
  if (!referenceName)
    throw Error(`A referencename property was not found on the ${fieldName} value.`);

  let listItems = await agility.getContentList({ referenceName, languageCode });
  if (listItems?.length > 0) {
    if (sortIDField) {
      const sortIDs = contentItem.fields[sortIDField];

      if (sortIDs?.length > 0 && sortIDs?.split) {
        const sortIDAry = sortIDs.split(',');
        const sortedItems = [];

        for (const idStr of sortIDAry) {
          const childContentID = parseInt(idStr);

          const childItemIndex = listItems.findIndex(
            (item: { contentID: number }) => item.contentID === childContentID
          );

          if (childItemIndex >= 0) {
            sortedItems.push(listItems[childItemIndex]);
            listItems.splice(childItemIndex, 1);
          }
        }

        if (excludeNonSortedIds !== true) {
          listItems = sortedItems.concat(listItems);
        } else {
          listItems = sortedItems;
        }
      }
    }
  }

  contentItem.fields[fieldName] = listItems;
  return contentItem;
};

const asyncForEach = async (array: any, callback: any) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};
