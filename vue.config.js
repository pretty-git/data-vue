module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/vueDataV/" : "/",
  productionSourceMap: false,
  lintOnSave: false,
  devServer: {
    port: 8081,
    open: true,
    proxy: {
      // "/gcs": {
      //   target: "http://114.215.69.195:80",
      //   changeOrigin: true,
      //   ws: false,
      //   onProxyRes(proxyRes, req, res) {
      //     //在控制台显示真实代理地址
      //     const realUrl = new URL(req.url || '',process.env.VUE_APP_BASE_API)?.href || ''
      //     proxyRes.headers['x-real-url'] = realUrl
      //   },
      //   pathRewrite: {
      //     "^/gcs": ""
      //   }
      // }
    }
  },
  configureWebpack: {
    // 把原本需要写在webpack.config.js中的配置代码 写在这里 会自动合并
    externals: {
     'jquery' : '$',
     'echarts': 'echarts',
     'axios' : 'axios'
    }
  }
};