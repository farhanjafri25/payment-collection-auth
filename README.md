<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description
A payment-auth repository which contains user roles, admin roles and payment methods.

## Technologies Used:
### Nest Js Framework

- A progressive Node.js framework for building efficient, reliable and scalable server-side applications.
- Gives you true flexibility by allowing use of any other libraries.
- Provides Modular Architecture.
- It is helpful in implelmenting design patterns in javascript easily.

### PostgreSQL

- PostgreSQL is designed to handle large amounts of data and complex workloads. 
- It supports a wide range of features including ACID compliance, transactions, foreign keys, triggers, and stored procedures. PostgreSQL also supports a variety of data types including text, numeric, date and time, geometric, and JSON.

### Docker

- Docker is used for deployment in production.

## Basic App description
The App is divided into 3 modules:
1. User-module
2. Admin-module
3. Payment-module

User-Module: The User-module has functionalities regarding user authentication and authorization, a user can enter his email, name and password details to sign-up and login for the application.

Admin-module: The Admin-module has functionalities to sign-up for an admin, The admin is given super privileges such as Creating orders between two users, Deleting orders, Updating Order Status and deleting a order between two users.

Payment-module: The payment module is divided into two parts: 
                1. Order Creation: Users can create and manage orders between other users.
                2. Payment updation: A webhook which updates transaction status of an order between users.
                Note: Payment updation has 2 API's, A webhook which updates order status based on razorpay payment-link response, 2nd is An API which updates orders based on razorpay order property. Since, i've created the webhook on payment-link but the method can be changed to order wise payment, so we can assume the order payment is not currently in Use


## Authentication and Authorization

I am using NestJs Auth Guard for authenticating incoming requests.
DTO's are used for request validations.
I've created a unique id for bifucating Admin and User for authencating Admin Requests and User Requests.

## Key Points

1. Designed a modular based architecture.
2. Provides CRUD operations of everytable design.
3. Design a simple efficinet schema in PostgreSQL
4. Version Control of Api is handled properly
5. Guards are used for auhentication and authorization of API's.
6. Common Response Interceptor
7. Clean code architecture.

## Running the app

```bash
# production mode
$ docker-compose up
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

