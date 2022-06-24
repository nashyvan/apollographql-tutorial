const UserList = [
  {
    id: 1,
    name: 'Nick',
    age: 42,
    nationality: 'UKRAINE',
    friends: [
      {
        id: 2,
        name: 'John',
        age: 24,
        nationality: 'GERMANY',
      },
    ],
  },
  {
    id: 2,
    name: 'John',
    age: 24,
    nationality: 'GERMANY',
  },
  {
    id: 3,
    name: 'Mike',
    age: 20,
    nationality: 'US',
    friends: [
      {
        id: 1,
        name: 'Nick',
        age: 42,
        nationality: 'UKRAINE',
      },
    ],
  },
];

const MovieList = [
  {
    id: 1,
    name: 'Interstellar',
    yearOfPublication: 2014,
    isInTheaters: true,
  },
  {
    id: 2,
    name: 'My favorite movie',
    yearOfPublication: 2003,
    isInTheaters: false,
  },
  {
    id: 3,
    name: 'Viena and the Fantomes',
    yearOfPublication: 2020,
    isInTheaters: true,
  },
];

module.exports = { UserList, MovieList };
