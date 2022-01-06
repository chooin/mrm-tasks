'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const mrm_core_1 = require('mrm-core');
const path_1 = __importDefault(require('path'));
function removeFiles() {
  (0, mrm_core_1.deleteFiles)([
    'src/pages/index.tsx',
    'src/pages/index.less',
    '.prettierrc',
  ]);
}
function addFiles() {
  const files = [
    '.umirc.dev.ts',
    '.umirc.test.ts',
    '.umirc.prod.ts',
    '.umirc.ts',
    '.eslintrc.js',
    '.prettierrc.js',
    'src/layouts/default/index.tsx',
    'src/layouts/default/styled.tsx',
    'src/pages/home/index/index.tsx',
    'src/pages/home/index/styled.ts',
    'src/pages/document.ejs',
    'src/hooks/index.ts',
    'src/routes.ts',
    'commitlint.config.js',
    'scripts/check-yarn.js',
    'typings.d.ts',
    '.nvmrc',
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
  (0, mrm_core_1.lines)('.prettierignore').add(['dist']).save();
  (0, mrm_core_1.lines)('.prettierrc.js')
    .add([
      "const fabric = require('@umijs/fabric');",
      '',
      'module.exports = {',
      '  ...fabric.prettier,',
      '};',
    ])
    .save();
}
function dependency() {
  (0, mrm_core_1.install)(
    [
      '@umijs/hooks',
      'query-string',
      'styled-components',
      'antd-mobile@next',
      'antd-mobile-icons',
      'umi-plugin-keep-alive',
      'dayjs',
      'ts-pattern',
    ],
    {
      yarn: true,
      dev: false,
    },
  );
  (0, mrm_core_1.install)(
    [
      '@types/styled-components',
      '@commitlint/config-conventional',
      '@commitlint/cli',
      '@umijs/fabric',
    ],
    {
      yarn: true,
      dev: true,
    },
  );
}
function script() {
  const pkg = (0, mrm_core_1.packageJson)();
  pkg
    .setScript('preinstall', 'node scripts/check-yarn.js')
    .setScript('start', 'yarn dev')
    .setScript('dev', 'UMI_ENV=dev umi dev')
    .setScript('build:test', 'UMI_ENV=test umi build')
    .setScript('build:prod', 'UMI_ENV=prod umi build')
    .removeScript('build')
    .save();
}
module.exports = function task() {
  removeFiles();
  addFiles();
  changeFiles();
  addDirs();
  script();
  dependency();
};
