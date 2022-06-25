const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
      id: ID!
      name: String!
      username: String!
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
  
  input CreateUserInput {
      name: String!
      username: String!
      age: Int!
      nationality: Nationality = UKRAINE
  }

  input UpdateUsernameInput {
      id: ID!
      newUsername: String!
  }
  
  input UpdateAgeInput {
      id: ID!
      newAge: Int!
  }
  
  type Mutation {
      createUser(input: CreateUserInput!): User
      updateUsername(input: UpdateUsernameInput!): User
      updateAge(input: UpdateAgeInput!): User
      deleteUser(id: ID!): User
  }
  
  enum Nationality {
      UKRAINE
      GERMANY
      US
  }
`;

module.exports = { typeDefs };
