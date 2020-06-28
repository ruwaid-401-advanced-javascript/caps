'use strict';

const net = require('net');

const client = new net.Socket();
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

client.connect(PORT, HOST, () => { console.log('Driver got connected'); });

let three;
let one;
client.on('data', function (data) {
  let event = JSON.parse(data);
  if (event.event !== 'in-transit' && event.event !== 'delivered') {
    let dataFromVendor = event;
    one = setTimeout(() => {
      console.log(`picked up ${dataFromVendor.payload.orderID}`);
      client.write(JSON.stringify({ event: 'in-transit', time: new Date(), payload: event.payload }));
    }, 1000);

    three = setTimeout(() => {
      console.log(`delivered up ${dataFromVendor.payload.orderID}`);
      client.write(JSON.stringify({ event: 'delivered', time: new Date(), payload: event.payload }));
    }, 3000);
  }
});

client.on('close', function () {
  clearTimeout(one);
  clearTimeout(three);
  console.log('Driver Connection got closed');
});

client.on('error', (e) => {
  console.log('Driver ERROR', e);
});
