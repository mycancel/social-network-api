# Social Network API

## Table of Contents
 - [Description](#description)
 - [Installation](#installation)
 - [Future Development](#future-development)

## Description
[WalkThrough Video](https://drive.google.com/file/d/1_s3K8yUEy_wMc6ltrlV48cVLBWvy3Gzk/view?usp=sharing)

This API uses a NoSQl database to hold social media data. This data includes users, thoughts (the equivalent to text social media posts), and reactions (the equivalent to comments on posts). This API has the ability to do the following:
- get all users / thoughts
- get a single user / thought
- create a single user / thought
- update a single user / thought
- delete a single user / thought
- add friends
- remove friends
- add reactions
- remove reactions

When a thought is created or removed, its creator's user data will be updated as well. 

## Installation

This application programming interface is created using [Express.js](https://expressjs.com/) routing, a [MongoDb](https://www.mongodb.com/docs/) database, and the [Mongoose](https://mongoosejs.com/docs/api.html) ODM. These dependencies can be installed by running ```npm install``` in the bash terminal given that the package.json from this repository is included in your code.

## Future Development

As of July 2022, when a user is deleted, their associated thoughts are not removed. This functionality will be added in future development.



