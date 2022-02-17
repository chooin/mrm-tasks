import {
  install,
  json,
  lines,
  template,
  deleteFiles,
  makeDirs,
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
  deleteFiles(['src/pages/index']);
}

function addFiles() {
  const files = [
    'src/pages/home/index/index.config.ts',
    'src/pages/home/index/index.tsx',
    'src/pages/home/index/index.scss',
    'src/utils/index.ts',
    'src/utils/merge-list.ts',
    'src/utils/parse-props.ts',
    'src/utils/parse-query.ts',
    'src/utils/storage.ts',
  ];

  files.forEach((file) => {
    template(file, path.join(__dirname, 'templates', file)).apply().save();
  });
}

function addDirs() {
  makeDirs(['src/services', 'src/components']);
}

function changeFiles() {
  lines('.gitignore').add('.idea').save();
  lines('.nvmrc').add([NodeVersion]).save();
  json('tsconfig.json')
    .set('compilerOptions.paths', {
      '@/*': ['./src/*'],
    })
    .save();
  json('package.json')
    .merge({
      engines: {
        node: `${NodeVersion}.x`,
      },
    })
    .save();
}

function installDependencies() {
  install(
    ['query-string', 'dayjs', 'ts-pattern', 'yup', '@ebay/nice-modal-react'],
    {
      yarn: true,
      dev: false,
    },
  );

  install(
    [
      '@tarojs/cli', // 锁定 cli 版本
    ],
    {
      yarn: true,
      dev: true,
    },
  );
}

module.exports = function task() {
  checkEnvironment();
  removeFiles();
  addFiles();
  addDirs();
  changeFiles();
  installDependencies();
};
