var model = {
  content: {
    appTitle: 'Thinking Cap',
    pageTitle: '{{content.appTitle}}',
    gameTitle: ''
  }
};

module.exports = function(req, res) {
  return {
    // Always static
    content: model.content,

    // Global Navigation Mode
    globalNavigationMode: {},

    // Recalculated each require
    currentYear: new Date().getFullYear()
  };
};
