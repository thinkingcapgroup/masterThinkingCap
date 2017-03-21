(function() {
  'use strict';

  // Variables
  var thinkingcap = require('./thinkingcap');

  // Global Navigation
  thinkingcap.globalAppNavigation();

  // Bug Reports
  thinkingcap.bugReports();

  // Index
  if (document.getElementById('index')) {
    thinkingcap.welcomePageTitleSwitch();
  } // End Index

  // Create account
  if (document.getElementsByClassName('form-fields-validation')[0]) {
    thinkingcap.formFieldsValidation();
  }
}());
