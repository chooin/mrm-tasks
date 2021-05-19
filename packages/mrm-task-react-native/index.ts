import { json, install, packageJson, copyFiles } from 'mrm-core'
import path from 'path'

function dependency() {
  const dependencies = [
    '@react-navigation/native',
    '@react-navigation/stack',
    'react-native-gesture-handler',
    'react-native-reanimated',
    'react-native-safe-area-context',
    'react-native-screens',
    'react-native-lifecycle',
    'styled-components',
    'axios',
    '@react-native-community/async-storage',
    '@react-navigation/bottom-tabs',
  ]

  const devDependencies = [
    'typescript',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    '@types/react',
    '@types/react-native',
    '@types/styled-components',
    'babel-plugin-module-resolver',
  ]
  install(dependencies, {
    yarn: true,
    dev: false
  })
  install(devDependencies, {
    yarn: true,
    dev: true
  })
}

function typescript() {
  const tsconfig = json('tsconfig.json')

  tsconfig
    .merge({
      compilerOptions: {
        jsx: 'react',
        experimentalDecorators: true,
        allowJs: true,
        esModuleInterop: true,
        baseUrl: '.',
        paths: {
          '@/*': ['./src/*']
        }
      },
      include: ['src/**/*'],
      exclude: ['node_modules', 'ios', 'android']
    })
    .save()
}

function src() {
  const files = [
    'src/pages/home/index/index.tsx',
    'src/pages/home/index/styled.ts',
    'src/routes/index.tsx',
    'src/routes/routes.tsx',
    'scripts/check-yarn.js',
    'scripts/pod-update.sh',
  ]

  copyFiles(
    path.resolve(__dirname, 'templates'),
    files,
    { overwrite: false }
  )
  copyFiles(
    path.resolve(__dirname, 'templates'),
    [
      'App.js',
      'babel.config.js'
    ],
    { overwrite: true }
  )
}

function script() {
  const pkg = packageJson()

  pkg
    .setScript('preinstall', 'node scripts/check-yarn.js')
    .setScript('install', 'npx pod-install')
    .setScript('pod-update', 'sh scripts/pod-update.sh')
    .save()
}

module.exports = function task() {
  dependency()
  typescript()
  src()
  script()
}

module.exports.parameters = {
}

module.exports.description = 'Mrm task for react native'
