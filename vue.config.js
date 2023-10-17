// 引入等比适配插件
const px2rem = require('postcss-px2rem')

// 配置基本大小
const postcss = px2rem({
  // 这里的16是默认的基准，因为根元素字体的默认大小就是16
  remUnit: 16
})

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/vueDataV/" : "/",
  productionSourceMap: false,
  lintOnSave: true,
  devServer: {
    port: 8081,
    open: false,
    proxy: {
      "/apis": {
        target: "http://www.sinupaas.com",
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          "^/apis": ""
        }
      }
    }
  },
  configureWebpack: {
    // 把原本需要写在webpack.config.js中的配置代码 写在这里 会自动合并
    externals: {
     'jquery' : '$',
     'echarts': 'echarts',
     'axios' : 'axios'
    }
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          postcss
        ]
      }
    }
  }
};