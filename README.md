# Virtual Book Store

This is a simple book store with backend in Node and Express. The Frontend is a simple index.html. Just open the file in your browser

## Steps to run

After cloning the repository, 

 - Navigate to the backend folder
 - Run `npm install` and then run `node seed/book_seeder.js`
 - Run `npm start` to start the server
 - Open new terminal and run `npm run chat` to start the chat microservice
 - Open another terminal and run `npm run booksearch` to start book stream microservice 

Just simply open the `index.html` file in your browser

## Functionalities
 - Select books from the catalogue and check their description
 - Add books to the cart
 - Remove books from the catalogue
 - Add new books on basis of user's search query - Implementation of streams and microservices
 - Open a chat in the webpage to speak with the customer support team - Implementation of sockets and microservices
 - Sort books on basis of their name and price - Transformation and sorting of data on basis of query parameters
 - Using environment variable for storing APIs and DB details