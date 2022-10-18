# Product API

## Set up on local machine

### checkout repository

```
git clone https://github.com/bhavitk/product-api.git
```

### Install packages

```
npm install
```

### Run

```
npm start
```

## APIs

NOTE: Supported currencies are:

1. USD
2. CAD

As the base currency is USD, your can convert it to CAD by passing the currency `currency` parameter to both of the APIs.

### GET /product/mostviewed

Returns products order by highest number of views, this does not return product with zero views.

Parameters

- currency
- limit

### GET /product/:productId

Parameters

- productId
- currency

#### Product Object

```json
{
  "id": Number,
  "name": String,
  "price": Float,
  "description": String,
  "isDeleted": Boolean,
  "productViewed": Number,
  "createdDate": Date,
  "updatedDate": Date,
  "deletedDate": Date
}
```

## How to access

Suppose you are ruunning application without making any changes to `.env` then application will run on `3000` port.

### Get most viewed products

This will return top 5 most viewed products

```
http://localhost:3000/product/mostviewed
```

Limit the number of products

```
http://localhost:3000/product/mostviewed?limit=3
```

Convert to CAD currency

```
http://localhost:3000/product/mostviewed?currency=CAD
```

### Get single product

This will return single product, you have to pass productId in path.

```
http://localhost:3000/product/1
```

Convert to CAD currency

```
http://localhost:3000/product/1?currency=CAD
```
