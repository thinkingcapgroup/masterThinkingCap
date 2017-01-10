function formFieldsValidation () {
  var validator = require('validator'),
      formFields = (document.getElementsByClassName('form-fields')[0]) ? document.getElementsByClassName('form-fields')[0] : null,
      usernameInput = (document.getElementById('username')) ? document.getElementById('username') : null,
      emailInput = (document.getElementById('email')) ? document.getElementById('email') : null,
      passwordInput = (document.getElementById('password')) ? document.getElementById('password'): null,
      passwordCheckInput = (document.getElementById('passwordCheck')) ? document.getElementById('passwordCheck') : null,
      displayNameInput = (document.getElementById('displayName')) ? document.getElementById('displayName') : null,
      userNameRequirements = (document.getElementById('username-requirements')) ? document.getElementById('username-requirements').children : null,
      emailRequirements = (document.getElementById('email-requirements')) ? document.getElementById('email-requirements').children : null,
      passwordRequirements = (document.getElementById('password-requirements')) ? document.getElementById('password-requirements').children : null,
      passwordCheckRequirements = (document.getElementById('passwordCheck-requirements')) ? document.getElementById('passwordCheck-requirements').children : null,
      displayNameRequirements = (document.getElementById('displayName-requirements')) ? document.getElementById('displayName-requirements').children : null;

  if (usernameInput) {
    usernameInput.addEventListener('input', function () { validateUserName(usernameInput, userNameRequirements); });
  }

  if (emailInput) {
    emailInput.addEventListener('input', function () { validateEmail(emailInput, emailRequirements); });
  }

  if (displayNameInput) {
    displayNameInput.addEventListener('input', function () { validateDisplayName(displayNameInput, displayNameRequirements); });
  }

  if (passwordInput) {
    passwordInput.addEventListener('input', function () { validatePasswords(passwordInput, passwordRequirements); });
  }

  if (passwordCheckInput) {
    passwordCheckInput.addEventListener('input', function () { validatePasswords(passwordCheckInput, passwordCheckRequirements); });
  }

  /**
   * validateUserName - Verifies whether the username input is invalid or valid
   *
   * @param  {Object} input - HTML username input element
   * @param  {Object} requirements - HTML username li elements
   */
  function validateUserName (input, requirements) {
    // if input.value is alphanumerical
    if (validator.isAlphanumeric(input.value)) {
      // set requirements to valid
      changeRequirementsValidation(input, requirements, true);
    }
    // else
    else {
      // set requirements to invalid
      changeRequirementsValidation(input, requirements, false);
    }
  }

  /**
   * validateEmail - Verifies whether the email input is invalid or valid
   *
   * @param  {Object} input - HTML email input element
   * @param  {Object} requirements - HTML email li elements
   */
  function validateEmail (input, requirements) {
    // if input.value is alphanumerical
    if (validator.isEmail(input.value)) {
      // set requirements to valid
      changeRequirementsValidation(input, requirements, true);
    }
    // else
    else {
      // set requirements to invalid
      changeRequirementsValidation(input, requirements, false);
    }
  }

  /**
   * validateDisplayName - Verifies whether the displayName input is invalid or valid
   *
   * @param  {Object} input - HTML displayName input element
   * @param  {Object} requirements - HTML displayName li elements
   */
  function validateDisplayName (input, requirements) {
    // if input.value is alphanumerical
    if (!validator.isEmpty(input.value)) {
      // set requirements to valid
      changeRequirementsValidation(input, requirements, true);
    }
    // else
    else {
      // set requirements to invalid
      changeRequirementsValidation(input, requirements, false);
    }
  }

  /**
   * validatePasswords - Verifies whether the password inputs are invalid or valid
   *
   * @param  {Object} input - HTML displayName input element
   * @param  {Object} requirements - HTML displayName li elements
   */
  function validatePasswords (input, requirements) {
    var passwordPatterns = {
          lowercase: /(?=.*[a-z])/,
          uppercase: /(?=.*[A-Z])/,
          charLength: /.{8,}/,
          numerical: /(?=.*\d)/,
          password: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
        },
        lowercaseRequirement = requirements[0],
        uppercaseRequirement = requirements[1],
        numericalRequirement = requirements[2],
        lengthRequirement = requirements[3];

    if (input.getAttribute('id') === 'passwordCheck') {
      var otherPasswordInput = document.getElementById('password'),
          matchRequirement = requirements[4];
    }

    // if input.value has a lowecase letter
    if (validator.matches(input.value, passwordPatterns.lowercase)) {
      // set requirements to valid
      lowercaseRequirement.classList.remove('invalid-input-requirement');
      lowercaseRequirement.classList.add('valid-input-requirement');
    }
    // else
    else {
      // set requirement to invalid
      lowercaseRequirement.classList.remove('valid-input-requirement');
      lowercaseRequirement.classList.add('invalid-input-requirement');
    }

    // if input.value has an uppercase letter
    if (validator.matches(input.value, passwordPatterns.uppercase)) {
      // set requirements to valid
      uppercaseRequirement.classList.remove('invalid-input-requirement');
      uppercaseRequirement.classList.add('valid-input-requirement');
    }
    // else
    else {
      // set requirement to invalid
      uppercaseRequirement.classList.remove('valid-input-requirement');
      uppercaseRequirement.classList.add('invalid-input-requirement');
    }

    // if input.value has a number
    if (validator.matches(input.value, passwordPatterns.numerical)) {
      // set requirements to valid
      numericalRequirement.classList.remove('invalid-input-requirement');
      numericalRequirement.classList.add('valid-input-requirement');
    }
    // else
    else {
      // set requirement to invalid
      numericalRequirement.classList.remove('valid-input-requirement');
      numericalRequirement.classList.add('invalid-input-requirement');
    }

    // if input.value is at least 8 characters long
    if (validator.matches(input.value, passwordPatterns.charLength)) {
      // set requirements to valid
      lengthRequirement.classList.remove('invalid-input-requirement');
      lengthRequirement.classList.add('valid-input-requirement');
    }
    // else
    else {
      // set requirement to invalid
      lengthRequirement.classList.remove('valid-input-requirement');
      lengthRequirement.classList.add('invalid-input-requirement');
    }

    // check they match
    if ((input.getAttribute('id') === 'passwordCheck') && (input.value !== '')) {
      if (input.value === otherPasswordInput.value) {
        // set requirements to valid
        matchRequirement.classList.remove('invalid-input-requirement');
        matchRequirement.classList.add('valid-input-requirement');
      }
      // else
      else {
        // set requirement to invalid
        matchRequirement.classList.remove('valid-input-requirement');
        matchRequirement.classList.add('invalid-input-requirement');
      }
    }

    if (input.getAttribute('id') === 'password') {
      if (validator.matches(input.value, passwordPatterns.lowercase)
          && validator.matches(input.value, passwordPatterns.uppercase)
          && validator.matches(input.value, passwordPatterns.numerical)
          && validator.matches(input.value, passwordPatterns.charLength)) {
        input.classList.add('valid-input');
      }
      else {
        input.classList.remove('valid-input');
      }
    }
    else if (input.getAttribute('id') === 'passwordCheck') {
          if (validator.matches(input.value, passwordPatterns.lowercase)
              && validator.matches(input.value, passwordPatterns.uppercase)
              && validator.matches(input.value, passwordPatterns.numerical)
              && validator.matches(input.value, passwordPatterns.charLength)
              && (input.value === otherPasswordInput.value)) {
            input.classList.add('valid-input');
          }
          else {
            input.classList.remove('valid-input');
          }
        }
  }

  /**
   * changeRequirementsValidation - Changes input and requirements to valid or invalid
   *
   * @param  {Object} input - HTML input element
   * @param  {Object} requirements - HTML li elements
   * @param  {Boolean} valid - Whether input value is valid or not
   */
  function changeRequirementsValidation (input, requirements, valid) {
    var requirementsLength = requirements.length,
        requirement,
        i;

    // If valid change input to valid
    if (valid) {
      input.classList.add('valid-input');
    }
    else {
      input.classList.remove('valid-input');
    }

    // Loop through requirements
    for (i = 0; i < requirementsLength; i++) {
      // Cache the requirement
      requirement = requirements[i];

      // If valid input
      if (valid) {
        // Remove .invalid-input-requirement
        requirement.classList.remove('invalid-input-requirement');
        // Add .valid-input-requirement
        requirement.classList.add('valid-input-requirement');
      }

      // Else if invalid input
      else {
        // Remove .valid-input-requirement
        requirement.classList.remove('valid-input-requirement');
        // Add .invalid-input-requirement
        requirement.classList.add('invalid-input-requirement');
      }
    }
  }
}

module.exports = formFieldsValidation;
