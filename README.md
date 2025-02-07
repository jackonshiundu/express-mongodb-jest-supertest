In this Project we are looking on how to write tests for expressjs and mongoose application
Prerequisites
Node.js (v14 or above recommended)
MongoDB (either local or using a cloud service like MongoDB Atlas)

If you haven't installed the necessary dependencies yet, run the following command:

npm install
This will install all required packages, including Jest, Supertest, and mongoose.

2. Set up Environment Variables
   Make sure you have a .env file in the root of your project with the following variable set:
```
MONGODB_URI=your_mongodb_connection_string
This MONGODB_URI is required to connect to your database, and it will be used in the tests to run against your MongoDB instance.
```
3. Database Connection
   The tests will automatically connect to your MongoDB database before each test (beforeEach) and close the connection after each test (afterEach) to keep the tests isolated and clean.
```
   beforeEach(async () => {
   await mongoose.connect(process.env.MONGODB_URI);
   });

/_ Closing database connection after each test. _/
afterEach(async () => {
await mongoose.connection.close();
});
```
# Controllers

in the controller folder we have all the logic that would be use to add, update,fetch and delete data to the database

# Routes

In this folder We define all the routes reqquired to add fetch delete or update data with their respective Controllers.

# Models

Inthis folder we define our Products model inside the product.model.js

# test

In this folder we is where we have the tests for each route inside the product.route.js.

This file contains automated tests for the Product API using Jest and Supertest. The tests ensure that all routes of the product-related API endpoints are functioning as expected. It covers the basic CRUD (Create, Read, Update, Delete) operations for the /api/products endpoint.

Testing Routes
This file tests the following Product API endpoints:
```
GET /api/products - Fetches all products

Test: Verifies that the API returns a status code of 200 and that there are products in the response.
GET /api/products/:id - Fetches a specific product by its id

Test: Verifies that the API returns the product with the correct details and a status code of 200.
POST /api/products - Creates a new product

Test: Verifies that the product is created successfully and that the response contains the correct product details, returning a 201 status.
PUT /api/products/:id - Updates an existing product by its id

Test: Verifies that the product is updated correctly, and that the response contains the updated information, returning a 200 status.
DELETE /api/products/:id - Deletes a product by its id
```
Test: Verifies that the product is deleted successfully, and that the response returns a 200 status.
Running the Tests

1. Run Tests Using Jest
   Once you have your environment set up and the dependencies installed, you can run the tests using Jest with the following command:
``
npm test
```
This will automatically run all the test cases in the file, and you'll see the results in the terminal.

3. Running a Specific Test
   If you want to run a specific test (for example, just the POST /api/products test), you can use the -t flag with a part of the test name:
```
npm test -t "should create a product"
```
This will run only the test that matches the given string.

Test Breakdown
```
beforeEach and afterEach
beforeEach: Establishes a connection to the database before each test using the MongoDB URI from the environment variables.
afterEach: Closes the database connection after each test to ensure a clean slate for the next test.

CRUD Test Details

GET /api/products: Verifies that the API correctly returns all products when there are products in the database.

GET /api/products/:id: Verifies that the API correctly returns the details of a specific product using its ID.

POST /api/products: Tests the creation of a new product by sending data in the request body and verifying that the API returns the newly created product with the correct status code.

PUT /api/products/:id: Verifies that the API can update an existing product’s details by sending a PATCH request with updated information.

DELETE /api/products/:id: Tests that a product can be successfully deleted by its ID and that the API responds with a status indicating success.
```
# Error Handling

If there is an error during the database connection or any of the API operations, the tests will fail, and you'll see an error message detailing the issue.
Common errors might include:
404: If a product is not found by ID.
400: If required fields are missing when creating or updating a product.
500: If there's a server error during any of the API operations.

# Additional Information

This test suite assumes that the MongoDB database is correctly set up and accessible.
The tests use the Supertest library to make HTTP requests to the API and Jest to manage the test lifecycle and assertions.

# Conclusion
This test suite ensures that your product API is working correctly by testing each route (GET, POST, PUT, DELETE) with different scenarios. It provides valuable feedback during development to ensure that your API endpoints are functioning as expected.
