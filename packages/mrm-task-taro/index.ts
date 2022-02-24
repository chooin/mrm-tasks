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
import { js } from 'fast-files';

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
    'src/hooks/index.ts',
    'src/hooks/useAuthorize.ts',
    'src/hooks/useEvent.ts',
    'src/hooks/useLoad.ts',
    'src/hooks/useUnload.ts',
    'src/utils/index.ts',
    'src/utils/merge-list.ts',
    'src/utils/merge-props.ts',
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
  lines('global.d.ts')
    .add([
      '',
      'declare const APP_DEBUG: boolean;',
      'declare const API_URL: string;',
    ])
    .save();
  json('tsconfig.json')
    .set('compilerOptions.paths', {
      '@/*': ['./src/*'],
    })
    .save();
  js()
    .readFile('config/dev.js')
    .replace(
      'defineConstants: {}',
      `
  defineConstants: {
    APP_DEBUG: true,
    APP_URL: '"https://example.com"'
  }
`,
    )
    .saveFile(null, {
      override: true,
    });
  js()
    .readFile('config/prod.js')
    .replace(
      'defineConstants: {}',
      `
  defineConstants: {
    APP_DEBUG: false,
    APP_URL: '"https://example.com"'
  }
`,
    )
    .saveFile(null, {
      override: true,
    });
  js()
    .readFile('src/app.config.ts')
    .replace("'pages/index/index'", "'pages/home/index/index'")
    .saveFile(null, {
      override: true,
    });
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
