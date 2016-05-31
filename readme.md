# Lambda Router

Lambda Router is a routing framework for AWS Lambda.

![CircleCI](https://circleci.com/gh/cyber-z/lambda-router.svg?style=shield)
![codecov](https://codecov.io/gh/cyber-z/lambda-router/branch/master/graph/badge.svg)  
[![NPM](https://nodei.co/npm/lambda-router.png)](https://nodei.co/npm/lambda-router/)

# API Docs

## LambdaRouter

A routing framework for AWS Lambda

### constructor

LambdaRouter class

**Parameters**

-   `options` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** contains 'basedir', 'routes'

### getRoute

get a routed function by name

**Parameters**

-   `name` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 

Returns **([Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function) | null)** 

### setRoute

setup routing

**Parameters**

-   `name` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `option` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** contains 'module', 'action'
