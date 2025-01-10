import nconf from 'nconf';
import nock from 'nock';

import adviceQueries from '../fixtures/adviceQueries.json';

const ENDPOINT =
  nconf.get('ADVICE_API_ENDPOINT') || 'https://api.adviceslip.com';

for (const nonExistentQuery of adviceQueries.nonexistent) {
  nock(ENDPOINT).get(`/advice/search/${nonExistentQuery}`).reply(404);
}

for (const validQuery of adviceQueries.valid) {
  nock(ENDPOINT)
    .get(`/advice/search/${validQuery}`)
    .reply(200, { slips: [{ id: 1, advice: 'Test your code' }] });
}
