# node-auth-api
A simple microservice in Node.js with different functionalities using express with Mocha testing, Istanbul code coverage and JWT Authentication.

[![Build Status](https://travis-ci.org/darpanjbora/node-auth-api.svg?branch=master)](https://travis-ci.org/darpanjbora/node-auth-api)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/darpanjbora/node-auth-api)
## OVERVIEW
### Public endpoints

#### Login
> Request body should contain an arbitrary username/password pair.
> Key for username and password are 'username' and 'password' respectively.
- A mock authentication service which accept any username/Password and returns a signed Json Web Token(JWT, https://jwt.io/) which can be used to validate future requests.
- The JWT expires in 1 hour.

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
- Install all dependecies `npm install`
- Start the server `npm start`

## RUN THE APIs 

- Check the APIs using [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop)

### Routes 

##### POST login

 `http://localhost:3000/login` 
 
 This generates a JWT which is required to access the protected endpoints. All you need to do is pass a arbitrary pair of `username` and `password` in the request body. And it returns a JWT which is valid for next 1 hour.
 
 
 ##### POST JSON patch
 
 `http://localhost:3000/patch`
 
 This returns a patched JSON object based on the JSON object `doc` and the patch JSON object `thePatch` passed in the request body. 
 
 ##### POST thumbnail
 
 `http://localhost:3000/thumbnail`
 
 This returns a thumbnail (50x50 pixels) of the image `uri` passed in the request body (public URL of the image needs to be passed). 

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

This project is licensed under the [MIT License](https://github.com/darpanjbora/node-auth-api/blob/master/LICENSE).

## AUTHOR 

[@darpanjbora](https://github.com/darpanjbora) - darpanjyoti.bora@gmail.com



