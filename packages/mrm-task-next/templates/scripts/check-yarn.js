if (execSync('yarnpkg --version', { stdio: 'ignore' })) {
  console.warn(
    '\u001b[33m仅支持 Yarn 1.x\u001b[39m\n'
  )
  process.exit(1)
}
