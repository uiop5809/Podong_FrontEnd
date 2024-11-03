const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/iamport',
    createProxyMiddleware({
      target:'https://api.aimport.kr',
      changeOrigin:true;
    })
  );

}