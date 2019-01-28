# Share管理系统

## 项目简介

Share管理系统。

为了使开发快速高效，使用了以下辅助工具：

- 构建工具: webpack + sass
- 技术框架: react + react-router + redux
- 数据交互: fetch + mock
- 其他: npm + git

## 源码结构

```
├── build
├── public
├── src
│   ├── components
│   ├── constants
│   ├── containers
│   ├── middlewares
│   ├── reducers
│   ├── router
│   ├── store
│   ├── utils
│   ├── App.scss
│   └── index.js
├── config-overrides.js
├── config.prod.js
├── pm2.json
└── server.js
```

## 开发预览

1. 在终端中定位至项目目录，执行 `npm start`
2. 修改测试接口地址
      1）若启动本地mock数据，需将`package.json`的中的`proxy`值改为`http://localhost:5002/`
      2）若是测试接口，需将`package.json`的中的`proxy`值改成测试接口的地址

```
🌎  => Server is running on port 3000
[BS] Proxying: http://192.168.18.127:3000
```

根据终端提示，打开浏览器进行调试开发。

## 线上布署

1. 执行 `npm build`
2. 启动 `pm2 start pm2.json`

如需了解更多PM2资料，请查看 [PM2官网](http://pm2.keymetrics.io/) 

