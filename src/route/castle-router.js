'use strict';

import { Router } from 'express';
import bodyParser from 'body-parser';
import HttpErrors from 'http-errors';
import Castle from '../model/castle';
import logger from '../lib/logger';

const jsonParser = bodyParser.json();

const castleRouter = new Router();

castleRouter.post('/api/castle', jsonParser, (request, response, next) => {
  logger.log(logger.INFO, 'POST - processing a request');
  if (!request.body.style || !request.body.family ||
     !request.body.kingdom || !request.body.farming) {
    logger.log(logger.INFO, 'Responding with a 400 error code');
    return next(new HttpErrors(400, 'Unable to post'));
  }
  return new Castle(request.body).save()
    .then((castle) => {
      logger.log(logger.INFO, 'POST - responding with a 200 status code');
      return response.json(castle);
    })
    .catch(next);
});

castleRouter.get('/api/castle/:id', (request, response, next) => {
  logger.log(logger.INFO, 'GET - processing a request');
  return Castle.findById(request.params.id)
    .then((castle) => {
      if (!castle) {
        logger.log(logger.INFO, 'GET - responding with a 404 status code');
        return next(new HttpErrors(404, 'castle id not found'));
      }
      logger.log(logger.INFO, 'GET - responding with a 200 status code');
      return response.json(castle);
    })
    .catch(next);
});

castleRouter.put('/api/castle/:id', jsonParser, (request, response, next) => {
  const options = { runValidators: true, new: true };
  return Castle.findByIdAndUpdate(request.params.id, request.body, options)
    .then((castle) => {
      if (!castle) {
        logger.log(logger.INFO, 'PUT error, no castle found with this id');
        return next(new HttpErrors(404, 'castle not found'));
      }
      logger.log(logger.INFO, 'PUT success, responding with 200');
      return response.json(castle);
    })
    .catch(next);
});

castleRouter.delete('/api/castle/:id', jsonParser, (request, response, next) => {
  logger.log(logger.INFO, 'DELETE - processing request');
  return Castle.findByIdAndRemove(request.params.id)
    .then((castle) => {
      if (!castle) {
        logger.log(logger.INFO, 'DELETE error - no castle found with this id');
        return next(new HttpErrors(404, 'castle not found'));
      }
      logger.log(logger.INFO, 'DELETE request processed - 204 status');
      return response.sendStatus(204);
    })
    .catch(next);
});

export default castleRouter;
