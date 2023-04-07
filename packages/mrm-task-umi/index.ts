import {
  install,
  uninstall,
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

const NodeVersion = '18';

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
    'src/assets',
  ]);
}

function addFiles() {
  const files = [
    'src/layouts/default/index.tsx',
    'src/pages/home/index/index.tsx',
    'src/pages/home/index/styled.ts',
    'src/hooks/index.ts',
    'src/hooks/use-query.ts',
    'src/hooks/use-history.ts',
    'src/routes.ts',
    'src/utils/index.ts',
    'src/utils/merge-props.ts',
    'src/utils/merge-list.ts',
    'src/utils/storage.ts',
    'src/utils/toast.ts',
    '.umirc.local.ts',
    '.umirc.testing.ts',
    '.umirc.production.ts',
    '.umirc.ts',
    '.eslintrc.js',
    '.stylelintrc.js',
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
  lines('.nvmrc').add([NodeVersion]).save();
  lines('typings.d.ts')
    .add([
      '',
      '// global variables',
      'declare global {',
      '  const APP_NAME: string;',
      "  const APP_ENV: 'production' | 'testing' | 'local';",
      '  const API_URL: string;',
      '}',
    ])
    .save();
  json('package.json')
    .merge({
      engines: {
        node: `${NodeVersion}.x`,
      },
    })
    .save();
  lines('.gitignore').add(['!.umirc.local.ts']).save();
}

function installDependencies() {
  uninstall(['umi'], {
    pnpm: true,
    dev: false,
  });
  install(
    [
      'ahooks',
      'styled-components',
      'query-string',
      'dayjs',
      'ts-pattern',
      'yup',
      '@ebay/nice-modal-react',
      'antd-mobile',
      'type-fest',
    ],
    {
      pnpm: true,
      dev: false,
    },
  );
  install(['@types/styled-components'], {
    pnpm: true,
    dev: true,
  });
}

function changeScripts() {
  const pkg = packageJson();

  pkg
    .removeScript('dev')
    .removeScript('build')
    .removeScript('postinstall')
    .removeScript('setup')
    .removeScript('start')
    .save();
  pkg
    .setScript('start', 'pnpm dev')
    .setScript('dev', 'UMI_ENV=local max dev')
    .setScript('build:testing', 'UMI_ENV=testing max build')
    .setScript('build:production', 'UMI_ENV=production max build')
    .setScript('preinstall', 'npx only-allow pnpm')
    .setScript('postinstall', 'max setup')
    .setScript('setup', 'max setup')
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
