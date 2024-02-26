import semver from 'semver';
import kleur from 'kleur';
import path from 'path';
import { execSync } from 'child_process';
import {
  install,
  uninstall,
  packageJson,
  template,
  deleteFiles,
  lines,
  json,
} from 'mrm-core';

const NodeVersion = '20';

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
    'src/components/.gitkeep',
    'src/constants/.gitkeep',
    'src/enums/.gitkeep',
    'src/hooks/index.ts',
    'src/hooks/use-query.ts',
    'src/hooks/use-history.ts',
    'src/layouts/default/index.tsx',
    'src/pages/home/index/index.tsx',
    'src/pages/home/index/styled.ts',
    'src/services/.gitkeep',
    'src/utils/index.ts',
    'src/utils/merge-props.ts',
    'src/utils/merge-list.ts',
    'src/utils/storage.ts',
    'src/utils/toast.ts',
    'src/routes.ts',
    'src/app.tsx',
    'src/global.less',
    '.umirc.local.ts',
    '.umirc.testing.ts',
    '.umirc.production.ts',
    '.umirc.ts',
    '.eslintrc.js',
    '.stylelintrc.js',
  ];

  files.forEach((file) => {
    template(file, path.join(__dirname, 'templates', file)).apply().save();
  });
}

function changeFiles() {
  lines('.nvmrc').add([NodeVersion]).save();
  lines('typings.d.ts')
    .remove("import 'umi/typings';")
    .add([
      "import '@umijs/max/typings';",
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
  lines('.gitignore')
    .remove(['/.umirc.local.ts'])
    .add(['!.umirc.local.ts'])
    .save();
  lines('.prettierignore').add(['package.json', '.umirc.*']).save();
}

function uninstallDependencies() {
  uninstall(['umi'], {
    pnpm: true,
    dev: false,
  });
}

function installDependencies() {
  install(
    [
      'ahooks',
      'styled-components',
      'query-string',
      'dayjs',
      'ts-pattern',
      'yup',
      '@ebay/nice-modal-react',
      '@umijs/max',
      'axios',
    ],
    {
      pnpm: true,
      dev: false,
    },
  );
  install(['@types/styled-components', '@types/node'], {
    pnpm: true,
    dev: true,
  });
}

function shell() {
  execSync('npx @umijs/max g prettier');
  execSync('npx @umijs/max g precommit');
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

module.exports = async function task() {
  checkEnvironment();
  removeFiles();
  uninstallDependencies();
  addFiles();
  changeFiles();
  installDependencies();
  changeScripts();
  shell();
};
