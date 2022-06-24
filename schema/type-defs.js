const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
      id: ID!
      name: String!
      age: Int!
      nationality: Nationality
      friends: [User]
      favoriteMovies: [Movie]
  }
  
  type Movie {
      id: ID!
      name: String!
      yearOfPublication: Int!
      isInTheaters: Boolean!
  }
  
  type Query {
      users: [User]
      user(id: ID!): User
      movies: [Movie]
      movie(name: String!): Movie
  }
  
  enum Nationality {
      UKRAINE
      GERMANY
      US
  }
`;

module.exports = { typeDefs };
