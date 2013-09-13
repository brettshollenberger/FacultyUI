angular
  .module('app')
  .filter('timeRemaining', function() {
    return function(date) {

      // The date constructor returns the current time if passed with no arguments
      var currentDateTime = new Date();

      // If passed with a string argument, which our endDate is stored as, it
      // returns a datetime object instantiated with the datetime from the string
      var endDate = new Date(date);

      // Time remaining will be computed in milliseconds
      var timeRemaining = endDate - currentDateTime;

      // Translate to seconds using the /= assignment operator, which divides
      // by 1000 and assigns the result back to the timeRemaining var
      timeRemaining /= 1000;

      // Use helper methods to determine how much time remains, and return in
      // humanized language
      if (oneSecondRemaining(timeRemaining)) {
        
        return "one second";

      } else if (secondsRemaining(timeRemaining)) {
        
        return timeRemaining + " seconds";

      } else if (oneMinuteRemaining(timeRemaining)) {

        return "one minute";

      } else if (minutesRemaining(timeRemaining)) {

        // Translate seconds to minutes
        return (Math.ceil(timeRemaining / 60)) + " minutes";

      } else if (oneHourRemaining(timeRemaining)) {

        return "one hour";

      } else if (hoursRemaining(timeRemaining)) {

        // Translate seconds to hours
        return (Math.ceil(timeRemaining / 3600)) + " hours";

      } else if (daysRemaining(timeRemaining)) {

        // Translate seconds to days
        return (Math.ceil(timeRemaining / 86400)) + " days";

      } else {

        return "completed";

      }

    };
  });

// Define the helper methods for the timeRemaining filter
function oneSecondRemaining(timeRemaining) {
  return timeRemaining === 1;
}

function secondsRemaining(timeRemaining) {
  return timeRemaining >= 2 && timeRemaining <= 59;
}

function oneMinuteRemaining(timeRemaining) {
  // Two minutes == 120 seconds
  return timeRemaining >= 60 && timeRemaining <= 119;
}

function minutesRemaining(timeRemaining) {
  // 3600 seconds == 1 hour
  return timeRemaining >= 120 && timeRemaining <= 3599;
}

function oneHourRemaining(timeRemaining) {
  // 7200 seconds == 2 hours
  return timeRemaining >= 3600 && timeRemaining <= 7200;
}

function hoursRemaining(timeRemaining) {
  // 86400 seconds == 1 day
  return timeRemaining >= 7200 && timeRemaining <= 86399;
}

function daysRemaining(timeRemaining) {
  // 604800 seconds == 1 week
  return timeRemaining >= 86400;
}
