[![Pipeline](https://github.com/lapptomi/tsoha-2021/actions/workflows/pipeline.yml/badge.svg)](https://github.com/lapptomi/tsoha-2021/actions/workflows/pipeline.yml)

# tsoha-2021

## [App on Heroku](https://tsoha-2021-tl.herokuapp.com/)

# Purpose of the application
Purpose of this application is to be a website / forum where people can discuss programming related things.  
Users can create posts where other people can answer. Users can also like the posts and the comments.

# Documentation
### [User guide](https://github.com/lapptomi/tsoha-2021/blob/main/documentation/user-guide.md)  

### [Database diagram](https://github.com/lapptomi/tsoha-2021/blob/main/documentation/images/dbdiagram.png)


# Running the app locally

### Environment variables needed to use this app
If you want to run this app locally, you need to have these two environment variables:

<b>DATABASE_URL</b>=[PostgreSQL connection string] [More info here](https://node-postgres.com/features/connecting)  
<b>SECRET</b>=[secret key for jwt tokens]

You can set up these variables by making a .env file in the root of the project and by adding the two variables in it.

#### The content of the .env file can be for example: 
```
DATABASE_URL=postgresql://dbuser:secretpassword@database.server.com:3211/mydb <-[not a real database url]
SECRET=secretkey <-[you can replace the "secretkey" by any text]
```

# Installing dependencies

You can install the project dependencies by running command:
```
npm install && cd react-ui && npm install
```

# Starting the application

## Running in development mode
<b>When running the app in development mode, you need to start the server and React UI separately.</b>  


You can start the server by command: 
```
npm run dev
```

And the React UI by command: 
```
cd react-ui && npm start
```



## Running in production mode
You can start the project in production mode by command:

```
npm run build:full && npm run start:prod
```


## Running in test mode
You can start the project in test mode by command:

```
npm run start:test
```


# Running tests
<b>When running tests, the server and the React UI must be both running.</b>  
You can run the tests by command: 

```
npm run cypress:run
```


# Eslint
You can lint the code by command:
```
npm run eslint
```
