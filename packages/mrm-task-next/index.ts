import { json, install, template } from 'mrm-core'
import path from 'path'

interface Config {}

const dependencies = [
  'styled-components',
  'axios',
]

function dependency() {
  install(dependencies, {
    yarn: true,
    dev: false
  })
}

function environment() {
  const files = [
    'templates/.env.development',
    'templates/.env.production',
    'templates/.env.test',
  ]

  files.forEach((file) => {
    template(
      file.replace(/templates\//, ''),
      path.join(__dirname, file)
    )
    .apply({})
    .save()
  })
}

function typescript() {
  const tsconfig = json('tsconfig.json')

  tsconfig.save()
}

function src() {

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
