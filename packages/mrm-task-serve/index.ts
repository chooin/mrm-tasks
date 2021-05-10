import { install, template } from 'mrm-core'
import path from 'path'

interface Config {
  dist: string;
  port: number;
}

const dependencies = [
  'express',
  'connect-history-api-fallback',
]

function dependency() {
  install(dependencies, {
    yarn: true,
    dev: false
  })
}

function src({dist, port}: Config) {
  const files = [
    'templates/serve.js',
  ]

  files.forEach((file) => {
    template(
      file.replace(/templates\//, ''),
      path.join(__dirname, file)
    )
      .apply({
        dist,
        port,
      })
      .save()
  })
}

module.exports = function task(config: Config) {
  dependency()
  src(config)
}

module.exports.parameters = {
  dist: {
    type: 'input',
    message: 'Please enter dist directory.',
    default: 'dist',
  },
  port: {
    type: 'number',
    message: 'Please enter port.',
    default: 8080,
    validate(value: number) {
      return value ? true : 'port is required';
    }
  }
}

module.exports.description = 'Mrm task for serve'
