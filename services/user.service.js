const faker = require('faker');
const boom = require('@hapi/boom');

class UsersService {
  constructor() {
    this.users = [];
    this.generate();
  }

  generate() {
    const limit = 20;
    for (let index = 0; index < limit; index++) {
      this.users.push({
        id: faker.datatype.uuid(),
        name: `Nombre ${index + 1}`,
        lastName: `Apellido ${index + 1}`,
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  create(data) {
    const newUser = {
      id: faker.datatype.uuid(),
      ...data,
    };

    this.users.push(newUser);
    return newUser;
  }

  find() {
    return this.users;
  }

  findOne(id) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw boom.notFound('User not found');
    }

    if (user.isBlock) {
      throw boom.conflict('User is block');
    }

    return user;
  }

  update(id, changes) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw boom.notFound('User not found');
    }

    const user = this.users[index];
    this.users[index] = {
      ...user,
      ...changes,
    };

    return this.users[index];
  }

  delete(id) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw boom.notFound('User not found');
    }

    this.users.splice(index, 1);
    return { id };
  }
}

module.exports = UsersService;
