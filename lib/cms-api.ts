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

import { agilityConfig, syncContentAndGetClient } from './agility-cms/agility.config'
import { asyncForEach, expandContentItem, expandContentList, expandLinkedList } from "./agility-cms/agility.utils"
import { Job, Speaker, Sponsor, Stage } from "./types"

/**
 * Get the list of speakers, sorted by name.
 *
 * @export
 * @returns {Promise<Speaker[]>}
 */
export async function getAllSpeakers ():Promise<Speaker[]> {

	const agility = await syncContentAndGetClient(null)
	let speakers = await agility.getContentList({ referenceName: "speakers", languageCode: agilityConfig.languageCode })
	const schedule = await agility.getContentList({ referenceName: "schedule", languageCode: agilityConfig.languageCode })
	const languageCode = agilityConfig.languageCode

	const lst:Speaker[] = []

	await asyncForEach(speakers, async (speaker:any) => {
		//expand out the talks on this stage...
		//speaker = await expandLinkedList({ agility, contentItem: speaker, fieldName: "talk", languageCode, sortIDField: "talkIDs", excludeNonSortedIds: true  })

		speaker = await expandContentItem({agility, contentItem: speaker, languageCode})


		//find any talks that this speaker is on...
		const talks = schedule
						.filter((t:any) => {
							return `,${ t.fields.speakerIDs},`.indexOf(`,${speaker.contentID},`) !== -1
						})
						.map((t:any) => {
							return {
								title: t.fields.name,
								description: t.fields.description
							}
						})
		//the speaker could have multiple talks - this just picks the first one
		//TODO: show ALL of the talks the speaker has...
		const talk = (talks || []).length > 0 ? talks[0] : null


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
		})
	})

	//return speakers sorted by name
	return lst.sort((a, b) => a.name > b.name ? 1 : -1)
}

/**
 * Return the list of stages, sorted to match the ordering in the CMS.
 *
 * @export
 * @returns {Promise<Stage[]>}
 */
export async function getAllStages():Promise<Stage[]> {

	const agility = await syncContentAndGetClient(null)
	const languageCode = agilityConfig.languageCode
	const stages = await agility.getContentList({ referenceName: "stages", languageCode,  })
	await expandContentList({agility, contentItems: stages, languageCode, depth: 2})


	const lst: Stage[] = stages
		.sort((a:any, b:any) => a.properties.itemOrder > b.properties.itemOrder ? 1 : -1)
		.map((stage:any) => {

		 const schedule:any[] = stage.fields.schedule?.map((talk:any) => {

			return {
				title: talk.fields.name,
				start: talk.fields.start,
				end: talk.fields.end,
				speaker: talk.fields.speaker?.map((speaker:any) => {
					return {
						name: speaker.fields.name,
						slug: speaker.fields.slug,
						image: {
							url: `${speaker.fields.image.url}?w=120&h=120&c=1`
						}
					}
				})
			}

		 })

		return {
			name: stage.fields.name,
			slug: stage.fields.slug,
			stream: stage.fields.stream,
			discord: stage.fields.discord,
			schedule
		}
	})

	return lst

}
/**
 * Get the list of sponsor companies, sorted by their Tier Rank.
 *
 * @export
 * @returns {Promise<Sponsor[]>}
 */
export async function getAllSponsors():Promise<Sponsor[]> {

	const agility = await syncContentAndGetClient(null)
	const languageCode = agilityConfig.languageCode

	let companies = await agility.getContentList({ referenceName: "companies", languageCode: agilityConfig.languageCode })
	companies = companies.sort((a:any, b:any) => a.fields.tierRank > b.fields.tierRank ? 1 : -1)

	const lst:Sponsor[] = []
	await asyncForEach(companies, async (company:any) => {
		company = await expandLinkedList({agility, contentItem: company, languageCode,  fieldName: "links" })

		let links =[]

		if (company.fields.links) {
			links = company.fields.links.map((link:any) => {
				return {
					url: link.fields.link.href,
					text: link.fields.link.text
				}
			})
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
		})

	})

	return lst
}
/**
 * Get the list of jobs, sorted by rank.
 *
 * @export
 * @returns {Promise<Job[]>}
 */
export async function getAllJobs():Promise<Job[]> {

	const agility = await syncContentAndGetClient(null)
	const languageCode = agilityConfig.languageCode
	let jobs = await agility.getContentList({ referenceName: "jobs", languageCode: agilityConfig.languageCode })

	jobs = jobs.sort((a:any, b:any) => a.fields.rank > b.fields.rank ? 1 : -1)

	await expandContentList({agility, contentItems:jobs, languageCode, depth: 1})

	return jobs.map((job:any) => {
		return {
			id: job.contentID,
			companyName: job.fields.company?.fields.name,
			title: job.fields.name,
			description: job.fields.description,
			discord: job.fields.discord,
			link: job.fields.link,
			rank: parseInt(job.fields.rank)
		}
	}).sort((a:any, b:any) => a.rank > b.rank ? 1 : -1)
}
