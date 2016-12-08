function bugReports () {
  var bugReportButtons = document.getElementsByClassName('bug-report-button'),
      bugReportModal = document.getElementById('bug-report-modal'),
      bugReportCancelButton = document.getElementById('bug-report-cancel-button');

  // Event listeners
  for (var i = 0; i < bugReportButtons.length; i++) {
    var bugReportButton = bugReportButtons[i];
    bugReportButton.addEventListener('click', displayBugReportModal);
  }

  bugReportCancelButton.addEventListener('click', hideBugReportModal);

  // Shows the bug report modal
  function displayBugReportModal () {
    bugReportModal.classList.remove('hide');
  }

  // Hides the bug report modal
  function hideBugReportModal () {
    bugReportModal.classList.add('hide');
  }
}

module.exports = bugReports;
