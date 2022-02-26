const faker = require('faker');
const boom = require('@hapi/boom');

class OrdersService {
  constructor() {
    this.orders = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.orders.push({
        id: faker.datatype.uuid(),
        name: `Order ${index + 1}`,
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  create(data) {
    const newOrder = {
      id: faker.datatype.uuid(),
      ...data,
    };

    this.orders.push(newOrder);
    return newOrder;
  }

  find() {
    return this.orders;
  }

  findOne(id) {
    const order = this.orders.find((order) => order.id === id);
    if (!order) {
      throw boom.notFound('Order not found');
    }

    if (order.isBlock) {
      throw boom.conflict('Order is block');
    }

    return order;
  }

  update(id, changes) {
    const index = this.orders.findIndex((order) => order.id === id);
    if (index === -1) {
      throw boom.notFound('Order not found');
    }

    const order = this.orders[index];
    this.orders[index] = {
      ...order,
      ...changes,
    };

    return this.orders[index];
  }

  delete(id) {
    const index = this.orders.findIndex((order) => order.id === id);
    if (index === -1) {
      throw boom.notFound('Order not found');
    }

    this.orders.splice(index, 1);
    return { id };
  }
}

module.exports = OrdersService;
