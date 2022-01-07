import {
  install,
  packageJson,
  template,
  deleteFiles,
  lines,
  makeDirs,
} from 'mrm-core';
import path from 'path';

function removeFiles() {
  deleteFiles(['src/pages/index.tsx', 'src/pages/index.less', '.prettierrc']);
}

function addFiles() {
  const files = [
    'src/layouts/default/index.tsx',
    'src/layouts/default/styled.tsx',
    'src/pages/home/index/index.tsx',
    'src/pages/home/index/styled.ts',
    'src/pages/document.ejs',
    'src/hooks/index.ts',
    'src/routes.ts',
    'src/utils/index.ts',
    'src/utils/merge-props.ts',
    'src/utils/storage.ts',
    'scripts/check-yarn.js',
    'typings.d.ts',
    'commitlint.config.js',
    '.nvmrc',
    '.umirc.dev.ts',
    '.umirc.test.ts',
    '.umirc.prod.ts',
    '.umirc.ts',
    '.eslintrc.js',
    'app.tsx',
    'global.less',
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

function installDependencies() {
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
      '@ebay/nice-modal-react',
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

function changeScripts() {
  const pkg = packageJson();

  const postinstall = pkg.getScript('postinstall');
  const prettier = pkg.getScript('prettier');
  const test = pkg.getScript('test');
  const testCoverage = pkg.getScript('test:coverage');
  pkg
    .removeScript('build')
    .removeScript('postinstall')
    .removeScript('prettier')
    .removeScript('test')
    .removeScript('test:coverage')
    .save();
  pkg
    .setScript('start', 'yarn dev')
    .setScript('dev', 'UMI_ENV=dev umi dev')
    .setScript('build:test', 'UMI_ENV=test umi build')
    .setScript('build:prod', 'UMI_ENV=prod umi build')
    .setScript('preinstall', 'node scripts/check-yarn.js')
    .setScript('postinstall', postinstall)
    .setScript('prettier', prettier)
    .setScript('test', test)
    .setScript('test:coverage', testCoverage)
    .save();
}

module.exports = function task() {
  removeFiles();
  addFiles();
  addDirs();
  changeFiles();
  changeScripts();
  installDependencies();
};
