const path = require('path')
const SpritesmithPlugin = require('webpack-spritesmith')// 雪碧图
const TerserPlugin = require('terser-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const devServer = require('./server')

const cdn = {
  // 开发环境
  dev: {
    css: [],
    js: []
  },
  // 生产环境
  build: {
    css: [
    ],
    js: [
      'https://lib.baomitu.com/vue/2.6.11/vue.min.js',
      'https://lib.baomitu.com/vue-router/3.2.0/vue-router.min.js',
      'https://lib.baomitu.com/vuex/3.5.1/vuex.min.js',
      'https://lib.baomitu.com/axios/0.19.2/axios.min.js',
    ]
  }
}
// 打包排除包，通过cdn加载
const externals = {
  'vue': 'Vue',
  'vuex': 'Vuex',
  'axios': 'axios',
  'vue-router': 'VueRouter'
}

// 雪碧图的自定义模板
const templateFunction = function (data) {
  var shared = '.icon-sprite { display: inline-block; background-image: url(I); background-size: Dpx Hpx; }'
    .replace('I', data.sprites[0].image)
    .replace('D', data.sprites[0].total_width / 2)
    .replace('H', data.sprites[0].total_height / 2)

  var perSprite = data.sprites.map(function (sprite) {
    return '.icon-N { width: Wpx; height: Hpx; background-position: Xpx Ypx; }'
      .replace('N', sprite.name.replace(/_/g, '-'))
      .replace('W', sprite.width / 2)
      .replace('H', sprite.height / 2)
      .replace('X', sprite.offset_x / 2)
      .replace('Y', sprite.offset_y / 2)
  }).join('\n')

  return shared + '\n' + perSprite
}
const configureWebpackData = {
  resolve: {
    alias: {
      // 别名
      vue$: 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      '@utils': resolve('src/utils'),
      '@style': resolve('src/assets/css'),
      '@images': resolve('src/assets/images'),
      '@views': resolve('src/views')
    }
  },
  plugins: [
    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, './src/assets/icon'),
        glob: '*.png'
      },
      target: { // 输出雪碧图文件及样式文件，这个是打包后，自动生成的雪碧图和样式
        image: path.resolve(__dirname, './src/assets/images/sprite.png'),
        css: [
          [path.resolve(__dirname, './src/assets/css/sprite.less'), {
            // 引用自己的模板
            format: 'function_based_template'
          }]
        ]
      },
      customTemplates: { // 自定义模板入口
        function_based_template: templateFunction
      },
      apiOptions: { // 样式文件中调用雪碧图地址写法
        cssImageRef: '../images/sprite.png'
      },
      spritesmithOptions: { // 让合成的每个图片有一定的距离
        padding: 20
      }
    })
    // New WorkboxPlugin.GenerateSW({
    // 	ServiceWorkersclientsClaim: true,
    // 	SkipWaiting: true
    // })
  ]
  // optimization: {

  //   splitChunks: {
  //     cacheGroups: {
  //       vendor: {
  //         chunks: 'all',
  //         test: /node_modules/,
  //         name: 'vendor',
  //         minChunks:3,
  //         minSize: 0,
  //         maxInitialRequests: 5,
  //         priority: 100
  //       },
  //       common: {
  //         chunks: 'all',
  //         test: /[\\/]src[\\/]js[\\/]/,
  //         name: 'common',
  //         minChunks: 3,
  //         minSize: 0,
  //         maxInitialRequests: 5,
  //         priority: 60
  //       },
  //       styles: {
  //         name: 'styles',
  //         test: /\.(sa|sc|c|le)ss$/,
  //         chunks: 'all',
  //         enforce: true
  //       },
  //       // runtimeChunk: {
  //       //   name: 'manifest'
  //       // }
  //     }
  //   }
  // }
}
function resolve (dir) {
  return path.join(__dirname, './', dir)
}

module.exports = {
  outputDir: "dist",
  assetsDir: 'assets',
  publicPath: './',
  pages: {
    index: {
      entry: './src/main.js',
      template: path.join(__dirname, 'public/index.html'),
      filename: 'index.html',
      cdn: process.env.VUE_APP_NODE_ENV === 'production' && cdn.build || cdn.dev,
      title: '  '
    }
  },
  lintOnSave: false, // 是否开启编译时是否不符合eslint提示
  devServer,
  configureWebpack: config => {
    configureWebpackData.externals = process.env.VUE_APP_NODE_ENV === 'production' && externals || {};
    if (process.env.VUE_APP_NODE_ENV === 'production' || process.env.VUE_APP_NODE_ENV === 'devproduction') {
      config.plugins.push(
        new TerserPlugin({
          terserOptions: {
            ecma: undefined,
            warnings: false,
            parse: {},
            compress: {
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ['console.log'] // 移除console
            }
          }
        })
      )
    }

    if (process.env.VUE_APP_NODE_ENV === 'production') {
      configureWebpackData.plugins.push(new CompressionPlugin({
        test: /\.js$|\.html$|\.css/,
        threshold: 10240,
        deleteOriginalAssets: false
      }))
    }

    return configureWebpackData
  },
  chainWebpack: config => {
    config.output.filename('assets/js/[name].[hash].js').end()
    config.output.chunkFilename('assets/js/[name].[hash].js').end()

    // config.resolve.symlinks(true)
    // 移除 prefetch 插件
    // config.plugins.delete('prefetch')
    // 移除 preload 插件
    // config.plugins.delete('preload')

    // config.plugin('html').tap(args => {
    //   console.log(args)
    //   if (process.env.VUE_APP_NODE_ENV === 'production') {
    //     args[0].cdn = cdn.build
    //   }
    //   if (process.env.VUE_APP_NODE_ENV === 'development') {
    //     args[0].cdn = cdn.dev
    //   }
    //   return args
    // })

    // config.module
    //   .rule('images')
    //   .use('image-webpack-loader')
    //   .loader('image-webpack-loader')
    //   .options({
    //     bypassOnDebug: true
    //   })
    //   .end()
  },
  productionSourceMap: false,
  css: {
    // extract: true,
    sourceMap: false,
    // modules: false,
    requireModuleExtension: true,
    loaderOptions: {

    }
  }
}
