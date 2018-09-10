'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const striptags = require('./strip-tags')
const md = require('markdown-it')()

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const wrap = function(render) {
  return function() {
    return render.apply(this, arguments)
      .replace('<code v-pre class="', '<code class="hljs ')
      .replace('<code>', '<code class="hljs">')
  }
}

function convert(str) {
  str = str.replace(/(&#x)(\w{4});/gi, function($0) {
    return String.fromCharCode(parseInt(encodeURIComponent($0).replace(/(%26%23x)(\w{4})(%3B)/g, '$2'), 16))
  })
  return str
}
module.exports = {
  context: path.resolve(__dirname, '../'),
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      '~': resolve('packages'),
      '@mixins': resolve('src/mixins'),
      '@utils': resolve('src/utils')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.md$/,
        loader: 'vue-markdown-loader',
        options: {
          use: [
            [require('markdown-it-container'), 'demo', {
              validate: function(params) {
                return params.trim().match(/^demo\s*(.*)$/)
              },

              render: function(tokens, idx) {
                var m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
                if (tokens[idx].nesting === 1) {
                  var description = (m && m.length > 1) ? m[1] : ''
                  var content = tokens[idx + 1].content
                  var html = convert(striptags.strip(content, ['script', 'style'])).replace(/(<[^>]*)=""(?=.*>)/g, '$1')
                  var script = striptags.fetch(content, 'script')
                  var style = striptags.fetch(content, 'style')
                  var jsfiddle = { html: html, script: script, style: style }
                  var descriptionHTML = description
                    ? md.render(description)
                    : ''

                  jsfiddle = md.utils.escapeHtml(JSON.stringify(jsfiddle))

                  return `<demo-block class="demo-box" :jsfiddle="${jsfiddle}">
                            <div class="source" slot="source">${html}</div>
                            ${descriptionHTML}
                            <div class="highlight" slot="highlight">`
                }
                return '</div></demo-block>\n'
              }
            }],
            [require('markdown-it-container'), 'tip'],
            [require('markdown-it-container'), 'warning']
          ],
          preprocess: function(MarkdownIt, source) {
            MarkdownIt.renderer.rules.table_open = function() {
              return '<table class="table">';
            };
            MarkdownIt.renderer.rules.fence = wrap(MarkdownIt.renderer.rules.fence)
            return source;
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('packages'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
