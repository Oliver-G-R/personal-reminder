module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module-resolver', {
        alias: {
          '@components': './src/components',
          '@screens': './src/screens',
          '@context': './src/context',
          '@Types': './src/Types',
          '@hooks': './src/hooks',
          '@helpers': './src/helpers'
        }
      }]
    ]
  }
}
