import {json, install, template, packageJson, copyFiles, makeDirs} from 'mrm-core'
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
  const files = [
    'src/client/configs/index.ts',
    'src/client/pages/home/index/index.tsx',
    'src/client/pages/home/index/styled.ts',
    'src/client/pages/layout/index.tsx',
    'src/client/pages/layout/styled.ts',

    'src/server/configs/index.ts',

    'src/shared/typings/axios.d.ts',
    'src/shared/utils/check-yarn.js',

    'Dockerfile',
  ]

  copyFiles(
    path.resolve(__dirname, 'templates'),
    files,
    { overwrite: false }
  )
  makeDirs([
    'src/client/utils',

    'src/server/utils',
  ])
}

function script() {
  const pkg = packageJson()

  pkg
    .setScript('preinstall', 'node ./scripts/check-yarn.js')
    .save()
}

module.exports = function task({}: Config) {
  dependency()
  environment()
  typescript()
  src()
  script()
}

module.exports.parameters = {
}

module.exports.description = 'Mrm task for next.js'
