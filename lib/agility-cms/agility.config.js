/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
const agilityContentSync = require('@agility/content-sync')
const agilityFileSystem = require("@agility/content-sync/src/store-interface-filesystem")



const agilityConfig = {
	guid: process.env.AGILITY_GUID, //Set your guid here
	fetchAPIKey: process.env.AGILITY_API_FETCH_KEY, //Set your fetch apikey here
	previewAPIKey: process.env.AGILITY_API_PREVIEW_KEY, //set your preview apikey
	languageCode: 'en-us', //the language for your website in Agility CMS
	channelName: 'website', //the name of your channel in Agility CMS
	securityKey: process.env.AGILITY_SECURITY_KEY //the website security key used to validate and generate preview keys
}

const getSyncClient = (context) => {

	let { isPreview, isDevelopmentMode } = context || {}

	if (isDevelopmentMode === undefined) {
		isDevelopmentMode = process.env.NODE_ENV === "development"
	}

	if (isPreview === undefined) {
		isPreview = isDevelopmentMode
	}

	let cachePath = `node_modules/@agility/content-sync/cache/${isPreview ? 'preview' : 'live'}`

	if (!isDevelopmentMode) {
		//we are in prod and need to use a different directory that Vercel understands
		cachePath = `/tmp/agilitycache/${isPreview ? 'preview' : 'live'}`
	}

	const apiKey = isPreview ? agilityConfig.previewAPIKey : agilityConfig.fetchAPIKey

	if (!agilityConfig.guid) {
		console.log("Agility CMS => No GUID was provided.")
		return null
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
	})

	return client
}

/**
 * Get the Agility CMS client and do a sync.
 */
const syncContentAndGetClient = async (context) => {


	const client = getSyncClient(context)


	//if we are in local development mode, then just return the cms client
	// const isDevelopmentMode = process.env.NODE_ENV === "development"
	// if (isDevelopmentMode) {
	// 	return client.store
	// }


	/*******************
	 * PRODUCTION MODE *
	 *******************/

	//if if we have a context to work with (from static regen or preview mode)
	await client.runSync()

	return client.store

}


module.exports = {
	agilityConfig,
	getSyncClient,
	syncContentAndGetClient
}
