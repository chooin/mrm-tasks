'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const mrm_core_1 = require('mrm-core');
const child_process_1 = require('child_process');
const path_1 = __importDefault(require('path'));
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
    ],
    {
      yarn: true,
      dev: true,
    },
  );
}
function src() {
  (0, mrm_core_1.deleteFiles)(['src/pages/index.tsx', 'src/pages/index.less']);
  const files = [
    'src/layouts/default/index.tsx',
    'src/layouts/default/styled.tsx',
    'src/pages/home/index/index.tsx',
    'src/pages/home/index/styled.ts',
    'src/pages/error/404/index.tsx',
    'src/pages/document.ejs',
    'src/hooks/index.ts',
    'src/hooks/useLoad.ts',
    'src/hooks/useUnload.ts',
    'src/routes.ts',
    'scripts/check-yarn.js',
    'typings.d.ts',
    'commitlint.config.js',
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
  (0, mrm_core_1.makeDirs)(['src/services', 'src/components']);
  (0, mrm_core_1.lines)('.prettierignore').add(['dist']).save();
}
function environment() {
  const files = ['.umirc.dev.ts', '.umirc.prod.ts', '.umirc.ts'];
  files.forEach((file) => {
    (0, mrm_core_1.template)(
      file,
      path_1.default.join(__dirname, 'templates', file),
    )
      .apply()
      .save();
  });
}
function script() {
  const pkg = (0, mrm_core_1.packageJson)();
  pkg
    .setScript('preinstall', 'node scripts/check-yarn.js')
    .setScript('start', 'UMI_ENV=dev umi dev')
    .setScript('dev', 'yarn start')
    .setScript('build:dev', 'UMI_ENV=dev umi build')
    .setScript('build:prod', 'UMI_ENV=prod umi build')
    .removeScript('build')
    .save();
}
function husky() {
  const devDependencies = ['husky'];
  (0, mrm_core_1.install)(devDependencies, {
    yarn: true,
    dev: true,
  });
  (0, mrm_core_1.packageJson)().setScript('prepare', 'husky install').save();
  (0, child_process_1.exec)('yarn prepare');
  (0, child_process_1.exec)(
    'npx husky add .husky/commit-msg \'npx --no-install commitlint --edit "$1"\'',
  );
  (0, mrm_core_1.json)('package.json')
    .unset('lint-staged')
    .unset('gitHooks')
    .save();
}
module.exports = function task() {
  husky();
  src();
  environment();
  script();
  dependency();
};
