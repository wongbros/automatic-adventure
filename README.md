# pet-cam-aa
Pet cam client and API that serves connection to user and their pet. This project is intended to run alongside [pet-cam-fg](https://github.com/wongbros/friendly-giggle).

## Description
A web application that securely connects a user with their pet over web cam. A user can simply login using their Google account and setup details including a whitelist of phone numbers that are allowed to connect to their room. After starting the camera, only the user with their hashed url, which can be obtained via SMS to ensure privacy, can connect to the camera.

Google Authentication | Home page
---- | ----
![](./docs/1-login.png) | ![](./docs/2-home.png)

Details | Whitelist Phone Numbers
---- | ----
![](./docs/3-details.png) | ![](./docs/4-whitelist.png)

## Team
  - [Brandon Wong](https://github.com/blhwong)
  - [Brian Wong](https://github.com/brianlwong)

## Table of Contents
1. [Technologies](#Technologies)
1. [Requirements](#Requirements)
1. [Tasks](#Tasks)
1. [Contributing](#contributing)

## Technologies

### Frontend
- React (ES6)
- React Router
- Ant Design
- Create react app

### Backend
- Node
- Express
- MongoDB + Mongoose
- Socket.io

### Other
- Heroku
- Twilio
- Mocha + Chai
- Google OAuth2
- PassportJS

## Requirements
- Node 8.9.x
- React 16.4.x
- React Router DOM 4.2.x

## Setup
Begin by forking project. Clone down the forked repo:
```
git clone <your forked url>
```
cd to the root directory of the project
```
cd automatic-adventure/
```
install dependencies
```
npm install
```
start database
```
mongod
```
Note: if this fails, try ``` sudo mongod ```

start server
```
npm run dev-server
```
start client
```
npm run dev-client-https
```
Start hacking!

## Dotenv
Create .env file as shown below
```
ACCOUNT_SID=
API_KEY_SID=
API_KEY_SECRET=
AUTH_TOKEN=
CALLER_BASE_URL=
DB=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=
HASH_SALT
NODE_ENV=
PET_CLIENT_URL
PORT=
REACT_APP_SERVER_BASE
SESSION_SECRET=
TWILIO_NUMBER=
```

## Issues
View the project scrum board [here](https://github.com/orgs/wongbros/projects/1)

## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
