const _ = require('lodash');
const { UserList, MovieList } = require('../FakeData');

const resolvers = {
  Query: {
    // USER RESOLVERS
    users: () => UserList,
    user: (parent, args) => {
      const { id } = args;
      const user = _.find(UserList, { id: Number(id) });
      return user;
    },
    // MOVIE RESOLVERS
    movies: () => MovieList,
    movie: (parent, args) => {
      const { name } = args;
      const movie = _.find(MovieList, { name });
      return movie;
    },
  },
  User: {
    favoriteMovies: () => {
      return _.filter(MovieList, (movie) => movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010);
    },
  },
};

module.exports = { resolvers };
