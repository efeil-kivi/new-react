# antd

## 安装

```
yarn add antd
```

## 使用

```tsx
import "antd/dist/antd.less"; //在src/index.tsx 下添加
```

## CRACO

为 antd 创建配置

### 安装：

```
yarn add @craco/craco
 yarn add craco-less

```

### 修改 package.json

```json
"scripts": {
  "start": "craco start",
  "build": "craco build",
  "test": "craco test",
  "eject": "react-scripts eject",
  "prettier": "prettier -w src/",
  "json-server": "json-server __json_server_mock__/db.json --watch --port 3001 --middlewares __json_server_mock__/middleware.js",
  "prepare": "husky install"
},
```

### 添加 src/craco.config.js

```tsx
/* craco.config.js */
const CracoLessPlugin = require("craco-less");
module.exports = {
  plugin: [
    {
      plugin: CracoLessPlugin,
      option: {
        lessLoaderOptions: {
          modifyVars: {
            "@primary-color": "rgb(0,82,204)",
            "@front-size-base": "16px",
          },
          javascriptEnabled: true,
        },
      },
    },
  ],
  // ...
};
```
