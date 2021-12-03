'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const mrm_core_1 = require('mrm-core');
const path_1 = __importDefault(require('path'));
function git() {
  (0, mrm_core_1.lines)('.gitignore').add('.idea').save();
}
function dependency() {
  const devDependencies = [
    'dotenv',
    '@tarojs/cli', // 锁定 cli 版本
  ];
  (0, mrm_core_1.install)(devDependencies, {
    yarn: true,
    dev: true,
  });
}
function pages() {
  (0, mrm_core_1.deleteFiles)(['src/pages/index']);
  const files = [
    'src/pages/home/index/index.config.ts',
    'src/pages/home/index/index.tsx',
    'src/pages/home/index/index.scss',
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
function env() {
  const files = ['config/dev.js', 'config/prod.js', '.env.dev', '.env.prod'];
  files.forEach((file) => {
    (0, mrm_core_1.template)(
      file,
      path_1.default.join(__dirname, 'templates', file),
    )
      .apply()
      .save();
  });
}
function tsconfig() {
  (0, mrm_core_1.json)('tsconfig.json')
    .set('compilerOptions.paths', {
      '@/*': ['./src/*'],
    })
    .save();
}
module.exports = function task() {
  git();
  env();
  pages();
  tsconfig();
  dependency();
};
