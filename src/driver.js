'use strict';

const events = require('./events');


function driver(data) {
  let dataFromVendor = data;
  setTimeout(() => {
    console.log(`DRIVER: picked up ${dataFromVendor.orderID}`);
    events.emit('in-transit', dataFromVendor);
  }, 1000);

  setTimeout(() => {
    console.log(`DRIVER: delivered up ${dataFromVendor.orderID}`);
    events.emit('delivered', dataFromVendor);
  }, 3000);

}

module.exports = driver;