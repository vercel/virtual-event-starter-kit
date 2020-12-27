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

  const masterVersion = json.refs?.find((apiVersion) => apiVersion.id === 'master') || null;
  const masterRef = masterVersion?.ref || null;

  return masterRef;
}

async function fetchCmsAPI(query) {
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

export async function getSchedule() {
  const data = await fetchCmsAPI(`
    {
      allExperiences(uid: "catalyst-event-2021", lang: "en-us") {
        edges {
          node {
            name
            date
            body {
              ... on ExperienceBodyEvent {
                fields {
                  event {
                    ... on Event {
                      title
                      start_time
                      end_time
                      announcement
                      blurb
                      is_speaker
                      speaker_description
                      speaker_photo
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

  const reformattedData = data.allExperiences.edges[0].node.body[1].fields.map(({ event }) => {
    return {
      title: event.title,
      startTime: event.start_time,
      endTime: event.end_time,
      announcement: event.announcement,
      blurb: event.blurb,
      speaker: event.is_speaker ? { description: event.speaker_description, image: event.speaker_photo } : null,
    }
  });

  return reformattedData;
}

export async function getSpeakers() {
  const data = await fetchCmsAPI(`
    {
      allExperiences(uid: "catalyst-event-2021", lang: "en-us") {
        edges {
          node {
            body {
              ... on ExperienceBodySpeakers {
                fields {
                  speaker {
                    ... on Speaker {
                      _meta {
                        uid
                      }
                      email
                      first_name
                      last_name
                      tagline
                      biography
                      website {
                        ... on _ExternalLink {
                          url
                        }
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
  `);

  const reformattedData = data.allExperiences.edges[0].node.body[0].fields.map(({ speaker }) => {
    return {
      slug: speaker._meta.uid,
      name: `${speaker.first_name} ${speaker.last_name}`,
      email: speaker.email,
      bio: richTextAsText(speaker.biography),
      tagline: speaker.tagline,
      website: getLinkUrl(speaker.website),
      image: {
        url: speaker.image?.url.replace('compress,format', 'format') || 'https://images.prismic.io'
      },
    };
  });

  return reformattedData;
}

export async function getAllSponsors() {
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

  const reformatedData = data.allCompanys.edges.map((edge) => {
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
      links: edge.node.links.map((item) => ({
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
