import { json, install, copyFiles } from 'mrm-core'
import path from 'path'

interface Config {}

const packages = ['styled-components']

function environment() {
  const files = [
    '.env.development',
    '.env.production',
    '.env.test',
  ].map((file) => path.resolve(__dirname, `./environment/${file}`))

  copyFiles(__dirname, files)
}

function typescript() {
  const tsconfig = json('tsconfig.json');

  tsconfig.save()
}

function next() {

}

module.exports = function task({}: Config) {
  environment()
  typescript()
  install(packages, {
    yarn: true,
    dev: false
  })
  next()
}

module.exports.parameters = {
}

module.exports.description = 'Mrm task for next.js'
