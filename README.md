# TypeScript Masterclass 2024 Edition - React + NodeJS Project

## API endpoints (Task)

- http://localhost:5000/api/tasks (GET all Tasks)
- http://localhost:5000/api/task (POST create new Task)
- http://localhost:5000/api/tasks (PUT update Task)
- http://localhost:5000/api/tasks/{id} (DELETE Task by id)

## Create react app, config ESLint (TypeScript)

- npx create-react-app todo-react --template typescript

## server .env file values

- **MYSQL_USERNAME='MYSQL_USERNAME'**
- **MYSQL_PASSWORD='MYSQL_PASSWORD'**
- **MYSQL_DATABASE='MYSQL_DATABASE'**
- **PORT=**

## npm packages backend taskmanager-app/server

- yarn add express
- yarn add colors
- yarn add @types/colors
- yarn add typescript
- yarn add @types/express
- yarn add @types/node
- yarn add dotenv
- yarn add -D nodemon ts-node
- yarn add -D eslint
- yarn add typeorm reflect-metadata mysql2
- yarn add cors @types/cors body-parser
- yarn add class-transformer
- yarn add express-validator

## npm packages frontend taskmanager-app/client

- yarn add -D eslint
- yarn create @eslint/config
- yarn add -D eslint-plugin-import eslint-import-resolver-typescript
- yarn add -D prettier eslint-config-prettier eslint-plugin-prettier
- yarn add @mui/material @emotion/react @emotion/styled
- yarn add react-query
- yarn add @tanstack/react-query
- yarn add @testing-library/jest-dom @testing-library/react @testing-library/user-event
- yarn add -D @typescript-eslint/parser @typescript-eslint/eslint-plugin @types/jest
- yarn add -D @testing-library/dom jest jest-environment-jsdom ts-jest ts-node typescript

## Installation of needed Packages (npm or yarn)

- **yarn [Yarn](https://yarnpkg.com/)**
- yarn
- **npm [NPM](https://nodejs.org/en/download/package-manager/)**
- npm i

## Run backend server scripts (localhost:5000)

- yarn build
- yarn clean
- yarn dev
- yarn server

## Run frontend client scripts (localhost:3000)

- yarn client
- yarn test (watch mode)
- yarn test:coverage (see coverage)
- yarn test:watch (watch mode)

## Geneate and Add migration typeorm (migrations)
- npm run typeorm -- migration:generate -n RenameDateToDueDateAndAddCreationDate
- npm run typeorm migration:run

## Clean snapshot results from client script
- ./deleteSnapshots.sh

## Documents
- https://mswjs.io/
- https://typeorm.io/
- https://www.npmjs.com/package/typeorm
- https://mui.com/material-ui/customization/default-theme/
- https://mui.com/material-ui/guides/typescript/
- https://mui.com/material-ui/
- https://eslint.org/docs/latest/use/getting-started
- https://eslint.org/docs/latest/use/configure/configuration-files-deprecated
- https://create-react-app.dev/docs/adding-typescript/
- https://tanstack.com/query/latest/docs/framework/react/overview
- https://tanstack.com/query/latest/docs/framework/react/guides/queries
