import React, { useState } from 'react';
import { useQuery, useLazyQuery, gql } from '@apollo/client';

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

const DisplayData = () => {
  const [movieSearched, setMovieSearched] = useState('');
  const { data: userData } = useQuery(QUERY_ALL_USERS);
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);
  const [fetchMovie, { data: movieSearchedData, error: movieError }] = useLazyQuery(GET_MOVIE_BY_NAME);

  if (movieError) {
    console.log(movieError);
  }

  return (
    <div>
      <h1>List of Users</h1>
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
