'use strict';

import faker from 'faker';
import superagent from 'superagent';
import Castle from '../model/castle';
import { startServer, stopServer } from '../lib/server';

const apiURL = `http://localhost:${process.env.PORT}/api/castle`;

const createMockCastle = () => {
  return new Castle({
    style: faker.lorem.words(15),
    family: faker.lorem.word(15),
    kingdom: faker.lorem.words(15),
    farming: faker.lorem.words(15),
  }).save();
};

describe('/api/castle', () => {
  beforeAll(startServer);
  afterAll(stopServer);
  afterEach(() => Castle.remove({}));

  describe('POST api/castle/:id', () => {
    test('POST - should respond with a 200 status', () => {
      const castleToPost = {
        style: faker.lorem.words(15),
        family: faker.lorem.words(15),
        kingdom: faker.lorem.words(15),
        farming: faker.lorem.words(15),
      };

      return superagent.post(apiURL)
        .send(castleToPost)
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.body.style).toEqual(castleToPost.style);
          expect(response.body.family).toEqual(castleToPost.family);
          expect(response.body.kingdom).toEqual(castleToPost.kingdom);
          expect(response.body.farming).toEqual(castleToPost.farming);
          expect(response.body._id).toBeTruthy();
        });
    });
    
    test('POST - should respond with a 400 status ', () => {
      const castleToPost = {
        style: faker.lorem.words(15),
      };
      return superagent.post(apiURL)
        .send(castleToPost)
        .then(Promise.reject)
        .catch((response) => {
          expect(response.status).toEqual(400);
        });
    });

  test('POST - 409 for duplicate castle', () => { //eslint-disable-line
      return createMockCastle()
        .then((castle) => {
          const castleToPost2 = {
            style: castle.style,
            family: castle.family,
            kingdom: castle.kingdom,
            farming: castle.farming,
          };
          return superagent.post(apiURL)
            .send(castleToPost2);
        })
        .then(Promise.reject)
        .catch((error) => {
          expect(error.status).toEqual(409);
        });
    });

    describe('GET /api/castle/:id', () => {
      test('should respond with 200 if there are no errors', () => {
        let castleToTest = null;
        return createMockCastle()
          .then((castle) => {
            castleToTest = castle;
            return superagent.get(`${apiURL}/${castle._id}`);
          })
          .then((response) => {
            expect(response.status).toEqual(200);
            expect(response.body.style).toEqual(castleToTest.style);
            expect(response.body.family).toEqual(castleToTest.family);
            expect(response.body.kingdom).toEqual(castleToTest.kingdom);
            expect(response.body.farming).toEqual(castleToTest.farming);
            expect(response.body._id).toBeTruthy();
          });
      });
      test('GET - should respond with 404 if there is no dragon found', () => {
        return superagent.get(`${apiURL}/InvalidId`)
          .then(Promise.reject)
          .catch((response) => {
            expect(response.status).toEqual(404);
          });
      });
    });

    describe('UPDATE api/castle/:id', () => {
      test('PUT - should respond with 200 status and updated info', () => {
        let castleToUpdate = null;
        return createMockCastle()
          .then((castle) => {
            castleToUpdate = castle;
            return superagent.put(`${apiURL}/${castle._id}`)
              .send({ family: 'windsor' });
          })
          .then((response) => {
            expect(response.status).toEqual(200);
            expect(response.body.style).toEqual(castleToUpdate.style);
            expect(response.body.family).toEqual('windsor');
            expect(response.body.kingdom).toEqual(castleToUpdate.kingdom);
            expect(response.body.farming).toEqual(castleToUpdate.farming);
            expect(response.body._id).toEqual(castleToUpdate._id.toString());
          });
      });

      test('PUT - should respond with 404 for id not found', () => {
        return createMockCastle()
          .then(() => {
            return superagent.put(`${apiURL}/castlehere`);
          })
          .then(Promise.reject)
          .catch((response) => {
            expect(response.status).toEqual(404);
          });
      });

      test('PUT - should respond with 400 for validation error', () => {
        return createMockCastle()
          .then((castle) => {
            return superagent.put(`${apiURL}/${castle._id}`)
              .send({ type: '' });
          })
          .catch((response) => {
            expect(response.status).toEqual(400);
          });
      });

      describe('Invalid route should route to catch-all', () => {
        test('should return 404', () => {
          return superagent.get(`${apiURL}invalid`)
            .catch((response) => {
              expect(response.status).toEqual(404);
            });
        });
      });
    });

    describe('DELETE api/castle/:id', () => {
      test('DELETE - should respond with 204 status', () => {
        return createMockCastle()
          .then((castle) => {
            return superagent.delete(`${apiURL}/${castle._id}`);
          })
          .then((response) => {
            expect(response.status).toEqual(204);
            expect(response.body._id).toBeFalsy();
          });
      });

      test('DELETE - should respond with 404 if id not found', () => {
        return createMockCastle()
          .then(() => {
            return superagent.delete(`${apiURL}/InvalidId`);
          })
          .then(Promise.reject)
          .catch((response) => {
            expect(response.status).toEqual(404);
          });
      });
    });
  });
});
