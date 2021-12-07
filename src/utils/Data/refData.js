import { default as areYouACivilServantJSON } from '../../json/areYouACivilServant.json';
import { default as gradeJSON } from '../../json/grade.json';
import { default as teamJSON } from '../../json/team.json';

/**
 * Cache the return values from the ref data calls.
 * TODO: This is currently using local JSON for testing and Storybook purposes
 * but it should make calls to remote endpoints instead.
 */
const cache = {
  areYouACivilServant: areYouACivilServantJSON.data,
  grade: gradeJSON.data,
  team: teamJSON.data
};

/**
 * Get reference data from a remote URL and cache it. If the URL has already been
 * cached, return that immediately, otherwise await the result from the endpoint
 * and then return it.
 * @param {string} url The URL of the remote endpoint from which to fetch the data.
 * @returns An array of data items.
 */
export const getRefData = (url) => {
  const endpoint = url.split('/').pop();
  return cache[endpoint] || [];
};

/**
 * Get a specific item name from the reference data. Note that this will first get
 * the reference data from the cache or remote endpoint and then attempt to find the
 * item by ID from the data items returned.
 * @param {*} url The URL of the remote endpoint from which the data should be fetched.
 * @param {*} id The id of the data item.
 * @returns The name of the found item (or an empty string if not found).
 */
export const getRefDataItemName = (url, id) => {
  const options = getRefData(url);
  const item = options.find(opt => opt.id === id);
  return item ? item.name : '';
};

export default getRefData;
