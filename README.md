# Basic fullstack project
Welcome to this sample backend repository, which includes foundational APIs for user authentication, such as signup and login functionalities. This backend interacts seamlessly with a local PostgreSQL database to manage user data and ensure secure, reliable access. It serves as a basic yet powerful framework for building scalable authentication systems and can easily be extended or integrated with other services for further enhancements.

## Requied packages
- NodeJS -> For Javascript environment
- Express -> To build the server
- pg -> To connect to Postgrest

All the packages are listed in `package.json`, use the ```npm install``` to install the packages. Make sure to install the `NodeJS` before installing the packages.

Install postgres and create the DB according to the information mentioned inside the ```db.js```.

## run the backend server
To run the server use ```npm start```, it will run the server on port 3023(as mentioned in code).

## Hit APIs using Postman
Registration API:

POST `http://localhost:3020` 
```
{
    "fullname":"Your name",
    "username":"Username",
    "email":"email@gmail.com",
    "password":"password"
}
```

for success scenario, you get response something like:

```
{
    "status_code": 201,
    "message": "Success"
}
```

Enhance this project to the next level, happy coding.