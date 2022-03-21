# Sentry Taro SDK
Fork[sentry-miniapp](https://github.com/lizhiyao/sentry-miniapp)改造而来

用于Taro小程序的 Sentry SDK

## 功能特点

- [x] 基于 [sentry-javascript 最新的基础模块](https://github.com/getsentry/sentry-javascript) 封装
- [x] 使用 [TypeScript](https://www.typescriptlang.org/) 进行编写
- [x] 包含 Sentry SDK（如：[@sentry/browser](https://github.com/getsentry/sentry-javascript/tree/master/packages/browser)）的所有基础功能
- [x] 支持 `ES6`、`CommonJS` 两种模块系统（支持小程序原生开发方式、使用小程序框架开发方式两种开发模式下使用）
- [x] 默认监听并上报小程序的 onError、onUnhandledRejection、onPageNotFound、onMemoryWarning 事件返回的信息（各事件支持程度与对应各小程序官方保持一致）
- [x] 默认上报运行小程序的设备、操作系统、应用版本信息
- [x] 支持微信小程序
- [x] 支持在 [Taro](https://taro.aotu.io/) 等第三方小程序框架中使用
- [x] 默认上报异常发生时的路由栈
- [ ] 完善的代码测试
- [ ] 支持 redux 错误上报
- [ ] 支持 webview 错误上报

## 用法

支持两种使用方式：

- 直接引用
- 通过 npm 方式使用（推荐）

### 注意

1. 使用前需要确保有可用的 `Sentry Service`，比如：使用 [官方 Sentry Service](https://sentry.io/welcome/) 服务 或[自己搭建 Sentry Service](https://docs.sentry.io/server/)。如果想直接将异常信息上报到 <https://sentry.io/>，由于其没有备案，可以先将异常信息上报给自己已备案域名下的服务端接口，由服务端进行请求转发。
2. 在小程序管理后台配置 `Sentry Service` 对应的 `request` 合法域名

### npm 方式

1. 安装依赖

   ```bash
   npm install sentry-taro-miniapp --save
   # 或者
   yarn add sentry-taro-miniapp
   ```

2. 使用「微信开发者工具 - 工具 - 构建 npm」进行构建，详情可参考[npm 支持](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)

3. 在 `app.js` 中引用并初始化 `Sentry`，根据实际需求设置上报到 Sentry 的元信息

   ```js
   import * as Sentry from "sentry-miniapp";

   // init Sentry
   // init options: https://github.com/getsentry/sentry-javascript/blob/master/packages/types/src/options.ts
   Sentry.init({
     dsn: "__DSN__",
     // ...
   });

   // Set user information, as well as tags and further extras
   Sentry.configureScope((scope) => {
     scope.setExtra("battery", 0.7);
     scope.setTag("user_mode", "admin");
     scope.setUser({ id: "4711" });
     // scope.clear();
   });

   // Add a breadcrumb for future events
   Sentry.addBreadcrumb({
     message: "My Breadcrumb",
     // ...
   });

   // Capture exceptions, messages or manual events
   Sentry.captureException(new Error("Good bye"));
   Sentry.captureMessage("Hello, world!");
   Sentry.captureEvent({
     message: "Manual",
     stacktrace: [
       // ...
     ],
   });
   ```

## 开发

### 知识储备

开发前请仔细阅读下面内容：

- [sentry-javascript README 中文版](https://www.yuque.com/lizhiyao/dxydance/sentry-javascript-readme-cn)
- [Sentry 开发指南](https://www.yuque.com/lizhiyao/dxydance/sentry-develop-guide)
- [sentry-javascript 源码阅读](https://www.yuque.com/lizhiyao/dxydance/sentry-javascript-src)

#### sentry-core 设计图

![Dashboard](docs/sentry-core.png)

#### sentry-hub 设计图

![Dashboard](docs/sentry-hub.png)

#### sentry-miniapp 设计图

![Dashboard](docs/sentry-miniapp.png)

### 相关命令

```bash
# 根据 package.json 中的版本号更新 SDK 源码中的版本号
npm run version

# 构建供小程序直接引用的 sentry-miniapp.xx.min.js；在本地可直接使用开发者工具打开 examples 下具体项目进行调试
npm run build:dist

# 构建供微信小程序直接引用的 sentry-miniapp.wx.min.js
npm run build:wx

# 构建供支付宝小程序直接引用的 sentry-miniapp.my.min.js
npm run build:my

# 构建供钉钉小程序直接引用的 sentry-miniapp.dd.min.js
npm run build:dd

# 构建供字节跳动小程序直接引用的 sentry-miniapp.tt.min.js
npm run build:tt

# 构建供百度小程序直接引用的 sentry-miniapp.swan.min.js
npm run build:swan

# 构建用于发布到 npm 的 dist 资源
npm run build

# 构建用于发布到 npm 的 esm 资源
npm run build:esm

# 发布到 npm
npm publish
```

## 效果图

![Dashboard](docs/screenshot/sentry-admin.png)
![Error00](docs/screenshot/sentry-error-00.png)
![Error01](docs/screenshot/sentry-error-01.png)
![Error02](docs/screenshot/sentry-error-02.png)

## 参考资料

- [sentry-javascript](https://github.com/getsentry/sentry-javascript)
- [Sentry Getting Started](https://docs.sentry.io/error-reporting/quickstart/?platform=browsernpm)
- [Sentry JavaScript SDKs](http://getsentry.github.io/sentry-javascript/)
- [Sentry TypeScript Configuration](https://github.com/getsentry/sentry-javascript/tree/master/packages/typescript)
- [wx.request](https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html)
- [小程序 App](https://developers.weixin.qq.com/miniprogram/dev/reference/api/App.html)
- [wx.onError、App.onError 疑惑及如何捕获 Promise 异常？](https://developers.weixin.qq.com/community/develop/doc/000c8cf5794770272709f38a756000)
- [shields.io](https://shields.io/)
- [字节跳动小程序文档](https://developer.toutiao.com/docs/framework/)
- [支付宝小程序文档](https://docs.alipay.com/mini/developer)
- [tt.onError 的疑问](http://forum.microapp.bytedance.com/topic/2806/tt-onerror-%E7%96%91%E9%97%AE)

## 其他小程序异常监控产品

- [Fundebug](https://www.fundebug.com/)
- [FrontJS](https://www.frontjs.com/home/tour)
- [Bugout](https://bugout.testin.cn/)
