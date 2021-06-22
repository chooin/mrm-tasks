import {install, packageJson, template, uninstall, deleteFiles, makeDirs, lines} from 'mrm-core'
import path from 'path'

function dependency() {
  const unDependencies = [
    'react',
    'react-dom',
  ]
  uninstall(unDependencies, {
    yarn: true,
  })

  const dependencies = [
    'react',
    'react-dom',
    '@umijs/hooks',
    'query-string',
    'styled-components',
    'antd-mobile',
    'dayjs',
    'axios',
  ]
  const devDependencies = [
    'cross-env',
    '@types/styled-components',
  ]

  install(dependencies, {
    yarn: true,
    dev: false
  })

  install(devDependencies, {
    yarn: true,
    dev: true
  })
}

function src() {
  deleteFiles([
    'src/pages/index.tsx',
    'src/pages/index.less',
  ])

  const files = [
    'src/pages/home/index/index.tsx',
    'src/pages/home/index/styled.ts',

    'src/404.tsx',
    'src/document.ejs',
    'src/vendor/axios.ts',

    'scripts/check-yarn.js',

    'routes.ts',
    'app.tsx',

    '.dockerignore',
    'Dockerfile',
  ]

  files.forEach((file) => {
    template(
      file,
      path.join(__dirname, 'templates', file)
    )
      .apply()
      .save()
  })

  makeDirs([
    'src/services',
    'src/components',
  ])
}

function environment() {
  const files = [
    '.umirc.development.ts',
    '.umirc.production.ts',
    '.umirc.ts',
  ]

  files.forEach((file) => {
    template(
      file,
      path.join(__dirname, 'templates', file)
    )
      .apply()
      .save()
  })

  lines('typings.d.ts')
    .add('declare const API_URL: string;')
    .save()
}

function script() {
  const pkg = packageJson()

  pkg
    .setScript('preinstall', 'node scripts/check-yarn.js')
    .setScript('start', 'cross-env UMI_ENV=development umi dev')
    .setScript('build:development', 'cross-env UMI_ENV=development umi build')
    .setScript('build:production', 'cross-env UMI_ENV=production umi build')
    .removeScript('build')
    .save()
}

module.exports = function task() {
  environment()
  dependency()
  script()
  src()
}
