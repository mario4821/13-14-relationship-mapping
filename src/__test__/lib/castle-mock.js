'use strict';

import faker from 'faker';
import Castle from '../../model/castle';

const pCreateMockCastle = () => {
  return new Castle({
    style: faker.lorem.words(10),
    family: faker.lorem.words(10),
    kingdom: faker.lorem.words(10),
  }).save();
};

const pRemoveMockCastle = () => Castle.remove({});

export { pCreateMockCastle, pRemoveMockCastle };
