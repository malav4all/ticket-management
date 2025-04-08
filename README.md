<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# NestJS Ticket Microservice

A Ticket  microservice built with [NestJS](https://github.com/nestjs/nest) framework using TypeScript.

## Microservice Description

This microservice handles to create a tickets,Read,Update,Delete 

### Service Dependencies

This microservice depends on the following services:

- Database: MongoDb

## Environment Variables

The following environment variables must be configured for the Ticket microservice to function properly:

| Variable Name | Description | Required | Default Value | Example |
|---------------|-------------|----------|---------------|---------|
| PORT | Port on which the microservice will run | Yes | 3000 | 3001 |
| DB_URL| MongoDB Url | Yes | development | production |

## Project Setup

```bash
$ yarn install
```

## Compile and Run the Project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| /tickets | GET | Get all tickets (with filtering options) |
| /tickets/:id | GET | Get a specific tickets by ID |
| /tickets | POST | Create a new tickets |
| /tickets/:id | PUT | Update an existing tickets |
| /tickets/:id | DELETE | Delete a tickets |



## Run Tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [NestJS Microservices](https://docs.nestjs.com/microservices/basics)
- [Discord Support Channel](https://discord.gg/G7Qnnhy)
- [NestJS Courses](https://courses.nestjs.com/)

## Support

Nest is an MIT-licensed open source project. It can grow thanks to sponsors and support by amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).