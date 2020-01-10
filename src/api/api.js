const URL_USERS = 'https://my-json-server.typicode.com/AnnaGerdii/users-table/users';

export const getUsersFromServer = async() => {
  const users = await fetch(URL_USERS);

  return users.json();
};
