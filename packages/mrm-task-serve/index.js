'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const mrm_core_1 = require('mrm-core');
const path_1 = __importDefault(require('path'));
function dependency() {
  const dependencies = ['express', 'connect-history-api-fallback'];
  (0, mrm_core_1.install)(dependencies, {
    yarn: true,
    dev: false,
  });
}
function src({ dist, port }) {
  const files = ['serve.js'];
  files.forEach((file) => {
    (0, mrm_core_1.template)(
      file,
      path_1.default.join(__dirname, 'templates', file),
    )
      .apply({
        dist,
        port,
      })
      .save();
  });
}
module.exports = function task(config) {
  dependency();
  src(config);
};
module.exports.parameters = {
  dist: {
    type: 'input',
    message: 'Please enter dist directory.',
    default: 'dist',
  },
  port: {
    type: 'number',
    message: 'Please enter port.',
    default: 8080,
    validate(value) {
      return value ? true : 'port is required';
    },
  },
};
module.exports.description = 'Mrm task for serve';
