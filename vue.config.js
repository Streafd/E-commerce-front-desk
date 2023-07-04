const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
        pathReWrite: { '^/api': '' },
        ws: true,
        changeOrigin: true
      }
    }
  },
  publicPath: './'
})
