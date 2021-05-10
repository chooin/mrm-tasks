import { json, install, copyFiles } from 'mrm-core'

interface Config {}

const dependencies = [
  'styled-components'
]

function installDependencies() {
  install(dependencies, {
    yarn: true,
    dev: false
  })
}

function environment() {
  const files = [
    'templates/environment/.env.development',
    'templates/environment/.env.production',
    'templates/environment/.env.test',
  ]

  copyFiles(__dirname, files)
}

function typescript() {
  const tsconfig = json('tsconfig.json')

  tsconfig.save()
}

function next() {

}

module.exports = function task({}: Config) {
  installDependencies()
  environment()
  typescript()
  next()
}

module.exports.parameters = {
}

module.exports.description = 'Mrm task for next.js'
