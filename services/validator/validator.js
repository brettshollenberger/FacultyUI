angular
  .module('app')
  .factory('Validator',
  function($location, $anchorScroll) {

    var isEmpty = function(x) {
      for (var y in x) {
        return false;
      }
      return true;
    };

    var Validator = {

      validationMessages: {
        numericality: "Must be a number.",
        required: "This field is required.",
        zip: "A five or nine digit zip code is required.",
        email: "Please enter a valid email address.",
        phone: "Please enter a valid phone number."
      },

      validateCash: function(number, field) {
        if (typeof number === 'string') {
            if (!isNaN(Number(number)) && number.length > 0) {
                return true;
            } else {
                number = number.replace(/[,$]/g, "");
                if (!isNaN(Number(number)) && number.length > 0) {
                    field.$modelValue = number;
                    return true;
                }
            }
        }
        return false;
      },

      validateZip: function(zip) {
        if (/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip)) return true;
        return false;
      },

      validateState: function(state) {
        if (/^(A[LKSZRAEP]|C[AOT]|D[EC]|F[LM]|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEHINOPST]|N[CDEHJMVY]|O[HKR]|P[ARW]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY])$/.test(state)) return true;
        return false;
      },

      validateForm: function(form) {
        var errors = form.FacultyErrors = {};
        for (var f in form) {
          var field = form[f];
          if (typeof field.$error === 'object') {
            for (var key in field.$error) {
              if (field.$error[key] === true)  {
                if (this.validationMessages[key]) {
                  errors[field.$name] = this.validationMessages[key];
                } else {
                  errors[field.$name] = key.toString();
                }
              }
            }
          }
        }
        if (!isEmpty(errors)) {
          form.FacultyErrors = errors;
          // Errors will display when the form fields are
          // dirty and invalid. If a user has missed a field,
          // the input will be invalid, but pristine. If we
          // automatically set the whole field to dirty,
          // the missed fields will be revealed.
          form.$setDirty();
          $location.hash('city');
          $anchorScroll();
          return false;
        }
        return true;
      }

    };
    return Validator;
  }
);
