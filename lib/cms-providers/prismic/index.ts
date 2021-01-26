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
import { richTextAsText, getLinkUrl } from './utils';

const API_REF_URL = `https://${process.env.PRISMIC_REPO_ID}.prismic.io/api/v2`;
const API_URL = `https://${process.env.PRISMIC_REPO_ID}.prismic.io/graphql`;
const API_TOKEN = process.env.PRISMIC_ACCESS_TOKEN || '';

async function fetchCmsMasterRef() {
  const res = await fetch(`${API_REF_URL}${API_TOKEN ? `?access_token=${API_TOKEN}` : ''}`);

  const json = await res.json();
  if (json.errors) {
    // eslint-disable-next-line no-console
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }

  const masterVersion = json.refs?.find((apiVersion: any) => apiVersion.id === 'master') || null;
  const masterRef = masterVersion?.ref || null;

  return masterRef;
}

async function fetchCmsAPI(query: string, { variables }: { variables?: Record<string, any> } = {}) {
  const masterRef = await fetchCmsMasterRef();

  const res = await fetch(`${API_URL}?query=${encodeURIComponent(query)}`, {
    headers: {
      'Prismic-Ref': `${masterRef}`,
      Authorization: `Token ${API_TOKEN}`
    }
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
      allSpeakers(first: 100) {
        edges {
          node {
            name
            bio
            title
            twitter {
              _linkType
              ...on _ExternalLink {
                url
              }
            }
            github {
              _linkType
              ...on _ExternalLink {
                url
              }
            }
            company
            image
            talk {
              _linkType
              ...on  Talk{
                title
                description
              }
            }
            _meta {
              uid
            }
          }
        }
      }
    }
  `);

  const reformatedData = data.allSpeakers.edges.map((edge: any) => {
    return {
      name: richTextAsText(edge.node.name),
      bio: richTextAsText(edge.node.bio),
      slug: edge.node._meta.uid,
      title: richTextAsText(edge.node.title),
      twitter: getLinkUrl(edge.node.twitter),
      github: getLinkUrl(edge.node.github),
      company: richTextAsText(edge.node.company),
      image: {
        url:
          edge.node.image?.url.replace('compress,format', 'format') || 'https://images.prismic.io'
      },
      talk: {
        title: edge.node.talk?.title ? richTextAsText(edge.node.talk.title) : '',
        description: edge.node.talk?.description ? richTextAsText(edge.node.talk.description) : ''
      }
    };
  });

  return reformatedData;
}

export async function getAllStages(): Promise<Stage[]> {
  const data = await fetchCmsAPI(`
    {
      allStages(first: 100, sortBy: name_ASC) {
        edges {
          node {
            name
            _meta {
              uid
            }
            stream {
              _linkType
              ...on _ExternalLink {
                url
              }
            }
            discord {
              _linkType
              ...on _ExternalLink {
                url
              }
            }
            schedule {
              talk {
                _linkType
                ...on Talk {
                  title
                  start
                  end
                  speakers {
                    speaker {
                      ...on Speaker {
                        name
                        _meta {
                          uid
                        }
                        image
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

  const reformatedData = data.allStages.edges.map((edge: any) => {
    return {
      name: richTextAsText(edge.node.name),
      slug: edge.node._meta.uid,
      stream: getLinkUrl(edge.node.stream),
      discord: getLinkUrl(edge.node.discord),
      schedule: edge.node.schedule
        .filter((item: any) => item.talk)
        .map((item: any) => {
          if (item.talk)
            return {
              title: richTextAsText(item.talk.title),
              start: item.talk.start,
              end: item.talk.end,
              speaker: item.talk.speakers.map((item: any) => ({
                name: richTextAsText(item.speaker.name),
                slug: item.speaker._meta.uid,
                image: {
                  url:
                    item.speaker.image?.url.replace('compress,format', 'format') ||
                    'https://images.prismic.io'
                }
              }))
            };
        })
    };
  });

  return reformatedData;
}

export async function getAllSponsors(): Promise<Sponsor[]> {
  const data = await fetchCmsAPI(`
    {
      allCompanys(first: 100, sortBy: tier_rank_ASC) {
        edges {
          node {
            name
            description
            _meta {
              uid
            }
            website {
              _linkType
              ...on _ExternalLink {
                url
              }
            }
            call_to_action
            call_to_action_link {
              _linkType
              ...on _ExternalLink {
                url
              }
            }
            discord {
              _linkType
              ...on _ExternalLink {
                url
              }
            }
            youtube_slug
            tier
            links {
              link {
                _linkType
                ...on _ExternalLink {
                  url
                }
              }
              link_text
            }
            card_image
            logo
          }
        }
      }
    }
  `);

  const reformatedData = data.allCompanys.edges.map((edge: any) => {
    return {
      name: richTextAsText(edge.node.name),
      description: richTextAsText(edge.node.description),
      slug: edge.node._meta.uid,
      website: getLinkUrl(edge.node.website),
      callToAction: richTextAsText(edge.node.call_to_action),
      callToActionLink: getLinkUrl(edge.node.call_to_action_link),
      discord: getLinkUrl(edge.node.discord),
      youtubeSlug: edge.node.youtube_slug,
      tier: edge.node.tier,
      links: edge.node.links.map((item: any) => ({
        url: getLinkUrl(item.link),
        text: item.link_text
      })),
      cardImage: {
        url:
          edge.node.card_image?.url.replace('compress,format', 'format') ||
          'https://images.prismic.io'
      },
      logo: {
        url: edge.node.logo?.url.replace('compress,format', 'format') || 'https://images.prismic.io'
      }
    };
  });

  return reformatedData;
}

export async function getAllJobs(): Promise<Job[]> {
  const data = await fetchCmsAPI(`
    {
      allJobs(first: 100, sortBy: rank_ASC) {
        edges {
          node {
            _meta {
              id
            }
            company_name
            title
            description
            discord {
              _linkType
              ...on _ExternalLink {
                url
              }
            }
            link {
              _linkType
              ...on _ExternalLink {
                url
              }
            }
            rank
          }
        }
      }
    }
  `);

  const reformatedData = data.allJobs.edges.map((edge: any) => {
    return {
      id: edge.node._meta.id,
      companyName: richTextAsText(edge.node.company_name),
      title: richTextAsText(edge.node.title),
      description: richTextAsText(edge.node.description),
      discord: getLinkUrl(edge.node.discord),
      link: getLinkUrl(edge.node.link),
      rank: edge.node.rank
    };
  });

  return reformatedData;
}
