# Home Library Service
- Dockerized REST API with Prisma ORM & PostgreSQL database with Live-Reload support for files in src/ folder, with JWT authentication, and with custom logger

- Users can create, read, update, delete data about Artists, Tracks and Albums, add them to Favorites in their own Home Library!

## Installation

IMPORTANT: Use Node.js LTS version (18.17.1 at the time of writing)

Clone this repository

Switch to develop branch: git checkout develop

Install all project dependencies with npm install

Start Docker Desktop (only if you are MS Windows user, otherwise skip this step)

Run docker compose up -d --build and wait until images are created & containers are started. You can check status of containers with docker ps

Run TypeORM migrations: npm run migration:run

Everything should be ready and now you can run authentication tests npm run test:auth and check out logs written by custom logger in ./logs/ folder

## JWT authentication

Note: /auth/refresh route is not covered by unit tests. You can check it manually via Postman, Insomnia, or if you use REST Client extension for VS Code, you can perform requests using hls-auth.http provided by me.

## Custom logger

Logs are residing in the ./logs/ folder mounted via Docker bind mount. There are two log files: log-number.log - contains log messages with all matching log levels, and error-number.log - contains only log messages with error logging level.


## Running application

```
npm run start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Running application (using Docker)

```
npm run docker:build
```
```
npm run docker:up
```

## Running migration

```
npm run migration:run
```

## Check containers Vulnerability

```
npm run docker:scout
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
