angular
  .module('app')
  .directive('imagePicker', function($rootScope) {
    return {
      restrict: 'A',
      replace: true,
      scope: {
        imagePicker: '='
      },
      templateUrl: 'templates/imagepicker.html',
      link: function(scope, element, attrs) {

        // The imagePicker attribute of our directive is intended to set 
        // the name of the model attribute that exists on the scope that
        // we're going to tap into. 
        Model = scope.imagePicker;

        // If no defaultImg attr is set, we fall back on undefined
        // because in Javascript trying to access a non-existent 
        // property on an object returns undefined.
        defaultImage = attrs.defaultImg || undefined;

        // In Edit context, the model may already have an image set. 
        if (!Model.image) {
          Model.image = defaultImage;
        }

        // Whether the defautImg is an actual image or undefined,
        // if the two are set to the same thing, we'll want to use this
        // helper method in the DOM to display the Remove Image button 
        // instead of the Add Image button.
        scope.imageEqualsDefaultImage = function() {
          return Model.image == defaultImage;
        };

        scope.addImage = function() {
          filepicker.setKey('ACoTSGXT4Rj2XWKKTZAaJz');
          filepicker.pick({
            'mimetype': "image/*"
          }, function(InkBlob) {

            // Set the new image & blob to the Model object
            Model.image = InkBlob.url;
            Model.InkBlob = InkBlob;

            // Since Angular sets no $watch on the Image Picker,
            // we need to call the $digest cycle directly. We should
            // always call $apply instead of $digest, since $apply runs
            // the $digest cycle with error handling. We should also not
            // tap into this cycle in a controller context, as $digest cycles
            // will bump into one another and cause errors. 
            scope.$apply();
          });
        };

        scope.removeImage = function() {
          Model.image = defaultImage;
          Model.InkBlob = null;
          scope.$apply();
        };
      }
    };
  });
