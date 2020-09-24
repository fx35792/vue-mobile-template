module.exports = {
    host: '0.0.0.0',
    port: 8000,
    https: false,
    hotOnly: false,
    proxy: {
      '^/api': {
        // 测试环境
        target: process.env.VUE_APP_API, //'http://localhost:8000/', // 接口域名  
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/api': '' // 需要rewrite重写的,  // /mock
        }
      }
    }
}