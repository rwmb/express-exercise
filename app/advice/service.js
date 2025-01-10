import nconf from 'nconf';
import axios from 'axios';

import * as adviceModel from './model';

const ENDPOINT =
  nconf.get('ADVICE_API_ENDPOINT') || 'https://api.adviceslip.com'; // leaving here for the meeting

const searchAdviceEndpoint = ENDPOINT + '/advice/search/';

/**
 * Get advice from a word from the advice API
 * @param {string} word The word used to get the advice
 * @returns {Promise<{id: string, advice: string}>} The advice object
 */
const getAdviceFromWord = async (word) => {
  try {
    const api = new URL(word, searchAdviceEndpoint);
    const response = await axios.get(api.toString());
    console.log('response', response.data);
    const advice = response.data?.slips?.[0]; // Get the first advice for now
    console.log('advice', advice);
    return advice;
  } catch (err) {
    if (err.status === 404) {
      throw {
        errorId: 'ADVICE_NOT_FOUND',
        statusCode: 404,
        message: `Advice not found for word: ${word}`,
      };
    }

    throw err;
  }
};

/**
 * Store an advice in the database
 * @param {object} advice The advice object to store
 * @returns {Promise<object>} The inserted advice
 */
const storeAdvice = async (advice) => {
  // make necessary data mutations here
  return adviceModel.insertAdvice(advice);
};

/**
 * Get and store an advice from a query word
 * @param {string} query The query word
 * @returns {Promise<object>} The advice object
 */
const getAndStoreAdvice = async (query) => {
  if (!query || typeof query !== 'string' || !query.trim()) {
    throw {
      errorId: 'QUERY_WORD_REQUIRED',
      statusCode: 400,
      message: 'Query word is required',
    };
  }

  const advice = await getAdviceFromWord(query);

  await storeAdvice({
    api_id: advice.id,
    advice: advice.advice,
    query: query,
  });

  return advice;
};

export { getAndStoreAdvice };
