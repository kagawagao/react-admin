module.exports = {
  plugins: [
    require('postcss-import')({
      plugins: [
        require('stylelint')({
          configFile: './.stylelintrc'
        })
      ]
    }),
    require('postcss-url')(),
    require('postcss-cssnext')(),
    require('postcss-browser-reporter')(),
    require('postcss-reporter')()
  ]
}
