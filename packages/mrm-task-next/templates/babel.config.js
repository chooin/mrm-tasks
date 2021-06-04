module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ts',
          '.tsx'
        ],
        alias: {
          '@': './src',
        },
      }
    ]
  ]
}
