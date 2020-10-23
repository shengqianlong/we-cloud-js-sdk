# webpack-js-sdk
一个 webpack 打包 JSSDK 的示例

## 命令

```bash
# 安装依赖
yarn install
npm install

# 本地开发调试
yarn dev
npm run dev

# 打包，产出 dist
yarn build
npm run build
```

## 使用

### CDN

```html
<script src="SQL.min.js"></script>
通过sctipt标签引入该文件，会在全局生成名为 `SQL` 的对象
```
### Example

文件上传：

```JavaScript

const upload = SQL.uploadSingleFile(file, bucketId, uploadToken, options)

const subscription = observable.subscribe(observer) // 上传开始
// or
const subscription = upload.subscribe(next, error, complete) // 这样传参形式也可以

// subscription.unsubscribe() // 上传取消
```