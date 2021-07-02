import {install, json, lines, template, deleteFiles} from 'mrm-core'
import path from "path";

function git() {
  lines('.gitignore')
    .add('.idea')
    .save()
}

function dependency() {
  const devDependencies = [
    'dotenv',
    '@tarojs/cli', // 锁定 cli 版本
  ]

  install(devDependencies, {
    yarn: true,
    dev: true,
  })
}

function pages() {
  deleteFiles([
    'src/pages/index/index.tsx',
    'src/pages/index/index.config.ts',
    'src/pages/index/index.scss',
  ])

  const files = [
    'pages/home/index/index.config.ts',
    'pages/home/index/index.tsx',
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

function env() {
  const files = [
    'config/dev.js',
    'config/prod.js',
    '.env.dev',
    '.env.prod'
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

function tsconfig() {
  json('tsconfig.json')
    .set('compilerOptions.paths', {
      '@/*': ['./src/*'],
    })
    .save()
}

module.exports = function task() {
  git()
  env()
  pages()
  tsconfig()
  dependency()
}
