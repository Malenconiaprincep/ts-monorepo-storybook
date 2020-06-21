const proxy = require('http-proxy-middleware')
module.exports = function expressMiddleware(router) {
  router.use('/api/v5/*', proxy({
    target: 'https://drive.wps.cn/',
    changeOrigin: true
  }))
}