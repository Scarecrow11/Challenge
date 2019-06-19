Server app for start need install all npm package and use comand npm start.
app return avalable currencies and exchange rate.

In the project directory, you can run:

### `npm start`

In app we have rest api: 
for url {yourshost}:{port}/v1/currency
    Headers : must have token
    Body : empty
    responce : array avalable currencies for rate

if Header have wrong token we have only 2 currency.
    
And in app have socket connetcion 
    on event convert mast have options baseCurrency, desiredCurrency, amount.
    emit convet_res -- return state of request,date and error if con exeption.

All options can edit in  

### `config/main.js;`

################## VERSION 2  ##################

Add connect server with database all config

This version adds a server connection to the database.
All connection configurations can be changed in /config/main

Added new queries to work with the database

### get /v2/companies
- returns the entire list of companies from the database
- available to all users

#### get /v2/currencies
- returns the entire list of available currencies
- available only to authorized users

#### get /v2/users/:id
- returns a list of users owned by the company
- available only to authorized users
- check input id

#### get /v2/histories/users/:id
- returns the user's history by his id
- available only to authorized users
- check input id

#### get /v2/histories/users/:id/count
- returns the number of operations performed in the user’s history by its id
- available only to authorized users
- check input id

#### get /v2/histories/companies/:id
- returns the operations in the history of the company by its id
- available only to authorized users
- check input id

#### get /v2/histories/companies/:id/count
- returns the number of transactions performed in the history of the company by its id
- available only to authorized users
- check input id

#### post /v2/histories/
- adds a new entry to the database
- expects userId, baseCurrencyId, desiredCurrencyId, amount, rate
- available only to authorized users
- check the input parameters

#### put /v2/histories/:id
- changes the existing entry in the database, changes the amount the user wanted to exchange by id entries
- expects parameters id, amount
- available only to authorized users
- check the input parameters

#### delete /v2/histories/:id
- deletes a record from the database by record id
- expects id parameter
- available only to authorized users
- to check the input parameter

#### version 2 notes

Errors
- in case of an error in the request in the database, it will return the object with the false status and error description

parameter check
- checks that these parameters are numbers,
- on error, it will return an object with false status and error description

authorization
- check the presence of the secret key in the request
- keys can be viewed and changed in the configuration file
- on error, it will return an object with false status and error description
