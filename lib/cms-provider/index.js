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

import { richTextAsText, getLinkUrl } from "./utils";

const API_REF_URL = `https://${process.env.PRISMIC_REPO_ID}.prismic.io/api/v2`;
const API_URL = `https://${process.env.PRISMIC_REPO_ID}.prismic.io/graphql`;
const API_TOKEN = process.env.PRISMIC_ACCESS_TOKEN || "";

async function fetchCmsMasterRef() {
  const res = await fetch(`${API_REF_URL}${API_TOKEN ? `?access_token=${API_TOKEN}` : ""}`);

  const json = await res.json();
  if (json.errors) {
    // eslint-disable-next-line no-console
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }

  const masterVersion = json.refs?.find((apiVersion) => apiVersion.id === "master") || null;
  const masterRef = masterVersion?.ref || null;

  return masterRef;
}

async function fetchCmsAPI(query) {
  const masterRef = await fetchCmsMasterRef();

  const res = await fetch(`${API_URL}?query=${encodeURIComponent(query)}`, {
    headers: {
      "Prismic-Ref": `${masterRef}`,
      Authorization: `Token ${API_TOKEN}`
    }
  });

  const json = await res.json();
  if (json.errors) {
    // eslint-disable-next-line no-console
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }

  return json.data;
}

export async function getStages() {
  const data = await fetchCmsAPI(`
    {
      allExperiences(uid: "catalyst-event-2021", lang: "en-us") {
        edges {
          node {
            body {
              ... on ExperienceBodyStages {
                fields {
                  stage {
                    ... on Stage {
                      _meta {
                        uid
                      }
                      name
                      stream {
                        ... on _ExternalLink {
                          url
                        }
                      }
                      chat_link {
                        ... on _ExternalLink {
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
    }  
  `);

  const reformattedData = data.allExperiences.edges[0].node.body[3].fields.map(({ stage }) => {
    return {
      name: stage.name,
      stream: getLinkUrl(stage.stream),
      chat_link: getLinkUrl(stage.chat_link)
    };
  });

  return reformattedData;
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
                      speaker {
                        ... on Speaker{
                          first_name
                          last_name
                          tagline
                          image
                        }
                      }
                      is_speaker
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
      speaker: event.is_speaker
        ? {
            name: `${event.speaker.first_name} ${event.speaker.last_name}`,
            tagline: event.speaker.tagline,
            image: event.speaker.image
          }
        : null
    };
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
        url: speaker.image?.url.replace("compress,format", "format") || "https://images.prismic.io"
      }
    };
  });

  return reformattedData;
}

export async function getInnovators() {
  const data = await fetchCmsAPI(`
    {
      allExperiences(uid: "catalyst-event-2021", lang: "en-us") {
        edges {
          node {
            name
            date
            body {
              ... on ExperienceBodyInnovators {
                fields {
                  innovator {
                    ... on Innovator {
                      _meta {
                        uid
                      }
                      company
                      innovators {
                        image
                        first_name
                        last_name
                        individual_tagline
                      }
                      tagline
                      bio
                      website {
                        ... on _ExternalLink {
                          url
                        }
                      }
                      companyLogo
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

  const reformattedData = data.allExperiences.edges[0].node.body[2].fields.map(({ innovator }) => {
    return {
      slug: innovator._meta.uid,
      company: innovator.company,
      tagline: richTextAsText(innovator.tagline),
      bio: richTextAsText(innovator.bio),
      website: innovator.website.url,
      image: {
        url: innovator.companyLogo?.url.replace("compress,format", "format") || "https://images.prismic.io",
        alt: innovator.companyLogo?.alt
      },
      people: innovator.innovators.map((innovator) => ({
        name: `${innovator.first_name} ${innovator.last_name}`,
        tagline: innovator.individual_tagline,
        image: {
          url: innovator.image?.url.replace("compress,format", "format") || "https://images.prismic.io",
          alt: innovator.image?.alt
        }
      }))
    };
  });

  return reformattedData;
}
