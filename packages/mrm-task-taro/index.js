'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const mrm_core_1 = require('mrm-core');
const semver_1 = __importDefault(require('semver'));
const kleur_1 = __importDefault(require('kleur'));
const path_1 = __importDefault(require('path'));
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
function removeFiles() {
  (0, mrm_core_1.deleteFiles)(['src/pages/index']);
}
function addFiles() {
  const files = [
    'src/pages/home/index/index.config.ts',
    'src/pages/home/index/index.tsx',
    'src/pages/home/index/index.scss',
    'config/dev.js',
    'config/prod.js',
    '.env.dev',
    '.env.prod',
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
function addDirs() {
  (0, mrm_core_1.makeDirs)(['src/services', 'src/components']);
}
function changeFiles() {
  (0, mrm_core_1.lines)('.gitignore').add('.idea').save();
  (0, mrm_core_1.lines)('.nvmrc').add([NodeVersion]).save();
  (0, mrm_core_1.json)('tsconfig.json')
    .set('compilerOptions.paths', {
      '@/*': ['./src/*'],
    })
    .save();
  (0, mrm_core_1.json)('package.json')
    .merge({
      engines: {
        node: `${NodeVersion}.x`,
      },
      jest: {
        testPathIgnorePatterns: ['.umirc*'],
      },
    })
    .save();
}
function installDependencies() {
  const devDependencies = [
    'dotenv',
    '@tarojs/cli', // 锁定 cli 版本
  ];
  (0, mrm_core_1.install)(devDependencies, {
    yarn: true,
    dev: true,
  });
}
module.exports = function task() {
  checkEnvironment();
  removeFiles();
  addFiles();
  addDirs();
  changeFiles();
  installDependencies();
};
