# Ecommerce-Project

This is an Ecommerce project still development in progress, it has all the basic functionalites of an ecommerce website.
At present backend of this project is completed and the front-end is in progress.

# Built With
* NodeJS
* Express
* MongoDB
* React
* Redux
* HTML
* CSS

# Features
* Users are classifed into two roles User and Admin
* admin can add new products and its details
* user can register by providing email and password
* user while registering themselves they can add their avatar as profile picture
* user can reset their password
* user can view their profile
* user can update their profile
* user can view all the products with or without login
* user can search the products
* user can filter the products based on category, price or ratings
* user can rate and review the product
* user can delete their review on a product
* user can add the product to the cart
* user can order the product
* user can delete the order shipment of product
* user can view the details of order shipment
* admin can update or delete the details of order shipment
* admin can get the details of all or a specific user
* home page has paginitaion built into it
* proper Error handling and iput validation
* Custom user authentication using JSON Web Tokens.
* proper authorization of roles of all the functionality
* Bootstrap responsive
* and many more functionalities

# Install dependencies
Backend dependencies
```bash
$ cd Ecommerce-Project
$ npm install
```
frontend dependencies
```bash
$ cd Ecommerce-Project/frontend
$ npm intall
```

# Seed Database
Use the following commeand to put some dummy products in that database. Run it in the root folder.
```bash
$ npm seeder
```
# Run this project in Local Machine
Replace all the process.env variables with appropriate values \
Run backend in production mode
```bash
$ cd Ecommerce-Project
$ npm run prod
```
Run frontend
```bash
$ cd Ecommerce-Project/frontend
$ npm start
```

# All backend routes
## PRODUCT Routes
* /api/product/:id GET PUT DELETE
* /api/products GET (conatins query)
* /api/admin/new POST
* /api/review PUT
* /api/reviews?id= GET
* /api/reviews?productId=&id= DELETE

## USER Routes
* /api/login POST
* /api/logout GET
* /api/me GET
* /api/register POST
* /api/password/reset/:token PUT
* /api/password/forgot POST
* /api/profile GET
* /api/password/updatePassword PUT
* /api/profile/updateProfile PUT
* /api/admin/users GET
* /api/admin/users/:id GET
* /api/admin/users/:id DELETE
* /api/admin/users/:id PUT

## ORDER Routes
* /api/order/new POST
* /api/order/:id GET
* /api/orders/myOrders GET
* /api/admin/allOrders GET
* /api/admin/order/:id PUT
* /api/admin/order/:id DELETE
