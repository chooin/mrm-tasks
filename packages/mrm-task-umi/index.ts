import {
  install,
  packageJson,
  template,
  deleteFiles,
  makeDirs,
  lines,
} from 'mrm-core';
import path from 'path';

function removeFiles() {
  deleteFiles(['src/pages/index.tsx', 'src/pages/index.less', '.prettierrc']);
}

function addFiles() {
  const files = [
    '.umirc.dev.ts',
    '.umirc.test.ts',
    '.umirc.prod.ts',
    '.umirc.ts',
    '.eslintrc.js',
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
    template(file, path.join(__dirname, 'templates', file)).apply().save();
  });
}

function addDirs() {
  makeDirs(['src/services', 'src/components']);
}

function changeFiles() {
  lines('.prettierignore').add(['dist']).save();
  lines('.prettierrc.js')
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
  install(
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
  install(
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
  const pkg = packageJson();

  pkg
    .prependScript('start', 'yarn dev')
    .prependScript('dev', 'UMI_ENV=dev umi dev')
    .prependScript('build:test', 'UMI_ENV=test umi build')
    .prependScript('build:prod', 'UMI_ENV=prod umi build')
    .setScript('preinstall', 'node scripts/check-yarn.js')
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
