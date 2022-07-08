'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const mrm_core_1 = require('mrm-core');
const path_1 = __importDefault(require('path'));
const NodeVersion = '16';
function addFiles() {
  const files = [
    'scripts/build.mjs',
    'scripts/test.mjs',
    'src/index.ts',
    'api-extractor.json',
    'jest.config.js',
    'tsconfig.json',
    '.gitignore',
  ];
  files.forEach((file) => {
    (0, mrm_core_1.template)(
      file,
      path_1.default.join(__dirname, 'templates', file),
    )
      .apply()
      .save();
  });
}
function changeFiles() {
  (0, mrm_core_1.lines)('.nvmrc').add([NodeVersion]).save();
  (0, mrm_core_1.json)('package.json')
    .merge({
      engines: {
        node: `${NodeVersion}.x`,
      },
    })
    .save();
}
function installDependencies() {
  (0, mrm_core_1.install)(
    ['@types/jest', 'jest', 'rollup', 'typescript', 'zx'],
    {
      yarn: true,
      dev: true,
    },
  );
}
function changeScripts() {
  const pkg = (0, mrm_core_1.packageJson)();
  pkg.setScript('preinstall', 'npx only-allow pnpm').save();
}
module.exports = function task() {
  addFiles();
  changeFiles();
  installDependencies();
  changeScripts();
};
