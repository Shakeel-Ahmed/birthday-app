# Send Birthday Greetings API

This demo API is written by [Shakeel Ahmed](https://ishakeel.com).

## About API

This is a simple app written in TypeScript using NodeJS as the backend to send greetings to loved ones through email.
All the greetings will be dispatched at 9.00 AM as per their local timezone.

### Adding a new user for birthday greetings

#### API Endpoint:

www.yourapi.com/api/user-add

Send JSON **_POST_** Request

{"firstName":"John","lastName":"Doe","birthDay":"1997-07-25","location":"America/New_York","email":"john@example.com"}

Note: Please do validations on the front end before sending the POST request.

### Updating existing users for birthday greetings

#### API Endpoint:

www.yourapi.com/api/user-update/:userId

Send JSON **_PUT_** request with a user id in the API URL.

{"firstName":"Jane","lastName":"Dude","birthDay":"1997-07-25","location":"America/New_York","email":"jane@example.com"}


Note: Please do validations on the front end before sending the PUT request.

### Removing existing users for birthday greetings

#### API Endpoint:

Send **_DELETE_** request with the user id in the API URL to remove.

www.yourapi.com/api/user-delete/:userId

### Database setup

1. You need to create the database name manually.
2. Define the database credentials in the **.env** file.
3. Generate database table schema by running the command "npm run migrate"
4. Enjoy

### Cron Jobs

Cron jobs will start running as soon as you spin the NodeJS server. It's autonomous you don't need to do anything after
that. Cron jobs will keep sending greeting emails and keep managing the database.

Note: Cron jobs will keep working as long as the NodeJS server is up and running. Stopping the NodeJS server will
kill any process abruptly in the running and stop functioning.

### Commands

#### Building the app for deployment:

npm run build

It will convert TypeScript code and generate JavaScript files in the build folder.

#### Spinning the production server

npm start

#### Spinning the Dev server

npm run dev

