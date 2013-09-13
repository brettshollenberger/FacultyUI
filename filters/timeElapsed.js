angular
  .module('app')
  .filter('timeElapsed', function() {
    return function(date) {
      // The date constructor returns the current time if passed with no arguments
      var currentDateTime = new Date();

      // If passed with a string argument, which our dateCreated is stored as, it
      // returns a datetime object instantiated with the datetime from the string
      var dateCreated = new Date(date);

      // Time remaining will be computed in milliseconds
      var timeElapsed = currentDateTime - dateCreated;

      // // Strftime returns the name of the day of the week
      // var today = strftime('%A', currentDateTime);

      // var created = strftime('%A', dateCreated);

      // Use for reference checking
      var days = {
        "Monday": 1,
        "Tuesday": 2,
        "Wednesday": 3,
        "Thursday": 4,
        "Friday": 5,
        "Saturday": 6,
        "Sunday": 7
      };

      // Translate to seconds using the /= assignment operator, which divides
      // by 1000 and assigns the result back to the timeElapsed var
      timeElapsed /= 1000;

      // Use helper methods to determine how much time remains, and return in
      // humanized language
      if (justNow(timeElapsed)) {
        
        return "just now";

      } else if (secondsAgo(timeElapsed)) {
        
        return timeElapsed + " seconds ago";

      } else if (oneMinuteAgo(timeElapsed)) {

        return "one minute ago";

      } else if (minutesAgo(timeElapsed)) {

        // Translate seconds to minutes
        return (Math.ceil(timeElapsed / 60)) + " minutes ago";

      } else if (oneHourAgo(timeElapsed)) {

        return "one hour ago";

      } else if (hoursAgo(timeElapsed)) {

        // Translate seconds to hours
        return (Math.ceil(timeElapsed / 3600)) + " hours ago";

      } else if (daysAgo(timeElapsed)) {

        // Translate seconds to days
        return (Math.ceil(timeElapsed / 86400)) + " days ago";

      } else {

        return "completed";

      }

    };
  });

// Define the helper methods for the timeElapsed filter
function justNow(timeElapsed) {
  return timeElapsed === 1;
}

function secondsAgo(timeElapsed) {
  return timeElapsed >= 2 && timeElapsed <= 59;
}

function oneMinuteAgo(timeElapsed) {
  // Two minutes == 120 seconds
  return timeElapsed >= 60 && timeElapsed <= 119;
}

function minutesAgo(timeElapsed) {
  // 3600 seconds == 1 hour
  return timeElapsed >= 120 && timeElapsed <= 3599;
}

function oneHourAgo(timeElapsed) {
  // 7200 seconds == 2 hours
  return timeElapsed >= 3600 && timeElapsed <= 7200;
}

function hoursAgo(timeElapsed) {
  // 86400 seconds == 1 day
  return timeElapsed >= 7200 && timeElapsed <= 86399;
}

function daysAgo(timeElapsed) {
  // 604800 seconds == 1 week
  return timeElapsed >= 86400;
}
