const UsersData = require('./users.json');

const mockFindOne = (Instance: any, where: object) => {
  if(!where) { 
    return Instance[0];
  }

  const entries = Object.entries(where);
  let result: object = {};
  
  entries.forEach((entry) => {
    const [key, value] = [entry[0], entry[1]];
    
    const index = Instance.findIndex((item: any) => !!item[key] && item[key] === value);
    if(index !== -1) {
      result = Instance[index];
    }
  });
  
  return result;
};

const User = {
  findAll: async () => UsersData,
  findOne: async (where: object) => mockFindOne(UsersData, where),
};

module.exports = {
  User
};
