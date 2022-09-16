# Alecto
A user-script to gather data for sellers on some e-shopping platforms



### # 要求 / Requirements

需要浏览器支持部分 **ECMAScript 8** 标准，即：

- Chrome 或 Chromium内核 版本高于（包含）55 
- Edge 版本高于（包含）14
- Safari 版本高于（包含）10.1
- Firefox 版本高于（包含）52
- Opera 版本高于（包含）42
- 不支持 Internet Explorer 的任何版本

良好的网络条件，无法达到参见故障排除小节：

- 支持`raw.githubusercontent.com`的访问
- 支持`*.github.io`的访问
- 支持`cdnjs.cloudflare.com`的访问
- 支持`cdn.bootcdn.net`的访问





### # 安装 / Installation

下列两种方法选择其一：

**1. 使用浏览器收藏夹**：打开`src/alecto-launcher.js`，将全文复制后，在全文最前加入`javascript:`。将修改后的全文加入`新建书签`或`新建收藏`的地址栏中。

**2. 使用Tamper Monkey插件**: 暂不支持





### # 运行 / Run

完成安装后，点击安装步骤中完成的收藏夹项目。





### # 故障排除 / Troubleshooting

#### 1. 提示 Cannot fetch the latest script

该问题有下列解决方案，选择其一：

**方案1**: 修改Hosts文件，将`185.199.111.133 raw.githubusercontent.com`加入到系统Hosts文件中。如仍然无法实现，可使用 ①虚拟专用网络 或 ②OpenSSL+反向代理 解决上述问题。 

**方案2**: 利用`serve`解决，按照下列步骤

1. 安装Node.js，完成后，在命令行/终端中执行 `npm install -g serve`
2. 安装Git，完成后，在命令行/终端中执行`git clone https://github.com/Aeroraven/Alecto.git `
3. 在第二步得到的文件夹中，在`src`子文件夹下开启命令行/终端，执行`serve`，保证`3000`端口可用。
4. 完成后，重新按照运行小节操作。





### # 许可 / License

MIT
