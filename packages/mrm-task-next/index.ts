import { json, install, template } from 'mrm-core'
import path from 'path'

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
    '.env.development',
    '.env.production',
    '.env.test',
  ]

  files.forEach((file) => {
    template(
      file,
      path.join(__dirname, 'templates/.env')
    )
    .apply({})
    .save()
  })
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
