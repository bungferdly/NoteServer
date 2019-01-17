# NoteServer
A sample server with RESTful API for training and development purpose. 
Built on top of [json-server](https://github.com/typicode/json-server).

### Getting Started

```
> git clone https://github.com/bungferdly/NoteServer.git
> cd NoteServer
> yarn
> node server.js
```

Use [postman](https://www.getpostman.com/) for desktop or something similar, or your development HTTP client.

### API
```
baseUrl: http://localhost:3000
```

#### Login
```
POST /login
headers: {
  Authorization: Basic am9objoxMjM0 (username: john, password: 1234)
}
```

####  Notes
This API using basic json-server [routes](https://github.com/typicode/json-server#routes) format with token, for example : 
```
GET /notes?_page=1&_limit=10&_sort=id&order=desc
headers: {
  x-access-token: {token from login response}
}
```
