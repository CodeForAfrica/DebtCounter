/**
 * debtcounter/data.js
 */

DebtCounter.data = {
  source: '/data/publicdebt.csv',
  fetch: function () {},
  json: {},
  million: Math.pow(10,6)
};

DebtCounter.data.fetch = function () {

  Papa.parse( DebtCounter.data.source, {
    download: true,
    header: true,
    dynamicTyping: true,
    complete: function(results) {
      DebtCounter.data.json = results.data;
      DebtCounter.counter.rate.calculate();
      return results;
    }
  });

  return this.json;
};

