'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const mrm_core_1 = require('mrm-core');
const path_1 = __importDefault(require('path'));
const semver_1 = __importDefault(require('semver'));
const kleur_1 = __importDefault(require('kleur'));
const NodeVersion = '16';
function checkEnvironment() {
  const currentNodeVersion = semver_1.default.clean(process.version);
  if (semver_1.default.lte(currentNodeVersion, `${NodeVersion}.0.0`)) {
    console.log(
      `${kleur_1.default.red(
        'error',
      )} @: expected node version "${NodeVersion}.x". Got "${currentNodeVersion}"`,
    );
    process.exit(1);
  }
}
function addFiles() {
  const files = [
    'scripts/build.mjs',
    'scripts/test.mjs',
    'src/index.ts',
    'api-extractor.json',
    'jest.config.js',
    'tsconfig.json',
    'package.json',
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
  (0, mrm_core_1.lines)('.gitignore')
    .add(['.DS_Store', 'dist/', 'node_modules/', '.idea', 'temp'])
    .save();
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
      pnpm: true,
      dev: true,
    },
  );
}
module.exports = function task() {
  checkEnvironment();
  addFiles();
  changeFiles();
  installDependencies();
};
