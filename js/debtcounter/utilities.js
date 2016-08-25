function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

function commarize()
{
  // 1e6 = 1 Million, begin with number to word after 1e6.
  if (this >= 1e6)
  {
    var units = 
    [
      "Million",
      "Billion",
      "Trillion",
      "Quadrillion",
      "Quintillion",
      "Sextillion",
      "Septillion",
      "Octillion"
      // ... Put others here, you can look them up here:
      // http://bmanolov.free.fr/numbers_names.php
      // If you prefer to automate the set of numbers, look at the number vocabulary:
      // https://gist.github.com/MartinMuzatko/1b468b7596c71e83838c
      // Javascript allows plain numbers to a maximum of ~1.79e308
    ]

    // Divide to get SI Unit engineering style numbers (1e3,1e6,1e9, etc)
    var unit = Math.floor((this / 1000).toFixed(0).toString().length)
    // Calculate the remainder. 1,000,000 = 1.000 Mill
    var num = (this / ('1e'+(unit+2))).toFixed(3)
    var unitname = units[Math.floor(unit / 3) - 1]
    // output number remainder + unitname
    return num + ' ' + unitname
  }

  // Split floating number
  var parts = this.toString().split(".")
  // Only manipulate first part (not the float number)
  // If you prefer europe style numbers, you can replace . with ,
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  return parts.join(".")
}

// Add method to prototype. this allows you to use this function on numbers and strings directly
Number.prototype.commarize = commarize
String.prototype.commarize = commarize

