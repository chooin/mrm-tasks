import {
  install,
  packageJson,
  template,
  deleteFiles,
  lines,
  makeDirs,
  json,
} from 'mrm-core';
import semver from 'semver';
import kleur from 'kleur';
import path from 'path';

const NodeVersion = '16';

function checkEnvironment() {
  const currentNodeVersion = semver.clean(process.version) as string;
  if (semver.lte(currentNodeVersion, `${NodeVersion}.0.0`)) {
    console.log(
      `${kleur.red(
        'error',
      )} @: expected node version "${NodeVersion}.x". Got "${currentNodeVersion}"`,
    );
    process.exit(1);
  }
}

function removeFiles() {
  deleteFiles([
    'src/layouts/index.tsx',
    'src/layouts/index.less',
    'src/pages/index.tsx',
    'src/pages/docs.tsx',
  ]);
}

function addFiles() {
  const files = [
    'src/layouts/default/index.tsx',
    'src/pages/home/index/index.tsx',
    'src/pages/home/index/styled.ts',
    'src/pages/document.ejs',
    'src/hooks/index.ts',
    'src/routes.ts',
    'src/utils/index.ts',
    'src/utils/merge-props.ts',
    'src/utils/merge-list.ts',
    'src/utils/parse-query.ts',
    'src/utils/storage.ts',
    'src/utils/toast.ts',
    'src/utils/yup.ts',
    'jest.config.js',
    'commitlint.config.js',
    '.umirc.local.ts',
    '.umirc.testing.ts',
    '.umirc.production.ts',
    '.umirc.ts',
    'src/app.tsx',
    'src/global.less',
  ];

  files.forEach((file) => {
    template(file, path.join(__dirname, 'templates', file)).apply().save();
  });
}

function addDirs() {
  makeDirs(['src/services', 'src/components', 'src/enums']);
}

function changeFiles() {
  lines('.prettierignore').add(['dist']).save();
  lines('.nvmrc').add([NodeVersion]).save();
  lines('typings.d.ts')
    .add([
      '',
      '// global variables',
      'declare const APP_NAME: string;',
      "declare const APP_ENV: 'production' | 'testing' | 'local';",
      'declare const API_URL: string;',
    ])
    .save();
  json('package.json')
    .merge({
      engines: {
        node: `${NodeVersion}.x`,
      },
      gitHooks: {
        'commit-msg': 'yarn commitlint --edit $1',
      },
      'lint-staged': {
        '*.{js,jsx,ts,tsx,css,less}': ['umi lint'],
      },
    })
    .save();
}

function installDependencies() {
  install(
    [
      'ahooks',
      'styled-components',
      'antd-mobile',
      'antd-mobile-icons',
      'query-string',
      'dayjs',
      'ts-pattern',
      'yup',
      '@ebay/nice-modal-react',
      'axios',
    ],
    {
      pnpm: true,
      dev: false,
    },
  );
  install(
    [
      '@types/jest',
      '@types/styled-components',
      '@commitlint/config-conventional',
      '@commitlint/cli',
      '@umijs/lint',
    ],
    {
      pnpm: true,
      dev: true,
    },
  );
}

function changeScripts() {
  const pkg = packageJson();

  const postinstall = pkg.getScript('postinstall');
  pkg
    .removeScript('dev')
    .removeScript('build')
    .removeScript('postinstall')
    .removeScript('start')
    .save();
  pkg
    .setScript('start', 'pnpm dev')
    .setScript('dev', 'UMI_ENV=local umi dev')
    .setScript('build:testing', 'UMI_ENV=testing umi build')
    .setScript('build:production', 'UMI_ENV=production umi build')
    .setScript('preinstall', 'npx only-allow pnpm')
    .setScript('postinstall', postinstall)
    .save();
}

module.exports = function task() {
  checkEnvironment();
  removeFiles();
  addFiles();
  addDirs();
  changeFiles();
  installDependencies();
  changeScripts();
};
