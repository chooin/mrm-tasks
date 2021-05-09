import { json, packageJson, lines, install } from 'mrm-core'

interface Config {}

const packages = ['styled-components']

function environment() {

}

function typescript() {
  const tsconfig = json('tsconfig.json');

  tsconfig.set('baseUrl', '.')
  tsconfig.set('compilerOptions.target', 'es5')
  tsconfig.set('compilerOptions.allowJs', true)
  tsconfig.set('compilerOptions.paths.@/*', ['./src/*'])
  tsconfig.set('compilerOptions.exclude', ['node_modules'])

  tsconfig.save()
}

module.exports = function task({}: Config) {
  environment()
  typescript()
  install(packages, {
    yarn: true,
    dev: false
  })
}

module.exports.parameters = {
}

module.exports.description = 'Mrm task for next.js'
