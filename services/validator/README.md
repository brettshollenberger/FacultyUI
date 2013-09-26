= Validator

The Validator suite provides a group of tools for building RESTful forms and implementing validations with custom messages in Angular. 

Here's an example implementation from one of our applications:

  <form name="QuoterToolForm" novalidate>
    <div form-group form="QuoterToolForm">
                  
      <div class="row">
        <div class="span5">

          <label>Total Cost</label>
          <input form-field type="text" id="cost" ng-model="quoteCost" ng-disabled="!canEdit" name="cost" simple-validate="{numericality: {exp: 'Validator.validateCash($value, QuoterToolForm.cost)', message: 'Must be a number'}}" required ng-blur="Validator.validateField(QuoterToolForm.cost, QuoterToolForm)">
          
          <div ng-show="QuoterToolForm.FacultyErrors.cost" class="alert alert-error alert-tooltip">
              {{QuoterToolForm.FacultyErrors.cost}}
          </div>
          ...
          ...
          ...
        </div>
      </div>
    </div>
  </form>

1) We tap into ngForm via the name attribute on our form tag, and set novalidate so HTML doesn't try to perform our validations for us.

2) `form-group`s group form fields, and add the class `formGroupFinished` when all fields meet required validations. You can tap into this class to style sections of your form differently when a form group is complete.

3) `form-group`s look for all associated `form-field` directives to capture. Fields without this directive will not be considered when a `form-group` decides whether or not it is valid.

4) The `name` attribute on an input field associates it with ngForm.

5) The `simple-validate` directive takes an object, whose properties are also objects. Each object binds a Javascript expression to the `exp` property, which will evaluated for validity. The `message` property on the object will set the error message for invalid fields.

6) Error properties can be accessed on the form's FacultyErrors object. In the example above, if the field is not filled out, `QuoterToolForm.FacultyErrors.cost` contains the message "Field required"; if the value is not numerical, it contains the error "Must be a number." You'll notice certain error messages, like the message for required, are built-in, but you can override them if you like. 

7) We prefer to use `ng-blur` to validate fields. If a user has entered an incorrect value, they'll be notified when they fire a blur event. You can tap into any of Angular's directive-oriented events via the Validator's `validateField` method. In practice, we prefer to add the Validator object to the `$rootScope` so it is accessible from anywhere. 

8) Validator also features a `validateForm` method, which you can set on your submit button, or in a controller action. `validateForm` returns true if the form is valid, or false if it's invalid, and it will mark all fields as dirty if the form is invalid, so your error messages will be displayed to the user. By default, the `validateForm` method will scroll to the top of the page to show the user any errors, but you can also tap into hash change events to have the form scroll to the invalid fields, provided you use an ID set to the same name as the field's name element. 
