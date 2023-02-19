# Practica_Fund_Backend
Practice corresponding to the Fundamentals Backend, Node.js &amp; MongoDB module



## General info
Used Framework: Express

```sh
npx express-generator nodeapp --ejs
```

Install dependencies:

```sh
npm install 
```

Script development mode set to cross-platform with croos-env, and default starts at port 3000 and directly with nodemom.

```sh
"dev": "cross-env SET DEBUG=nodepop:* 3000 nodemon ./bin/www"
```

Install Mongoose in API path:
```sh
npm i mongoose
```

Create a connection file with mongoose:
    In API path create a folder called "lib" and create a file called "connectMongoose.js" inside with:
    
    ```sh

        const mongoose = require('mongoose');

        mongoose.set('strictQuery', false);

        mongoose.connection.on('error', err => {
            console.log('Error de conexión ', err);
        });

        mongoose.connection.once('open', () => {
            console.log('Conectado a MongoDB en ', mongoose.connection.name);
        });

        mongoose.connect('mongodb://127.0.0.1:27017/nodepop');

        module.exports = mongoose.connection;

```


## Start a MongoDB Server in Macos or Linux

In the console go to MongoDB folder and:

```sh
./bin/mongod --dbpath ./data
```

### API starts

Open a terminal and go to the API path "../nodepop>" and type "npm run" to run the API.
For developer mode, type npm run dev to start server

