# Stefandango.dev NODE.JS template

My own node.js playground template. 

A tiny MVC pattern build using handlebars and webpack to bundle files together. 
Controllers serve handlebar files as well as JavaScript per view. Styling is done using SASS.
All files are bundled using webpack.

## Running Project

Project requires node and npm installed. 

* Clone Project
* Create a ".env" file with PORT set:
```
PORT=3000
```
* Install dependencies
```
npm install
```
* Start project using NPM 
```
npm run start
```

* Site should now run on localhost:3000 or whatever port entered in the .env file. 

## Commands

```
npm run test // Runs the mocha test

npm run clean // removes the build folder

npm run lint // Runs eslinter

npm run build:dev // Runs the build for development environment.

npm run build:prod // Runs the build for production environment, including generation of favicons. 

npm run watch:client // runs development webpack with watch flag set. 

npm run watch:server // runs nodemon to manage server changes.

npm run start // Runs both above watch commands. 

```

