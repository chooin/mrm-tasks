'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const mrm_core_1 = require('mrm-core');
const path_1 = __importDefault(require('path'));
function dependency() {
  const dependencies = [
    '@react-navigation/native',
    '@react-navigation/stack',
    'react-native-gesture-handler',
    'react-native-reanimated',
    'react-native-safe-area-context',
    'react-native-screens',
    '@react-navigation/bottom-tabs',
    'react-native-lifecycle',
    'styled-components',
    '@react-native-community/cameraroll',
    '@react-native-picker/picker',
    '@react-native-community/segmented-control',
    '@react-native-community/slider',
    'react-native-pager-view',
    'axios',
    '@react-native-community/async-storage',
  ];
  const devDependencies = [
    'typescript',
    '@types/react',
    '@types/react-native',
    '@babel/plugin-proposal-export-namespace-from',
    'babel-plugin-module-resolver',
    '@types/styled-components',
  ];
  (0, mrm_core_1.install)(dependencies, {
    yarn: true,
    dev: false,
  });
  (0, mrm_core_1.install)(devDependencies, {
    yarn: true,
    dev: true,
  });
}
function typescript() {
  const tsconfig = (0, mrm_core_1.json)('tsconfig.json');
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
    (0, mrm_core_1.template)(
      file,
      path_1.default.join(__dirname, 'templates', file),
    )
      .apply()
      .save();
  });
  (0, mrm_core_1.makeDirs)(['src/components', 'src/services']);
}
function script() {
  const pkg = (0, mrm_core_1.packageJson)();
  pkg
    .setScript('preinstall', 'npx only-allow yarn')
    .setScript('install', 'npx pod-install')
    .setScript('pod-upgrade', 'sh scripts/pod-upgrade.sh')
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
