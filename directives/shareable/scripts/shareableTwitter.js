angular
  .module('app')
  .directive('shareableTwitter', function($location) {
    return {
      restrict: 'A',
      // Load the shareable attributes in a slightly higher priority
      // than the main shareable module, so that all shareable
      // attributes are loaded in the main shareable link function
      priority: 1,
      replace: true,
      require: "^shareable",
      link: function(scope, element, attrs, shareableController) {
        shareableController.addTwitter();
        scope.absUrl = $location.absUrl().replace(/#/, '');

        // If no image is specified, it falls back on the FontAwesome icon
        // in the layout
        scope.twitterImage = attrs.shareableTwitter || null;
      }
    };
  });
