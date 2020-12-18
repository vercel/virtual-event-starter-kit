/*
THIS FILE IS ONLY EXECUTED LOCALLY
WHEN DOING A LOCAL SYNC ON DEMAND
IN DEVELOPMENT MODE
*/

require("dotenv").config({
	path: `.env.local`,
})

const { syncContentAndGetClient, getSyncClient } = require('./agility.config')
/**
 * Run a sync in the current mode.
 */
const runSync = async () => {

	const isDevelopmentMode = isPreview = process.env.NODE_ENV === "development"

	let agilitySyncClient = getSyncClient({ isPreview, isDevelopmentMode })
	await agilitySyncClient.runSync();
}
/**
 * Clear out the sync in both dev and live modes.
 */
const clearSync = async () => {

	//clear preview mode first
	let agilitySyncClient = getSyncClient({ isPreview: true, isDevelopmentMode: true })
	if (! agilitySyncClient) {
		console.log("Agility CMS => Sync client could not be accessed.")
		return;
	}
	await agilitySyncClient.clearSync();


	//clear live mode last
	agilitySyncClient = getSyncClient({ isPreview: false })
	await agilitySyncClient.clearSync();

}


if (process.argv[2]) {
	if (process.argv[2] === "clear") {
		//clear everything
		return clearSync();
	} else if (process.argv[2] === "sync") {
		//run the sync
		return runSync()

	}
}

module.exports = {
	clearSync,
	runSync
}