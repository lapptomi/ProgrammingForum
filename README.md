[![Pipeline](https://github.com/lapptomi/tsoha-2021/actions/workflows/pipeline.yml/badge.svg)](https://github.com/lapptomi/tsoha-2021/actions/workflows/pipeline.yml)


# tsoha-2021

## [App on Heroku](https://tsoha-2021-tl.herokuapp.com/)


# Running the app locally

### Environment variables needed to use this app
If you want to run this app locally, you need to have these two environment variables:

<b>MONGODB_URI</b>   
<b>SECRET</b>=[secret key for jwt tokens (can be any string)]

You can set up these variables by making a .env file in the root of the project and by adding the two variables in it.

# Installing dependencies

You can install the project dependencies by running command:
```
npm install && cd client && npm install
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
cd client && npm start
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
