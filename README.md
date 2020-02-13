# Simple-Node

Simple-Node is a yeoman generator for rapid protopyping & scaffolding a nodejs + express API.

# Technologies

  - https://nodejs.org/ - Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.
  - https://expressjs.com/ - Fast, unopinionated, minimalist web framework for Node.js
  - https://sequelize.org/ - Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server. It features solid transaction support, relations, eager and lazy loading, read replication and more.
  - https://jwt.io/ - JSON Web Tokens are an open, industry standard RFC 7519 method for representing claims securely between two parties.
  - and more soon!!


### Installation & Usage

Install the generator

```sh
$ npm install -g yo
$ npm install -g generator-simple-node
```

For create an App run :

```sh
$ yo simple-node project_name
$ cd project_name 
$ npm install or yarn install
```
The generated project shuld look like this :
```
,-- src
|   |-- config
|   |   `-- config.js
|   |-- controllers
|   |   |-- UserController.js
|   |   `-- AuthController.js
|   |-- models
|   |   `-- User.js
|   |-- services
|   |   `-- UserService.js
|   |-- routes
|   |   |-- UserRoutes.js
|   |   `-- AuthRoutes.js
|   |-- db
|   |   |-- migrations
|   |   |  `-- create-user.js
|   |   `-- index.js
|   `-- utils
|       |-- AuthUtils.js
|       `-- Utils.js
|-- .env
|-- .gitignore
|-- .babelrc
|-- .sequelizerc
|-- package-lock.json
|-- package.json
`-- README.md
```
To Start the server run :

* this command shuld start the server on port **3009** and create an in-memory DB 

```sh
$ npm run dev
```

Then you can **POST** a user with this body :
```json
{
    "username": "demouser",
    "password": "demopassword"
}
```
To this route:
```sh
localhost:3009/api/v1/users
```
Then you can retrieve all the users , with a **GET** request to the same route.

# Use the scaffold sub-generator 
This subgenerator is used to create a model and his corresponding **Controller** , **Service** , **Route** and **Sequelize Migration**

For create a scaffold use:
* The model name is required
```sh
yo simple-node:scaffold Modelname
```

This command shuld generate :
```
 src
   |-- controllers
   |   `-- ModelnameController.js
   |-- models
   |   `-- Modelname.js
   |-- services
   |   `-- ModelnameService.js
   |-- routes
   |   `-- ModelnameRoutes.js
   |-- db
      `-- migrations
          `-- create-modelname.js

```

Next you need to link the generated routes to the app:
* This step is gonna be automaticaly generated in an upcomming version 

On the app.js add:
```sh
import newModelRoutes from './routes/Modelname';
```

and 

```sh
app.use('/api/v1/modelnames', newModelRoutes);
```

With this you can use your generated model API
```sh
GET localhost:3009/api/v1/modelnames
GET localhost:3009/api/v1/modelnames/:id
POST localhost:3009/api/v1/modelnames
PUT localhost:3009/api/v1/modelnames/:id
DELETE localhost:3009/api/v1/modelnames/:id
```


# To secure a route with jwt authentication

in the **app.js** file add the **AuthUtils** validateJwtToken method as middelwares to the route

Example: in app.js
```sh
import authUtils from './utils/AuthUtils';
app.use('/api/v1/todos', authUtils.validateJwtToken , newModelRoutes);
```

With this changes if go to the todos GET (**localhost:3009/api/v1/todos**) 
if you dont pass a valid token in the Authorization headers, the server shuld give you a **401 unauthorized** 

To get a valid token for secure routes you shuld use this route passing a previusly created username & password
```sh
POST localhost:3009/api/v1/authorization/login
```

### Todos

 - Dockerize the app
 - Testing with **Jest**
 - Mailing 
 - Reset password flow
 - Automate deploy
 - Circle CI (or another CI/CD tool)
 - and much more!!!

## License

MIT © [Jonathan Ramirez]()

**Free Software, Hell Yeah!**
