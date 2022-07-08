import { install, template, lines, json } from 'mrm-core';
import path from 'path';
import semver from 'semver';
import kleur from 'kleur';

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

function addFiles() {
  const files = [
    'scripts/build.mjs',
    'scripts/test.mjs',
    'src/index.ts',
    'api-extractor.json',
    'jest.config.js',
    'tsconfig.json',
    'package.json',
  ];

  files.forEach((file) => {
    template(file, path.join(__dirname, 'templates', file)).apply().save();
  });
}

function changeFiles() {
  lines('.nvmrc').add([NodeVersion]).save();
  lines('.gitignore')
    .add(['.DS_Store', 'dist/', 'node_modules/', '.idea', 'temp'])
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
  install(['@types/jest', 'jest', 'rollup', 'typescript', 'zx'], {
    pnpm: true,
    dev: true,
  });
}

module.exports = function task() {
  checkEnvironment();
  addFiles();
  changeFiles();
  installDependencies();
};
