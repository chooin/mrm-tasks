import { json, install, makeDirs } from 'mrm-core'

interface Config {}

function typescript() {
  const tsconfig = json('tsconfig.json')
  const packages = [
    'typescript'
  ]

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

  install(packages, {
    dev: true,
  })
}

function src() {
  makeDirs([
    'src'
  ])

  const packages = [
    '@react-navigation/native',
    '@react-navigation/stack',
    'react-native-gesture-handler',
    'react-native-reanimated',
    'react-native-safe-area-context',
    'react-native-screens',
    'react-native-lifecycle',
    'styled-components',
  ]

  install(packages, {
    dev: false,
  })
}

module.exports = function task({}: Config) {
  typescript()
  src()
}

module.exports.parameters = {
}

module.exports.description = 'Mrm task for react native'
