import { json, install, packageJson, makeDirs, template } from 'mrm-core';
import path from 'path';

function dependency() {
  const dependencies = [
    // route
    '@react-navigation/native',
    '@react-navigation/stack',
    'react-native-gesture-handler',
    'react-native-reanimated',
    'react-native-safe-area-context',
    'react-native-screens',
    '@react-navigation/bottom-tabs',
    // lifecycle
    'react-native-lifecycle',
    // style
    'styled-components',
    // ant-design
    '@react-native-community/cameraroll',
    '@react-native-picker/picker',
    '@react-native-community/segmented-control',
    '@react-native-community/slider',
    'react-native-pager-view',
    // other
    'axios',
    '@react-native-community/async-storage',
  ];

  const devDependencies = [
    // ts and ts helper
    'typescript',
    '@types/react',
    '@types/react-native',
    // babel
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    'babel-plugin-module-resolver',
    // other
    '@types/styled-components',
  ];
  install(dependencies, {
    yarn: true,
    dev: false,
  });
  install(devDependencies, {
    yarn: true,
    dev: true,
  });
}

function typescript() {
  const tsconfig = json('tsconfig.json');

  tsconfig
    .merge({
      compilerOptions: {
        jsx: 'react',
        experimentalDecorators: true,
        allowJs: true,
        esModuleInterop: true,
        baseUrl: '.',
        paths: {
          '@/*': ['./src/*'],
        },
      },
      include: ['src/**/*'],
      exclude: ['node_modules', 'ios', 'android'],
    })
    .save();
}

function src() {
  const files = [
    'scripts/check-yarn.js',
    'scripts/pod-upgrade.sh',

    'src/hooks/index.ts',
    'src/pages/home/index/index.tsx',
    'src/pages/home/index/styled.ts',
    'src/plugins/storage.ts',
    'src/routes/index.tsx',
    'src/routes/routes.tsx',
    'src/utils/index.ts',
    'src/utils/request.ts',
    'src/typings/index.d.ts',
    'src/typings/react-navigation.d.ts',

    'App.js',
    'babel.config.js',
  ];
  files.forEach((file) => {
    template(file, path.join(__dirname, 'templates', file)).apply().save();
  });

  makeDirs(['src/components', 'src/services']);
}

function script() {
  const pkg = packageJson();

  pkg
    .setScript('preinstall', 'node scripts/check-yarn.js')
    .setScript('install', 'npx pod-install')
    .setScript('pod-upgrade', 'sh scripts/pod-update.sh')
    .save();
}

module.exports = function task() {
  dependency();
  typescript();
  src();
  script();
};

module.exports.parameters = {};

module.exports.description = 'Mrm task for react native';
