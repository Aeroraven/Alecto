# Alecto
A user-script to gather data for sellers on some e-shopping platforms


### # 注意事项 / Notice

- 脚本将对您当前浏览的网页进行破坏性且不可逆的操作，请不要使用当前网页进行敏感操作。包括但不仅限于：
   - 部分DOM操作将被重写，网页的表现可能存在不正常现象

- 脚本将监听当前网页上的敏感信息，包括但不仅限于：
   - Cookie将被用于计算部分请求的校验码信息
   - XMLHTTPRequest中的部分方法将被重写，拦截以获取部分链接地址

### # 要求 / Requirements

需要浏览器支持部分 **ECMAScript 8** 标准，即：

- Chrome 或 Chromium内核 版本高于（包含）55 
- Edge 版本高于（包含）14
- Safari 版本高于（包含）10.1
- Firefox 版本高于（包含）52
- Opera 版本高于（包含）42
- 不支持 Internet Explorer 的任何版本


### # 安装 / Installation

下列两种方法选择其一：



**1. 使用Tamper Monkey插件**:  该方法仅支持v0.2a及以后的版本

1. 请在浏览器上安装Tamper Monkey插件：
   1. Chrome 安装地址：https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo
      1. 中国大陆地区安装方法需要上网搜索
   2. Edge 安装地址：https://microsoftedge.microsoft.com/addons/detail/iikmkjmpaadaobahmlepeloendndfphd
2. 安装脚本
   1. 访问https://github.com/Aeroraven/Alecto
   2. 在页面右侧找到Releases部分，点击进入Latest版本
   3. 点击alecto.user.js文件
   4. 在Tamper Monkey的弹出页面中选择安装或重新安装



**2. 使用浏览器收藏夹 (不建议)**：打开`src/launcher/alecto-launcher.js`，将全文复制后，在全文最前加入`javascript:`。将修改后的全文加入`新建书签`或`新建收藏`的地址栏中。



**3. 不安装 (不建议)**: 其实安装步骤是可选的



### # 运行 / Run

**若使用方法1安装**，则脚本将在访问网页时自动运行

**若使用方法2安装**，则完成安装后，点击安装步骤中完成的收藏夹项目，但大概率会出现错误。

**若使用方法3安装**，则按下列步骤运行

1. 访问 https://github.com/Aeroraven/Alecto/tree/main/dist/alecto.js，复制所有代码部分
2. 在目标页面上按下F12，选择Console或控制台选项卡
3. 将代码粘贴并按下回车键



### # 许可 / License

AGPL 3.0
