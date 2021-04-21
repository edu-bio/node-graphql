/*var express = require('express');
const { graphqlHTTP } = require('express-graphql'); 
var {buildSchema} = require('graphql');

var schema = buildSchema(`
type Libro {
    id: Int
    isbn: Int
    titulo: String
}

type Query {
    libros: [Libro]
    libro(id: Int): Libro
}

type Mutation {
    addLibro(titulo: String, id: Int): Libro
}
`);

var libros = [];
var counter=1;

//Para resolver peticiones
var root = {
    libros: () => { return libros;},
    libro: (data) => {
        for (var i=0;i<libros.length; i++)
        if(libros[i].id==data.id)
        return libros[i];

        return null;
    },

    addLibro: (data) => {
        var l= { 'id': counter, 'titulo':data.titulo, 'isbn':data.isbn};
        libros.push(l);
        counter++;
        return l;
    },
};

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphql: true,
}));

app.listen(4000);
console.log('Corriendo GraphQL API en puerto 4000');
*/

const { GraphQLServer } = require("graphql-yoga");
const fetch = require("node-fetch");


const baseURL = "http://localhost:3001";

const resolvers = {
  Query: {
    libros: () => {
      return fetch(`${baseURL}/libros`).then(res => res.json());
    },
    libro: (parent, args) => {
      const { id } = args;
      return fetch(`${baseURL}/libros/${id}`).then(res => res.json());
    },
  },
};

const server = new GraphQLServer({
//   typeDefs: typeDefs,
typeDefs: './src/schema.graphql',
  resolvers
});

server.start(() => console.log(`Servidor corriendo en http://localhost:4000`));
