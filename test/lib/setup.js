const CliSetup = () => {
  const jsdom = require('jsdom');
  const window2 = new jsdom.JSDOM().window;
  const jQuery = require('jquery')(window2);

  return {
    chai: require('chai'),
    jQuery: jQuery,
    Utils: require('./utils.js').Utils(window2, jQuery),
    Tests: require('./common-tests.js').Tests,
    Upvote: require('../../dist/upvotejs/upvotejs.vanilla.js')(window2)
  };
};

const BrowserSetup = () => {
  return {
    demo: true,
    chai: chai,
    jQuery: jQuery,
    Utils: Utils(window, $),
    Tests: Tests,
    Upvote: Upvote
  };
};

if (typeof module !== 'undefined' && module.exports) {
  exports.Setup = CliSetup();
} else {
  var Setup = BrowserSetup();
}
