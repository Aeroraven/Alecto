# Alecto
A user-script to gather data for sellers on some e-shopping platforms


### 1 要求 / Requirements

只支持下列两个浏览器，在其他浏览器上的运行未经过尝试。

- Chrome 或 Chromium内核 版本高于（包含）55 
- Edge 版本高于（包含）14


### 2 安装 / Installation

1. 请在浏览器上安装Tamper Monkey插件：
   1. Chrome 安装地址：https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo
   2. Edge 安装地址：https://microsoftedge.microsoft.com/addons/detail/iikmkjmpaadaobahmlepeloendndfphd
2. 安装脚本
   1. 访问https://github.com/Aeroraven/Alecto
   2. 在页面右侧找到Releases部分，点击进入Latest版本
   3. 点击alecto.user.js文件
   4. 在Tamper Monkey的弹出页面中选择安装或重新安装


### 3 运行 / Run

脚本将在访问网页时自动运行，具体可参考Tamper Monkey的用户手册


### 4 构建 / Build

如果需要修改脚本内容，按照下面步骤

1. 安装 Node.js并`git clone`下载本仓库
2. 安装依赖
```shell
npm install -g uglify-js
npm install
```
3. 构建脚本
```shell
npm run all
```


### 5 许可 / License

AGPL 3.0
