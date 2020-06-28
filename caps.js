'use strict';

require('dotenv').config();


const events = require('./src/events');
const driver = require('./src/driver');
require('./src/vendor');


events.on('pickup', payload => all('pickup', payload));
events.on('in-transit', payload => logIt('in-transit', payload));
events.on('delivered', payload => logIt('delivered', payload));

function logIt(event, payload) {
  let time = new Date();
  console.log({ event, time, payload });
}

function all(event, payload) {
  logIt(event, payload);
  driver(payload);
  setTimeout(() => {
    console.log('VENDOR: Thank you');
  }, 5000);
}
