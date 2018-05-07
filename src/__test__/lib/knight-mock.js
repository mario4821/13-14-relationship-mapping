'use strict';

import faker from 'faker';
import Knight from '../../model/knight';
import { pCreateMockCastle, pRemoveMockCastle } from './castle-mock';

const pCreateMockKnight = () => {
  const resultMock = {};

  return pCreateMockCastle()
    .then((createdCastle) => {
      resultMock.castle = createdCastle;
      return new Knight({
        rank: faker.lorem.words(10),
        weapon: faker.lorem.words(10),
        castle: createdCastle._id,
      }).save();
    })
    .then((knight) => {
      resultMock.knight = knight;
      return resultMock;
    });
};
