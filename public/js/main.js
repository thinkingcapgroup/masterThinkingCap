(function() {
  'use strict';

  // Index
  if (document.getElementById('index')) {
    // Hide button
    document.getElementById('index-link').classList.add('hide');

    // After 2.5 seconds call fadeTitle
    setTimeout(swapTitleWithLink, 2000);

    /**
     * swapTitleWithLink - adds a class to the <h1> in index-section
     * and removes a class in the <a> which displays it
     * @return {type}  description
     */
    function swapTitleWithLink() {
      // Get elements
      var indexTitle = document.getElementById('index-title'),
          indexLink = document.getElementById('index-link');

      // Hide title element
      indexTitle.classList.add('hide');

      // Show link
      indexLink.classList.remove('hide');
    }
  } // End Index

}());
