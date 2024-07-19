const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Check if a user with the given username already exists
const doesExist = (username) => {
    // Filter the users array for any user with the same username
    let userswithsamename = users.filter((user) => {
        return user.username === username;
    });
    // Return true if any user with the same username is found, otherwise false
    if (userswithsamename.length > 0) {
        return true;
    } else {
        return false;
    }
}

public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!doesExist(username)) {
            // Add the new user to the users array
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.send(JSON.stringify(books,null,4));
});

// Get the book list available in the shop using promises
public_users.get('/async-get-books',function (req, res) {

    const get_books = new Promise((resolve, reject) => {
        resolve(res.send(JSON.stringify({books}, null, 4)));
      });

      get_books.then(() => console.log("Promise for Task 10 resolved"));

  });

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    // Retrieve the email parameter from the request URL and send the corresponding friend's details
    const isbn = req.params.isbn;
    return res.send(books[isbn]); });
  
// Get the book list based on ISBN using promises
public_users.get('/async-get-books/isbn/:isbn',function (req, res) {
    const get_books = new Promise((resolve, reject) => {
        const isbn = req.params.isbn;
        resolve(res.send(books[isbn]));
      });

    get_books.then(() => console.log("Promise for Task 11 resolved"));
    });
    
// Get book details based on author using promises
public_users.get('/async-get-books/author/:author',function (req, res) {
    const get_books = new Promise((resolve, reject) => {
        // Extract the author parameter from the request URL
        const author = req.params.author;
        const result = [];        
          
        for (let key in books) {
            if (books[key].author === author) {
                result.push(books[key]);
            }
        }
        resolve(res.status(200).json(result));
        });
        
        get_books.then(() => console.log("Promise for Task 12 resolved"));
    });
    
    // Get book details based on author
    public_users.get('/author/:author',function (req, res) {
        // Extract the author parameter from the request URL
        const author = req.params.author;
        const result = [];
        
        for (let key in books) {
        if (books[key].author === author) {
            result.push(books[key]);
        }
    }
    // return res.send(result);
    return res.status(200).json(result);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    // Extract the title parameter from the request URL
    const title = req.params.title;
    const result = [];

    for (let key in books) {
        if (books[key].title === title) {
            result.push(books[key]);
        }
    }
    // return res.send(result);
    return res.status(200).json(result);
});

// Get book details based on title using promises
public_users.get('/async-get-books/title/:title',function (req, res) {
    const get_books = new Promise((resolve, reject) => {
        // Extract the author parameter from the request URL
        const title = req.params.title;
        const result = [];        
          
        for (let key in books) {
            if (books[key].title === title) {
                result.push(books[key]);
            }
        }
        resolve(res.status(200).json(result));
        });
        
        get_books.then(() => console.log("Promise for Task 13 resolved"));
    });

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    return res.send(books[isbn].reviews); 
});

module.exports.general = public_users;
