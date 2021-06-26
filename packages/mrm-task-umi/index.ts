import {install, packageJson, template, uninstall, deleteFiles, makeDirs} from 'mrm-core'
import {exec} from 'child_process'
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
  ]
  const devDependencies = [
    '@types/styled-components',

    // eslint
    'eslint',
    'eslint-plugin-promise',
    'eslint-plugin-import',
    'eslint-plugin-jsx-a11y',
    'eslint-plugin-react',
    'eslint-plugin-react-hooks',
    '@typescript-eslint/eslint-plugin',
    'eslint-config-airbnb-typescript',

    '@commitlint/config-conventional',
    '@commitlint/cli',
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
    'src/pages/home/layout/index.tsx',
    'src/pages/home/layout/styled.ts',
    'src/pages/home/index/index.tsx',
    'src/pages/home/index/styled.ts',
    'src/hooks/index.ts',
    'src/routes.ts',
    'src/404.tsx',
    'src/document.ejs',
    'scripts/check-yarn.js',

    'Dockerfile',
    'typings.d.ts',
    'commitlint.config.js',

    '.eslintrc',
    '.nvmrc'
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
    '.umirc.dev.ts',
    '.umirc.prod.ts',
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
}

function script() {
  const pkg = packageJson()

  pkg
    .setScript('prepare', 'husky install')
    .setScript('preinstall', 'node scripts/check-yarn.js')
    .setScript('start', 'UMI_ENV=dev umi dev')
    .setScript('build:dev', 'UMI_ENV=dev umi build')
    .setScript('build:prod', 'UMI_ENV=prod umi build')
    .removeScript('build')
    .save()
}

function husky() {
  const devDependencies = [
    'husky',
  ]

  install(devDependencies, {
    yarn: true,
    dev: true,
  })

  exec('npx husky add .husky/commit-msg \'npx --no-install commitlint --edit "$1"\'')
}

module.exports = function task() {
  husky()
  src()
  environment()
  script()
  dependency()
}
