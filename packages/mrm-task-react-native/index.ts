import { json, install, makeDirs, packageJson, copyFiles } from 'mrm-core'
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
  ]

  const devDependencies = [
    'typescript'
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
  ]

  makeDirs([
    'src/pages/home/index',
    'src/routes',
  ])
  copyFiles(
    path.resolve(__dirname, 'templates'),
    files,
    { overwrite: false }
  )
}

function script() {
  const pkg = packageJson()

  pkg
    .setScript('install', 'npx pod-install')
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
