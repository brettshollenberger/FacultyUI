angular
  .module('app')
  .factory('FormHelper', function($location, $anchorScroll) {
    var FormHelper = {
      showError: function(property) {
        return property.$invalid && property.$dirty;
      },
      showSuccess: function(property) {
        return property.$valid && property.$dirty;
      },
      // form.setDirty() exists in v1.1 of Angular, but unfortunately
      // we can't fallback on the default functionality through
      // type checking because form.setDirty() doesn't work in 1.0.7
      // (and maybe other versions).
      setDirty: function(form) {
        for (var i in form) {
          var input = form[i];
          if (input.$pristine) {
            input.$pristine = false;
            input.$dirty = true;
          }
        }
      },
      // The same issue exists with form.setPristine().
      setPristine: function(form) {
        for (var i in form) {
          var input = form[i];
          if (input.$dirty) {
            input.$pristine = true;
            input.$dirty = false;
          }
        }
      },
      validateForm: function(form) {
        var errors = [];
        for (f in form) {
          var field = form[f];
          if (field.$error) {
            errors.push(field.$name);
          }
        }
        // We can move to a particular error message, if desired,
        // and if the field has an ID equal to its name attribute.
        // $location.hash(errors[0]);

        // Errors will display when the form fields are
        // dirty an invalid. If a user has missed a field,
        // the input will be invalid, but pristine. If we
        // automatically set the whole field to dirty,
        // the missed fields will be revealed.
        this.setDirty(form);
        $anchorScroll();
      },
      create: function(form, model, callback) {
        if (form.$valid) {
          model.$save(function(resource) {
            callback();
          });
        } else {
          this.validateForm(form);
        }
      },
      update: function(form, model, callback) {
        if (form.$valid) {
          model.$update(function(resource) {
            callback();
          });
        } else {
          this.validateForm(form);
        }
      }
    };
    return FormHelper;
  });
