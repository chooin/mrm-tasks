import { install, packageJson, template, lines, json } from 'mrm-core';
import path from 'path';

const NodeVersion = '16';

function addFiles() {
  const files = [
    'scripts/build.mjs',
    'scripts/test.mjs',
    'src/index.ts',
    'api-extractor.json',
    'jest.config.js',
    'tsconfig.json',
    '.gitignore',
  ];

  files.forEach((file) => {
    template(file, path.join(__dirname, 'templates', file)).apply().save();
  });
}

function changeFiles() {
  lines('.nvmrc').add([NodeVersion]).save();
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
    yarn: true,
    dev: true,
  });
}

function changeScripts() {
  const pkg = packageJson();

  pkg.setScript('preinstall', 'npx only-allow pnpm').save();
}

module.exports = function task() {
  addFiles();
  changeFiles();
  installDependencies();
  changeScripts();
};
