# node-auth-api
A simple microservice in Node.js using express in ES6 with code coverage and JsonWebToken Authentication.

[![Build Status](https://travis-ci.org/darpanjbora/node-auth-api.svg?branch=master)](https://travis-ci.org/darpanjbora/node-auth-api)
## OVERVIEW
### Public endpoints

#### Login
> Request body should contain an arbitrary username/password pair.
> Key for username and password are 'username' and 'password' respectively.
- A mock authentication service which accept any username/Password and returns a signed Json Web Token(JWT, https://jwt.io/) which can be used to validate future requests.
- The JWT Web Token generated has a lifetime of 1 hour.

### Protected endpoints 

__JWT GENERATED IN THE "LOGIN" ENDPOINT IS ATTACHED TO EACH REQUEST. AN INVALID JWT WILL RESULT IN REJECTION OF THE REQUEST.__

#### JSON Patch
> Request body should contain a JSON object and a JSON patch object.
> Key for JSON object and JSON patch object are 'doc' and 'thePatch' respectively. 
- Returns the JSON object after applying the JSON patch object. 

#### Thumbnail creation
> Request body should contain a public image URL.
> Key for the URL is 'uri'.
- Downloads the image, resize it to 50 x 50 pixel and returns the resulting thumbnail.

## INSTALLATION 

- Clone the repository `git clone https://github.com/darpanjbora/node-auth-api.git`
- Start the server `npm start`

## RUN THE APIs 

- Check the APIs using [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop)

## TEST

```sh
# To run the mocha test
npm test

# To generate mocha test report using Istanbul
npm coverage

# To view the test report in browser
npm showcoverage
```

## CONTRIBUTING

Contributions, questions and comments are all welcome and encouraged. For code contributions submit a pull request with unit test.

## LICENSE

This project is licensed under the MIT License.

## AUTHOR 

@darpanjbora - darpanjyoti.bora@gmail.com



