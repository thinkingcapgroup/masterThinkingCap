(function() {
  'use strict';

  var bugReportButtons = document.getElementsByClassName('bug-report-button'),
      bugReportModal = document.getElementById('bug-report-modal'),
      bugReportCancelButton = document.getElementById('bug-report-cancel-button');

  // Event listeners
  for (var i = 0; i < bugReportButtons.length; i++) {
    var bugReportButton = bugReportButtons[i];
    bugReportButton.addEventListener('click', displayBugReportModal);
  }

  bugReportCancelButton.addEventListener('click', hideBugReportModal);

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

  // Shows the bug report modal
  function displayBugReportModal () {
    bugReportModal.classList.remove('hide');
  }

  // Hides the bug report modal
  function hideBugReportModal () {
    bugReportModal.classList.add('hide');
  }
  ////////////////////////////////////////////////
  // Dropdown morph
  ////////////////////////////////////////////////

  // Make sure we have requestAnimationFrame
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (function() {
      'use strict';
      return window.webkitRequestAnimationFrame
            || window.mozRequestAnimationFrame
            || window.oRequestAnimationFrame
            || window.msRequestAnimationFrame
            || function (callback) {
                return window.setTimeout(callback, 1000/60)
              };
    }());
  }

  // Make sure we have cancelAnimationFrame
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = (function() {
      'use strict';
      return window.webkitCancelRequestAnimationFrame
            || window.mozCancelAnimationFrame
            || window.oCancelAnimationFrame
            || window.msCancelAnimationFrame
            || function (id) {
                return window.cancelTimeout(id)
              };
    }());
  }

  // Navigation variables
  var morphDropdownElement = document.querySelector('.morph-dropdown'),
      mainNavigation = morphDropdownElement.querySelector('.main-nav'),
      mainNavigationItems = mainNavigation.querySelectorAll('.has-dropdown'),
      navDropdownList = morphDropdownElement.querySelector('.nav-dropdown-list'),
      navDropdownListWrapper = navDropdownList.querySelector('.dropdown'),
      navDropdownListItems = navDropdownList.querySelectorAll('.nav-dropdown-content'),
      navDropdownListBackground = navDropdownList.querySelector('.bg-layer'),
      mq = checkMq(),
      vTransform = getProp(['transform', 'webkitTransform', 'mozTransform', 'msTransform', 'oTransform']),
      resizing = false;

  // Attach event listeners to the mainNavigationItems
  for (var i = 0; i < mainNavigationItems.length; i++) {
    mainNavigationItems[i].addEventListener('mouseenter', navDropdownListEnter, false);
    mainNavigationItems[i].addEventListener('mouseleave', navDropdownListLeave, false);
    mainNavigationItems[i].addEventListener('touchstart', navDropdownListTouch, false);
    mainNavigationItems[i].addEventListener('keyup', navDropdownListKeyup, false);
  }

  navDropdownList.addEventListener('mouseleave', navDropdownListLeave, false);
  morphDropdownElement.addEventListener('click', navMenuClick, false);
  window.addEventListener('resize', switchNavigationTypes, false);

  resetDropdown();

  function navMenuClick (event) {
    if (event.target.nodeName !== 'FORM' && event.target.parentNode.nodeName !== 'FORM') {
      morphDropdownElement.classList.toggle('nav-open');
    }
  }

  /**
   * checkMq - description
   *
   * @return {String}  Returns whether the we are in mobile or desktop
   */
  function checkMq () {
    return window.getComputedStyle(morphDropdownElement, '::before').getPropertyValue('content').replace(/'/g, '').replace(/"/g, '').split(', ')[0];
  }

  function navDropdownListLeave (event) {
    (mainNavigation.querySelectorAll('.has-dropdown:hover').length === 0 &&
    morphDropdownElement.querySelectorAll('.nav-dropdown-list:hover').length === 0) &&
    delay(hideDropdown());
  }

  function navDropdownListTouch (event) {
    if (!('ontouchstart' in window)) return;

    var selectedId = '#' + event.target.data('content'),
        selectedDropdown = navDropdownList.querySelector(selectedId);

    if (!morphDropdownElement.classList.contains('is-dropdown-visible') ||
        !selectedDropdown.classList.contains('active')) {
      event.preventDefault();
      navDropdownListEnter(event);
    }
  }

  function navDropdownListKeyup () {
    if (document.activeElement.parentNode.classList.contains('has-dropdown')) {
      var targetElement = {
        target: document.activeElement.parentNode
      };

      return navDropdownListEnter(targetElement);
    }
  }

  function navDropdownListEnter (event) {
    mq = checkMq();

    if (mq !== 'desktop') {
      return;
    }
    else {
      var item = {
            element: (event.target || this)
          },
          actives = morphDropdownElement.querySelectorAll('.active');

      item.navDropdownList = navDropdownList.querySelector('#' + item.element.getAttribute('data-content'));
      item.navDropdownListHeight = getHeight(item.navDropdownList);
      item.navDropdownListWidth = getWidth(item.navDropdownList.querySelector('.nav-dropdown-content'));
      item.navDropdownListLeftOffset = getOffsetLeft(item.element) + getWidth(item.element)/2 - item.navDropdownListWidth/2;

      //
      updateDropdown(item.navDropdownListHeight, item.navDropdownListWidth, item.navDropdownListLeftOffset);

      //
      for (var i = 0; i < actives.length; i++) {
        actives[i].classList.remove('active');
      }

      item.element.classList.add('active');
      item.navDropdownList.classList.add('active');
      item.navDropdownList.classList.remove('move-left');
      item.navDropdownList.classList.remove('move-right');

      if (item.navDropdownList.previousElementSibling) {
        item.navDropdownList.previousElementSibling.classList.add('move-left');
      }

      if (item.navDropdownList.nextElementSibling) {
        item.navDropdownList.nextElementSibling.classList.add('move-right');
      }

      if (!morphDropdownElement.classList.contains('is-dropdown-visible')) {
        window.setTimeout(function () {
          morphDropdownElement.classList.add('is-dropdown-visible');
        }, 10);
      }
    }
  }

  function updateDropdown (height, width, leftOffset) {
    // width = 390;
    navDropdownList.style.width = width + 'px';
    navDropdownList.style.height = height + 'px';
    navDropdownList.style[vTransform] = 'translateX(' + leftOffset + 'px)';
    navDropdownListBackground.style[vTransform] = 'scaleX(' + width + ') scaleY(' + height + ')';
  }

  function hideDropdown () {
    mq = checkMq();

    if (mq !== 'desktop') {
      return;
    }
    else {
      morphDropdownElement.classList.remove('is-dropdown-visible');

      var actives = morphDropdownElement.querySelectorAll('.active'),
          moveLefts = morphDropdownElement.querySelectorAll('.move-left'),
          moveRights = morphDropdownElement.querySelectorAll('.move-right');

      for (var a = 0; a < actives.length; a++) {
        actives[a].classList.remove('active');
      }

      for (var l = 0; l < moveLefts.length; l++) {
        moveLefts[l].classList.remove('move-left');
      }

      for (var r = 0; r < moveRights.length; r++) {
        moveRights[r].classList.remove('move-right');
      }
    }
  }

  function resetDropdown () {
    resizing = false;

    mq = checkMq();

    if (mq !== 'mobile') {
      return;
    }
    else {
      navDropdownList.removeAttribute('style');
    }
  }

  function getHeight (ele) {
    return parseInt(getComputedStyle(ele).height.slice(0, -2));
  }

  function getWidth (ele) {
    return parseInt(getComputedStyle(ele).width.slice(0, -2));
  }

  function getOffsetLeft (ele) {
    return ele.getBoundingClientRect().left;
  }

  function getProp (props) {
    for (var p = 0; p < props.length; p++) {
      var prop = props[p];

      if (typeof document.body.style[prop] !== 'undefined') {
        return prop;
      }
      else {
        return '';
      }
    }
  }

  function rebounce (f) {
    var scheduled,
        context,
        args;

    return function () {
      context = this;
      args = [];

      for (var i = 0; i < arguments.length; i++) {
        args[i] = arguments[i];
      }

      !!scheduled && window.cancelAnimationFrame(scheduled);
      scheduled = window.requestAnimationFrame(function () {
        f.apply(context, args);
        scheduled = null;
      });
    }
  }

  function delay (f) {
    var scheduled,
        context,
        args;

    return function () {
      context = this;
      args = [];

      for(var i = 0; i < arguments.length; ++i) args[i] = arguments[i];

      !!scheduled && window.cancelTimeout(scheduled);

      scheduled = window.setTimeout(function () {
        f.apply(context, args);
        scheduled = null;
      }, 50);
    }
  }

  function switchNavigationTypes () {
    if (!!resizing) {
      return;
    }
    else {
      resizing = true;
      return rebounce(resetDropdown());
    }
  }

  ////////////////////////////////////////////////
  // Dropdown morph END
  ////////////////////////////////////////////////
}());
