## Description

A small marketplace APIs using [Nest](https://github.com/nestjs/nest) framework.

##### Technologies Used:

-   <b>NodeJS</b> (v16.16.0)
-   <b>NestJS</b> (v9.0.0)
-   <b>Yarn</b> (v1.22.19)
-   <b>Typescript</b> (v4.3.5)
-   <b>Mongoose</b> (v6.5.0)
-   <b>Passport</b> (v0.6.0)

## **Requirements**

For running Lancer, you will only need [**Nodejs**](https://nodejs.org/en/) installed.

**Clone Repository**

    $ git clone https://github.com/naveen-murali/marketplace.git
    $ cd marketplace

**Configure app**

Create a `.env` file in your root directory.<br> You will need:

```js
- PORT 
- MONGODB_URI 
- JWT_SECRET;
```

<br>

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```
