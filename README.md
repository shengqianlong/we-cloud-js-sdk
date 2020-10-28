# Wecloud-JavaScript-SDK

基于Wecloud API 开发的前端 JavaScript SDK

### 当前版本为 1.x

## 快速导航

* [功能简介](#summary)
* [准备](#ready)
* [引入](#install)
* [使用](#usage)

## 概述

Wecloud-JavaScript-SDK 为客户端 SDK，没有包含 `token` 生成实现，为了安全，`token` 建议通过网络从服务端获取，具体生成代码可以参考服务端 SDK 的文档。

<!--
本 SDK 可使开发者忽略上传底层实现细节，而更多的关注 UI 层的展现。
 -->
<a id="summary"></a>

## 功能简介

* 上传
  * 文件上传
  * 图片上传

<a id="ready"></a>

## 准备

* JS-SDK 依赖服务端颁发 `token`，可以通过以下二种方式实现：

  前端通过接口请求以获得 `token` 信息

<a id="install"></a>

## 引入

支持以下几种安装方式

* 直接使用静态文件地址：

  ```
  静态文件地址-暂无
  ```
  通过sctipt标签引入该文件，会在全局生成名为 `Wecloud` 的对象

* 使用 NPM 安装

  NPM 的全称是 Node Package Manager，是一个[ NodeJS ](https://nodejs.org)包管理和分发工具，已经成为了非官方的发布 Node 模块（包）的标准。如果需要更详细的关于 NPM 的使用说明，您可以访问[ NPM 官方网站](https://www.npmjs.com)，或对应的[中文网站](http://www.npmjs.com.cn/)

  ```
  npm install wecloud-js
  ```
  ```Javascript
  const wecloud = require('wecloud-js')
  // or
  import * as wecloud from 'wecloud'
  ```

* 通过源码编译

`git clone git@https://github.com/shengqianlong/we-cloud-js-sdk.git`，进入项目根目录执行 `npm install` ，执行 `npm run build`，即可在dist 目录生成 `Wecloud.min.js`。

<a id="usage"></a>

## 使用

`wecloud.upload` 返回一个 `observable` 对象用来控制上传行为，`observable` 对像通过 `subscribe` 方法可以被 `observer` 所订阅，订阅同时会开始触发上传，同时返回一个 `subscription` 对象，该对象有一个 `unsubscribe` 方法取消订阅，同时终止上传行为。

### Example

文件上传：

```JavaScript

const upload = wecloud.uploadSingleFile(file, bucketId, uploadToken, options)

const subscription = observable.subscribe(observer) // 上传开始
// or
const subscription = upload.subscribe(next, error, complete) // 这样传参形式也可以

subscription.unsubscribe() // 上传取消
```

## API Reference Interface

### wecloud.upload(file, bucketId, uploadToken, options): observable

  * **observable**: 为一个带有 subscribe 方法的类实例

    * observable.subscribe(observer)

      * observer: `observer` 为一个 `object`，用来设置上传过程的监听函数，有三个属性 `next`、`error`、`complete`:

        ```JavaScript
        const observer = {
          next(res){
            // ...
          },
          error(err){
            // ...
          },
          complete(res){
            // ...
          }
        }
        ```
        * next: 接收上传进度信息的回调函数，回调函数参数值为 `object`，包含字段信息如下：
          * total: 包含`loaded`、`total`、`percent`三个属性:
            * total.loaded: `number`，已上传大小，单位为字节。
            * total.total: `number`，本次上传的总量控制信息，单位为字节，注意这里的 total 跟文件大小并不一致。
            * total.percent: `number`，当前上传进度，范围：0～100。

        * error: 上传错误后触发；参数 err 为一个包含 `code`、`message`、`isRequestError` 三个属性的 `object`：
          * err.isRequestError: 用于区分是否 xhr 请求错误；当 xhr 请求出现错误并且后端通过 HTTP 状态码返回了错误信息时，该参数为 `true`；否则为 `undefined` 。
          * err.code: `number`，请求错误状态码，只有在 `err.isRequestError` 为 true 的时候才有效
          * err.message: `string`，错误信息，包含错误码，当后端返回提示信息时也会有相应的错误信息。

        * complete: 接收上传完成后的后端返回信息，具体返回结构取决于后端sdk的配置

      * subscription: 为一个带有 `unsubscribe` 方法的类实例，通过调用 `subscription.unsubscribe()` 停止当前文件上传。

