
[![Run tests](https://github.com/kristiania-pg6301-2022/pg6301-innlevering-StianOek/actions/workflows/test.yml/badge.svg)](https://github.com/kristiania-pg6301-2022/pg6301-innlevering-StianOek/actions/workflows/test.yml)
[![Coverage Status](https://coveralls.io/repos/github/kristiania-pg6301-2022/pg6301-innlevering-StianOek/badge.svg?branch=main)](https://coveralls.io/github/kristiania-pg6301-2022/pg6301-innlevering-StianOek?branch=main)

![Heroku](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)    
![Javascript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)   


# Project deployed on Heroku
https://innlevering-pg6301.herokuapp.com/

# Client side

- [x] - Create a react app with parcel
- [x] - Install react dependencies (React, ReactDOM & react-router-dom)
- [x] - Make react app run as expected /w parcel
- [x] - Structure react app and its components a proper way
- [x] - Route the application with react-router-dom
- [x] - Install jest and babel
- [x] - Configure babel so that the react app runs properly with jest and babel
- [x] - Make first passing test
- [x] - Set up github actions
- [x] - Connect coveralls with github actions and make a badge
- [x] - Get status badge saying tests is passing
- [x] - Get status badge from coveralls
- [x] - Let coveralls read tests with jest --coverage
- [x] - Added husky to make sure i cannot commit a unformated code
- [ ] - Get more coverage with jest
> Tests has been challenging overall. So the coverage isnt that great! 
# Server side

- [x] - Install express /w nessecary dependencies
- [x] - Make server listen to port 3000
- [x] - Running express server
- [x] - First test GET
- [x] - Let server serve react app
- [x] - Fetch questions from /api/question
- [x] - Make a post request that match the random question from GET and return true or false
- [x] - Make score stored with cookies
- [x] - Deploy on Heroku

> There is a error i cant get a hold on within server tests that throws me this: ReferenceError: setImmediate is not defined <br />
> I cant seem to figure this one out. 


# Applikasjonen skal vise at dere behersker:

- [x] Parcel
- [x] React
- [x] React Router
- [x] Jest
- [x] Github Actions
- [x] Coveralls
- [x] Express
- [x] Heroku
# Oppsummert:

- [x] Få en Parcel til å bygge en React applikasjon
- [x] Få React Router til å navigere rundt i applikasjonen
- [x] Få React til å hente og lagre informasjon til et API
- [x] Få Github Actions til å kjøre Jest-testene og publisere coverage til Coveralls
- [x] Få Heroku til å publisere websidene
# Express-serveren skal ha følgende API:

- [x] GET /api/question - returnerer et tilfeldig spørsmål med { id, category, question, answers }
- [x]  POST /api/question - tar inn { id, answer } og returnerer "true" eller "false"
