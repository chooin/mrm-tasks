import { json, install } from 'mrm-core'

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

  install(packages)
}

module.exports = function task({}: Config) {
  typescript()
}

module.exports.parameters = {
}

module.exports.description = 'Mrm task for react native'
