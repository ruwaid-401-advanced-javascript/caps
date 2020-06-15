'use strict';

const faker = require('faker');
const events = require('./events');

setInterval(() => {
  let data = {
    storeName: process.env.STORENAME || 'FOREVERYTHING STORE',
    customerName: faker.name.findName(),
    orderID: faker.random.uuid(),
    address: faker.address.streetAddress(),
  };
  events.emit('pickup', data);
}, 5000);

