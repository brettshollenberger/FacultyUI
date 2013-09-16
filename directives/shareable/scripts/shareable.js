angular
  .module('app')
  .directive('shareable', function($location) {
    return {
      restrict: 'E',
      priority: 0,
      replace: false,
      templateUrl: 'app/templates/components/shareable.html',
      scope: {
        shareable: "@"
      },
      controller: function($scope) {
        $scope.shareableNetworks = [];

        this.addFacebook = function() {
          $scope.shareableNetworks.push("Facebook");
        };

        this.addTwitter = function() {
          $scope.shareableNetworks.push("Twitter");
        };
      },
      link: function(scope, element, attr) {
        scope.absUrl = $location.absUrl().replace(/#/, '');

        // n complexity function mimicking Ruby's include? function
        include = function(array, what) {
          for (i = 0; i < array.length; i++) {
            if (array[i] == what) {
              return true;
            }
          }
          return false;
        };

        scope.inShareableNetworks = function(network) {
          return include(scope.shareableNetworks, network);
        };

      }
    };
  });

