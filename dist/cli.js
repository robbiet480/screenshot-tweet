#!/usr/bin/env node
"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _yargs = require("yargs");

var _yargs2 = _interopRequireDefault(_yargs);

var _twitterUrlParser = require("twitter-url-parser");

var _twitterUrlParser2 = _interopRequireDefault(_twitterUrlParser);

var _tildify = require("tildify");

var _tildify2 = _interopRequireDefault(_tildify);

var _package = require("../package.json");

var _package2 = _interopRequireDefault(_package);

var _ = require("./");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _yargs$usage$option$o = _yargs2.default.usage("Usage: " + _chalk2.default.cyan(_package2.default.name, _chalk2.default.underline("TWEET URL"), _chalk2.default.underline("FILE PATH"))).option("h", { alias: "help", describe: "Show help", type: "boolean" }).option("v", { alias: "version", describe: "Show version", type: "boolean" }),
    argv = _yargs$usage$option$o.argv;

if (argv.help || argv.h) {
  _yargs2.default.showHelp();
  process.exit();
}

if (argv.version || argv.v) {
  console.log(_package2.default.version);
  process.exit();
}

if (argv._.length !== 2) {
  _yargs2.default.showHelp();
  console.error(_chalk2.default.red("Tweet URL and file path must be specified."));
  process.exit(1);
}

var _argv$_ = _slicedToArray(argv._, 2),
    tweetUrl = _argv$_[0],
    filePath = _argv$_[1];

console.log(_chalk2.default.green("Screenshotting tweet \"" + (0, _twitterUrlParser2.default)(tweetUrl).id + "\" to \"" + (0, _tildify2.default)(filePath) + "\"..."));

(0, _2.default)(tweetUrl, filePath).then(function () {
  console.log(_chalk2.default.green("Done!"));
  process.exit();
}).catch(function (error) {
  console.error(_chalk2.default.red("An unexpected error occurred."));
  process.exit(1);
});