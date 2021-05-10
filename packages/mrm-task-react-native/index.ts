import { json, install, copyFiles } from 'mrm-core'

const dependencies = [
  '@react-navigation/native',
  '@react-navigation/stack',
  'react-native-gesture-handler',
  'react-native-reanimated',
  'react-native-safe-area-context',
  'react-native-screens',
  'react-native-lifecycle',
  'styled-components',
]
const devDependencies = [
  'typescript'
]

function installDependencies() {
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
    'templates/src'
  ]

  copyFiles(`${__dirname}/src`, files)
}

module.exports = function task() {
  installDependencies()
  typescript()
  src()
}

module.exports.parameters = {
}

module.exports.description = 'Mrm task for react native'
