"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (tweetUrl, filePath) {
  var tweetId = (0, _twitterUrlParser2.default)(tweetUrl).id;
  var tweetSelector = ".tweet[data-tweet-id=\"" + tweetId + "\"]";
  var sensitivityButtonSelector = tweetSelector + " button.js-display-this-media";
  var mediaSelector = tweetSelector + " .AdaptiveMedia";
  var iframeSelector = tweetSelector + " iframe";
  var nightmare = new _nightmare2.default();

  return Promise.resolve().then(function () {
    return nightmare.viewport(2000, 2000);
  }).then(function () {
    return nightmare.goto(tweetUrl);
  }).then(function () {
    return nightmare.wait(function () {
      return document.readyState === "complete";
    });
  }).then(function () {
    return nightmare.exists(sensitivityButtonSelector);
  }).then(function (hasSensitivityButton) {
    return hasSensitivityButton && nightmare.click(sensitivityButtonSelector);
  }).then(function () {
    return nightmare.exists(mediaSelector);
  }).then(function (hasMedia) {
    return hasMedia && nightmare.waitUntilVisible(mediaSelector);
  }).then(function () {
    return nightmare.exists(iframeSelector);
  }).then(function (hasIframe) {
    return hasIframe && nightmare.waitUntilVisible(iframeSelector);
  }).then(function () {
    return nightmare.style(tweetSelector, { borderRadius: "0px" });
  }) // Ensure tweet completely fills screenshot.
  .then(function () {
    return nightmare.boundingBox(tweetSelector);
  }).then(function (boundingBox) {
    return nightmare.screenshot(filePath, boundingBox).end();
  });
};

var _nightmare = require("nightmare");

var _nightmare2 = _interopRequireDefault(_nightmare);

var _twitterUrlParser = require("twitter-url-parser");

var _twitterUrlParser2 = _interopRequireDefault(_twitterUrlParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_nightmare2.default.action("waitUntilVisible", function (selector, done) {
  var _this = this;

  this.wait(selector).then(function () {
    return _this.wait(function (selector) {
      var element = document.querySelector(selector);
      return element.offsetWidth > 0 && element.offsetHeight > 0;
    }, selector);
  }).then(done);
});

_nightmare2.default.action("style", function (selector, style, done) {
  this.evaluate_now(function (selector, style) {
    var element = document.querySelector(selector);
    Object.assign(element.style, style);
  }, done, selector, style);
});

_nightmare2.default.action("boundingBox", function (selector, done) {
  this.evaluate_now(function (selector) {
    var element = document.querySelector(selector);
    var rectangle = element.getBoundingClientRect();
    return {
      x: Math.round(rectangle.left),
      y: Math.round(rectangle.top),
      width: Math.round(rectangle.width),
      height: Math.round(rectangle.height)
    };
  }, done, selector);
});