if (!/yarn\.js$/.test(process.env.npm_execpath || '')) {
  console.warn(
    '\u001b[33m只支持 Yarn 1.x\u001b[39m\n'
  )
  process.exit(1)
}
