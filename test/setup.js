import nock from 'nock';
import 'config/init';

import './helpers/nockAdviceAPI';

nock.disableNetConnect();
nock.enableNetConnect((host) => host.startsWith('127.0.0.1'));
