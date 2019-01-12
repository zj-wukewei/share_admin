'use strict';
// 倚赖
const path = require('path');
const express = require('express');
const proxy = require('express-http-proxy');
const helmet = require('helmet');
const compression = require('compression');
const config = require('./config.prod');
// express 实例
const app = express();
// 设置 HTTP 头
// reference: http://expressjs.com/zh-cn/advanced/best-practice-security.html
app.use(helmet());
// 开启 gzip 压缩
// reference: http://expressjs.com/zh-cn/advanced/best-practice-performance.html
app.use(compression());
// 静态资源服务
app.use(express.static(path.join(__dirname, 'build')));

// api proxy
app.use('/', proxy(config.api, {
  forwardPath: function (req, res) {
    // return require('url').parse("/smartShoes-wechat" + req.url).path;
    return require('url').parse(req.url).path;
  }
}));
app.get('*', function (req, res) {
  res.sendFile(__dirname + '/build/index.html');
});
const port = config.port || process.env.PORT
window.console.log("prot:" + config.port)
app.listen(port, function () {
  window.console.log('🌎 => App is running on port %s', port)
})
