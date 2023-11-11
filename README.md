<h3 align="center">Event Management Service</h3>

---

<p align="center"> Backend for a event management servoce with basic functionalities. 
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Commands](#commands)
- [Built Using](#built_using)
- [Authors](#authors)

## 🧐 About <a name = "about"></a>

This project demonstrates a fully working backend template to serve the REST API endpoints which may propel an event management service with basic functionalities.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [usage](#usage) for how you can see everything in action and interact with the system. 

### Prerequisites

What things you need to run the application

```
node v16.16.0
npm v8.11.0
```
```
docker compose v2.6.1
```

### Installing

A step by step series of examples that tell you how to get a development env running.

Clone this repository

```
git clone https://github.com/theZeuses/event-management-service.git
```

Change working directory

```
cd event-management-service
```

Create a .env.development file in root and copy everything form .env.example

```
cat .env.example > .env.development
```

Spin up the docker containers

```
docker compose -f docker/docker-compose.yml --env-file .env.development up -d
```
>If you don't want to use docker, rather want to use MySQL from your localhost and your local environment, you have to edit _.env.development_ with your MySQL configuration values, and import demo data from **db.sql**. Then run **npm run start:dev**.

NestJs will compile the project and serve on port 8001. Wait for some seconds for the services to be fully up before staring interacting with the application.

## 🔧 Running the tests <a name = "tests"></a>
### Automated Tests
To run all the unit tests run

```
npm run test
```

To run all the end to end test run

```
npm run test:e2e
```

## 🎈 Usage <a name="usage"></a>

As soon as your copy of the application boots up you can start exploring the endpoints. The base url should be http://localhost:8001 if you haven't change the port in env. Here, the main functionalities have been demonstrated. You can also find copies of **Postman collection & environment** containing all the requests with example response in the **artifacts** folder.

### _Clarification_
1. API endpoints have been versioned using /v1 prefix before all resource names.

2. All get all endpoints (e.g. /v1/events) provides the functionality to paginate the result set using query string.
> **STANDARD QUERY STRING:** _/v1/events?limit=10&page=1_  **EXPLANATION:** get 10 events after skipping the first (page - 1) * limit=> (1 - 1) * 10 => 0 * 10 => 0 items.

3. GET requests must follow appropriate query string format described above, otherwise a error with errorCode 40002 will be returned.

4. POST/PATCH request's body must follow appropriate payload schema to fullfil that request, otherwise 40001 error will be returned.

5. Successful request for getting resource will just return the result/result set.
```
{
  "field": "data"
}
```
```
{
  "resource_name": [
    {
      "field": "data"
    }
  ],
  "pagination":{
    "total":1,
    "per_page":1,
    "total_pages":1,
    "current_page":1
  }
}
```
6. Successful request for performing action will return response with related resource
```
{
  "parent_resource_name": {
    "field": "value"
  },
  "resource_name": {
    "field": "value"
  }
}
```

7. Unsuccessful request will return response in following pattern
```
{
  "statusCode": 404,
  "errorCode": 40401,
  "errors": Array<any>
}
```

### Events
**Get Active Event List** (with pagination)

endpoint
```
GET /v1/events?limit=10&page=1
```

**Get Single Event Details**

endpoint
```
GET /v1/events/:id
```

**Get Single Event With it's active workshop list**

endpoint
```
GET /v1/events/:id/workshops
```

### Workshops

**Get Single Workshop Details**

endpoint
```
GET /v1/workshops/:id
```

**Reserve a workshop**

endpoint
```
POST /v1/workshops/:id/reserve
```
body
```
{
  "email": "email@emailer.com",
  "name": "reserver"
}
```

## 🚀 Commands <a name = "commands"></a>

There are useful commands that you may find in _package.json_

start the dev server
```
npm run start:dev
```

create a new migration
```
npm run migration:create
```

run all pending migrations
```
npm run migration:run
```

rollback last executed migration
```
npm run migration:rollback
```
perform unit tets
```
npm test
```

perform unit tests and watch for change
```
npm run test:watch
```

perform end to end test and watch for changes
```
npm run test:e2e
```

generate test coverage report
```
npm run test:cov
```

## ⛏️ Built Using <a name = "built_using"></a>

- [MySQL](https://www.mysql.com) - Database
- [TypeOrm](https://typeorm.io/) - ORM
- [Jest](https://jestjs.io) - Testing Framework
- [NestJs](https://nestjs.com/) - Server Framework
- [NodeJs](https://nodejs.org/en/) - Server Runtime Environment

## ✍️ Authors <a name = "authors"></a>

- [@theZeuses](https://github.com/theZeuses) - Idea & Initial work

