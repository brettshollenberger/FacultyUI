angular
  .module('app')
  .filter('cheddar', function() {
    return function(money) {
      // Reverse string, and for every three digits,
      // add a comma, then return the string to normal
      var cheddar = money
        .toString()
        .split("")
        .reverse()
        .join("")
        .replace(/\d{3}/, function(digits) { 
          return digits + ",";
        })
        .split("")
        .reverse()
        .join("");

      return "$" + cheddar;
    };
  });
