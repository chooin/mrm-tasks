import {install, packageJson, template, uninstall, deleteFiles, makeDirs, lines, json} from 'mrm-core'
import {exec} from 'child_process'
import path from 'path'

function dependency() {
  const unDependencies = [
    'react',
    'react-dom',
    '@umijs/preset-react',
  ]
  uninstall(unDependencies, {
    yarn: true,
    dev: false,
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

    '@umijs/preset-react',
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
    'src/pages/error/layout/index.tsx',
    'src/pages/error/layout/styled.ts',
    'src/pages/error/404/index.tsx',
    'src/pages/document.ejs',
    'src/hooks/index.ts',
    'src/routes.ts',
    'scripts/check-yarn.js',

    'Dockerfile',
    'typings.d.ts',
    'commitlint.config.js',

    '.eslintrc',
    '.eslintignore',
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

  lines('.prettierignore')
    .add('dist')
    .save()
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
    .setScript('preinstall', 'node scripts/check-yarn.js')
    .setScript('start', 'UMI_ENV=dev umi dev')
    .setScript('dev', 'yarn start')
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

  packageJson()
    .setScript('prepare', 'husky install')
    .save()

  exec('yarn prepare')
  exec('npx husky add .husky/pre-commit "yarn prettier"')
  exec('npx husky add .husky/commit-msg \'npx --no-install commitlint --edit "$1"\'')

  json('package.json')
    .unset('lint-staged')
    .unset('gitHooks')
    .save()
}

module.exports = function task() {
  husky()
  src()
  environment()
  script()
  dependency()
}
