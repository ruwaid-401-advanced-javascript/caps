'use strict';

const faker = require('faker');
const net = require('net');


const client = new net.Socket();
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

client.connect(PORT, HOST, () => { console.log('Vendor got connected') });

client.on('data', function (data) {
  let eventObj = JSON.parse(data);
  if (eventObj.event === "delivered") {
    console.log(`Thank you ${eventObj.payload.orderID}`);
  }
});



let data = {};

function sendMessage(data) {
  let event = JSON.stringify({ event: 'pickup', time: new Date(), payload: data });
  client.write(event);
}

function generatData() {
  data = {
    storeName: process.env.STORENAME || 'no store',
    customerName: faker.name.findName(),
    orderID: faker.random.uuid(),
    address: faker.address.streetAddress(),
  };
  sendMessage(data);
}

let five = setInterval(() => { generatData() }, 5000);

client.on('close', function () {
  clearInterval(five);
  console.log('Vendor Connection got closed');
});

client.on('error', (e) => {
  console.log('Vendor ERROR', e);
});