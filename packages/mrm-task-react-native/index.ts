import { json, install, template } from 'mrm-core'

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

function dependency() {
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
  const templates = [
    'templates/src'
  ]

  templates.forEach((item) => {
    template(
      
      path.join(__dirname, item)
    )
  })
}

module.exports = function task() {
  dependency()
  typescript()
  src()
}

module.exports.parameters = {
}

module.exports.description = 'Mrm task for react native'
