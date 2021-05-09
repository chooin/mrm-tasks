import { json, packageJson, lines, install } from 'mrm-core'

interface Config {
  projectName: string;
}

function createNextApp(projectName: string) {
  const packages = ['yarn', 'create', 'next-app']

  if (projectName) {
    packages.push(projectName)
  }

  install(packages)
}

module.exports = function task({projectName}: Config) {
  createNextApp(projectName)
}

module.exports.parameters = {
  projectName: {
    type: 'input',
    message: 'What is your project named?',
    default: 'example'
  }
}

module.exports.description = 'Mrm task for next.js'
