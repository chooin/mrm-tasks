import { json, install, template, makeDirs } from 'mrm-core'
import path from 'path'

interface Config {}

function dependency() {
  const dependencies = [
    'styled-components',
    'axios',
  ]

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
      path.join(__dirname, 'templates', file)
    )
    .apply()
    .save()
  })
}

function typescript() {
  const tsconfig = json('tsconfig.json')

  tsconfig.save()
}

function src() {
  makeDirs([
    'src/client',
    'src/server',
    'src/shared',
  ])
}

module.exports = function task({}: Config) {
  dependency()
  environment()
  typescript()
  src()
}

module.exports.parameters = {
}

module.exports.description = 'Mrm task for next.js'
