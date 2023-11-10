const { createProxyMiddleware } = require('http-proxy-middleware');


module.exports = function(app: { use: (arg0: string, arg1: any) => void; }) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://72.44.53.85:9000',
      changeOrigin: true,
    })
  );
};