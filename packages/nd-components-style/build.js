import fs from 'fs'
import postcss from 'postcss'
import config from './postcss.config.js'
import glob from 'glob'

fs.readFile('src/index.css', (err, css) => {
  if (err) {
    throw err
  }
  postcss(config.plugins)
    .process(css, {
      from: 'src/index.css',
      to: 'dist/index.css'
    })
    .then(res => {
      fs.writeFileSync('dist/index.css', res.css)
      if (res.map) {
        fs.writeFileSync('dist/index.css.map', res.map)
      }
    })
})

glob('src/*.css', (err, files) => {
  if (err) {
    throw err
  }
  files.map(src => {
    fs.readFile(src, (err, css) => {
      if (err) throw err
      const dist = src.replace('src', 'lib')
      postcss(config.plugins)
        .process(css, {
          from: src,
          to: dist
        })
        .then(res => {
          fs.writeFileSync(dist, res.css)
          if (res.map) {
            fs.writeFileSync(`${dist}.map`, res.map)
          }
        })
    })
  })
})
