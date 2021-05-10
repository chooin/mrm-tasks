// import { json, install, makeDirs, packageJson, copyFiles } from 'mrm-core'
const path = require('path')

function src() {
  const files = [
    'src/pages/home/index/index.tsx',
    'src/pages/home/index/styled.ts',
    'src/routes/routes.tsx',
    'src/routes/routes.tsx',
  ]

  // makeDirs([
  //   'src/pages/home/index',
  //   'src/routes',
  // ])
  console.log(path.resolve(__dirname, 'templates'))
  console.log(files)
  // copyFiles(
  //   path.resolve(__dirname, 'templates'),
  //   files,
  //   { overwrite: false }
  // )
}

src()