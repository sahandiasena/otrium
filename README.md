# Otrium

A simple REST API with a GraphQL wrapper to maintain a products list.

## Prerequisites

* Node
* Docker

## Installation

### Install dependencies
```
npm install
```

### Configure and startup MySql
```
docker stack up -c mysql-stack.yml mysql
docker stack ps mysql
```
**Wait for Current State to change to 'running'**

## Development server

Run `npm start` for a dev server. The app will automatically reload if you change any of the source files.

## Seed data (optional)
Insert
```
cd seeder
npx sequelize-cli db:seed:all
```

Delete
```
npx sequelize-cli db:seed:undo:all
```

## API Endpoints
Rest API URL: `http://localhost:3000/`.

```
GET /products/
GET /products/:id

POST /products/
PUT /products/:id

POST /product/upload
```

### Request

```
{
  "name": string,
  "slug": string,
  "sku": string,
  "brandId": number
}
```

### Response
```
{
  "id": number
  "name": string,
  "slug": string,
  "sku": string,
  "brandId": number
  "createdAt": datetime,
  "updatedAt": datetime,
  "brand": {
    "id": number,
    "name": string,
    "description": string,
    "createdAt": datetime,
    "updatedAt": datetime,
  }
}
```

## GraphQL
GraphQL URL: `http://localhost:3000/graphql`

### Query

```
{
  getProducts {
    name
    slug
    sku
    brand {
      id
      name
    }
  }
}
```

### Mutation
```
mutation {
  addProduct(newProduct: { name: string, slug: string sku: string, brandId: number }) {
    name
    slug
    sku
  }
}
```

## Bulk Product Upload
### File strucutre

```
name,slug,sku,brandId
Playstation 5, ps5, ps-5, 1
...
...
```

## Technologies Used

* NodeJS
* ExpressJS
* Typescript
* GraphQL