import React, { useState } from 'react';
import { useQuery, useLazyQuery, useMutation, gql } from '@apollo/client';

const QUERY_ALL_USERS = gql`
    query GetAllUsers {
        users {
            id
            name
            username
            age
            nationality
        }
    }
`;

const QUERY_ALL_MOVIES = gql`
    query GetAllMovies {
        movies {
            id
            name
        }
    }
`;

const GET_MOVIE_BY_NAME = gql`
    query Movie($name: String!) {
        movie(name: $name) {
            name
            yearOfPublication
        }
    }
`;

const CREATE_USER_MUTATION = gql`
    mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) {
            id
            name
        }
    }
`;

const DisplayData = () => {
  const [movieSearched, setMovieSearched] = useState('');

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [age, setAge] = useState(0);
  const [nationality, setNationality] = useState('');

  const { data: userData, refetch: userRefetch } = useQuery(QUERY_ALL_USERS);
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);
  const [fetchMovie, { data: movieSearchedData, error: movieError }] = useLazyQuery(GET_MOVIE_BY_NAME);
  const [createUser] = useMutation(CREATE_USER_MUTATION)

  if (movieError) {
    console.log(movieError);
  }

  return (
    <div>
      <h1>List of Users</h1>
      <div>
        <input type="text" placeholder="Name" onChange={(event) => {
          setName(event.target.value);
        }} />
        <input type="text" placeholder="Username" onChange={(event) => {
          setUsername(event.target.value);
        }} />
        <input type="number" placeholder="Age" onChange={(event) => {
          setAge(event.target.value);
        }} />
        <input type="text" placeholder="Nationality" onChange={(event) => {
          setNationality(event.target.value.toUpperCase());
        }} />
        <button onClick={() => {
          createUser({variables: {input: { name, username, age: Number(age), nationality }}});
          userRefetch();
        }}>Create User</button>
      </div>
      {userData && userData.users.map((user) => {
        return (
          <div key={user.id}>
            <h2>name: { user.name }</h2>
            <h2>username: { user.username }</h2>
            <h2>age: { user.age }</h2>
            <h2>nationality: { user.nationality }</h2>
            <hr />
          </div>
        );
      })}

      <h1>List of Movies</h1>
      {movieData && movieData.movies.map((movie) => {
        return (
          <div key={movie.id}>
            <h2>name: { movie.name }</h2>
            <hr />
          </div>
        );
      })}

      <div>
        <input
          type="text"
          placeholder="Interstellar"
          onChange={(event) => {
            setMovieSearched(event.target.value);
          }}
        />
        <button onClick={() => { fetchMovie({ variables: { name: movieSearched } }) }}>Fetch Data</button>
        <div>
          {movieSearchedData
            && (
            <div>
              <h1>Movie Name: {movieSearchedData.movie.name}</h1>
              <h1>Year of Publication: { movieSearchedData.movie.yearOfPublication }</h1>
            </div>
            )}
          {movieError
            && <h1> error </h1>
          }
        </div>
      </div>
    </div>
  );
};

export default DisplayData;
