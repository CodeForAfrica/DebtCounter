/**
 * debtcounter/counter.js
 */

DebtCounter.counter = {
  id: 'counter-numbers',
  element: '',
  initial: 3312105.52 * DebtCounter.data.million,

  rate: {
    time: 100,   // Time between change in milliseconds
    amount: 1, // Amount to change within time above
    calculate: function () {}
  },

  amount: {
    current: 0,
    calculate: function () {}
  },

  update: function () {},
  count: function () {}
};

DebtCounter.counter.element = document.getElementById( DebtCounter.counter.id )
DebtCounter.counter.element.innerHTML = numberWithCommas( DebtCounter.counter.initial );


DebtCounter.counter.rate.calculate = function () {
  var rate = 1;
  var sum = 0;

  var rows_missing = 3;
  var months = 6;
  
  var data = DebtCounter.data.json;

  for (var i = data.length - 1 - rows_missing; i >= data.length - 1 - (rows_missing + months); i--) {
    var change = Math.abs(Number(data[i].total) - Number(data[i-1].total));
    sum = sum + (change * Math.pow(10,6));
  }
  rate = (sum / months) / (30 * 24 * 60 * 60 * 1000); // each millisecond
  this.amount = rate * this.time;

  DebtCounter.counter.amount.calculate();

};


DebtCounter.counter.amount.calculate = function () {
  var rows_missing = 3;

  var data = DebtCounter.data.json;
  var recent_data = data[data.length - 1 - rows_missing];

  this.current = recent_data.total * Math.pow(10,6);

  var time_then = moment(recent_data.month, "MMM-YY");
  var diff = Math.abs(time_then.diff(moment()));

  var rate = DebtCounter.counter.rate;

  this.current = this.current + (rate.amount * (diff / rate.time));

  // Counter
  DebtCounter.counter.count = setInterval(DebtCounter.counter.update, DebtCounter.counter.rate.time);

};


DebtCounter.counter.update = function () {
  DebtCounter.counter.amount.current = DebtCounter.counter.amount.current + DebtCounter.counter.rate.amount;
  var amount = parseInt( DebtCounter.counter.amount.current );
  DebtCounter.counter.element.innerHTML = numberWithCommas(amount);
};

