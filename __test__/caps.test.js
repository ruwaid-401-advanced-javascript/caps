
require('../caps');
const events = require('../src/events');

let consoleSpy = jest.spyOn(console, 'log').mockImplementation();

describe('events middleware', () => {

  it('event delivered', () => {
    let data = {
      storeName: 'test store',
      customerName: 'test name',
      orderID: 'test orderID',
      address: 'test address',
    };

    let expected = {
      event: 'delivered',
      time: new Date(),
      payload:
      {
        storeName: 'test store',
        customerName: 'test name',
        orderID: 'test orderID',
        address: 'test address',
      },
    };
    events.emit('delivered', data);
    expect(consoleSpy).toHaveBeenCalledWith(expected);
  });

  it('event pickup', () => {
    let data = {
      storeName: 'test store',
      customerName: 'test name',
      orderID: 'test orderID',
      address: 'test address',
    };
    events.emit('pickup', data);

    expect(consoleSpy).toHaveBeenCalled();
  });

  it('event in-transit', () => {
    let data = {
      storeName: 'test store',
      customerName: 'test name',
      orderID: 'test orderID',
      address: 'test address',
    };

    let expected = {
      event: 'in-transit',
      time: new Date(),
      payload:
      {
        storeName: 'test store',
        customerName: 'test name',
        orderID: 'test orderID',
        address: 'test address',
      },
    };
    events.emit('in-transit', data);
    expect(consoleSpy).toHaveBeenCalledWith(expected);
  });
});