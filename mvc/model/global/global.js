var model = {
  content: {
    appTitle: 'Thinking Cap',
    pageTitle: '{{content.appTitle}}',
    gameTitle: ''
  }
};

function global (req, res) {
  return {
    // Always static
    content: model.content,

    // Global Navigation Mode
    globalNavigationMode: {},

    // Recalculated each require
    currentYear: new Date().getFullYear()
  };
};

module.exports = global;
