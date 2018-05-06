# Lab 13-14 - Relational Mapping

**Author**: Mario Flores Jr.

**Version**: 1.0.0

## Overview

This lab is a server build-up using Express and MongoDB. The router makes requests to endpoints, utilizing the Castle schema as a model for the data. The database is a MongoDB Cloud remote deployment.  

## Functionality

1. To utilize MongoDB, ensure that link to database is entered into MONGODB_URI in the .env and test.env.js files using the following link:

```mongodb://username:password@ds163769.mlab.com:63769/11-express```

*Must obtain specific username and password from author.

2. To POST a new Castle to the database, make a POST request.  Successful posts will return a 200 status code to the logs and will send a response to the MongoDB with id.

```castleRouter.post('/api/castle', jsonParser, (request, response, next) =>```

3. To make a GET request, utilize the id endpoint to retrieve the specific Castle of your choosing. If successful, a 200 status code is logged and a response sent. If id doesn't exist, a 404 status will be sent.

```castleRouter.get('/api/castle/:_id', (request, response, next) =>```

4. To make an update to the database, utilize the PUT request along with the id of the Castle instance you wish to update. If successfully updated, a 200 status code is returned with updated json. If id doesn't exist or failure to update, a 404 status is sent.

```castleRouter.put('/api/castle/:id', jsonParser, (request, response, next) =>```

5. To DELETE a Castle, make the request with the specific id endpoint. A 200 status code is then logged, along with a response notifying of the deletion. A 404 status code is sent if the Castle does not exist.

```castleRouter.delete('/api/castle/:_id', (request, response, next) =>```
