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


