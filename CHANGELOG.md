#### v0.1e

- Supports platform `tmall`
- Supports comment snapshot





#### v0.2a

- Refactor the code using TypeScript
- Integrates dependencies.
- Revert traits in `0.1e`
  - Remove supports for platform `tmall`
  - Remove supports for comment snapshot





#### v0.2b

- Supports platform `tmall` (Fix problem in `v0.1e`)
- Supports snapshot for `taobao`
- Fix bug: Incorrect multimedia comment identification





#### v0.2c

- New: Automatic Node.js generator for user script

- Change: Temporarily deprecates Simplified Chinese support & adds support for English

  - The charset problem will be solved completely as the world unites

- Bug Fix: Launching the task before page completion causes fatal error

- Bug Fix: JSZip `generateAsync` failure inside TamperMonkey

  

#### v0.2d

**2022-10-1**

**EN**

- New: Support for TMALLv8
- Change: Reduce action cooldown
- Change: Refine RegEx match for TMALL. Only showcase pages will trigger alecto listener.
- Bug Fix: Wrong element detection on TMALL
- Bug Fix: Runtime utility `periodicCheck` keeps on running after promises being resolved
- Bug Fix: Obtain empty JSONP URL before DOM `script` being loaded



**CN**

- 增加：对TMALLv8平台的支持
- 调整：减少冷却间隔
- 调整：优化了TMALL的正则匹配规则，现在只有在橱窗页面显示UI
- 修复：对TMALL页面错误的元素侦测
- 修复：运行时工具 `periodicCheck` 在异步Promise被解决时仍在运行的问题
- 修复：在JSONP对应的DOM节点`script`载入完成前获取JSONP导致值为空的问题



#### v0.3a

**2022-10-2~2022-10-4** 

**EN**

- Basic: Change license to AGPL3.0
- New: Refined UI & Displaying logs
- New: Added about page
- New: Added support for Simplified Chinese encoding
- New: Comment snapshots handler will capture cross-origin images on TAOBAO platform
  - This action is destructive for the page.
- New: Additional comments on `TAOBAO` can be fetched now
- Change: Removed legacy scripts 
- Change: Deprecated launcher
- Change: Comments now are stored in `Comments` folder.
- Structural Change: Divide original comment utility into comment utility and abstract utility
- Structural Change: Unified component attributes.
- Structural Change: Components now support post-triggers and flow definition
- Structural Change: Worker procedure is now organized in flow.
- Bug Fix: Tamper Monkey injection might be triggered in non-showcase pages
- Bug Fix: Abstract handler for `TAOBAO` might ignore nested images
- Bug Fix: Comment shapshot component for `TAOBAO` might ignore retry request
- Bug Fix: Asynchronous cooldown waiting problem in comment snapshot component for `TAOBAO`
- Bug Fix: UI callback misplaced in comment shapshot component for `TAOBAO`



**CN**

**许可**

- 在0.3a后，代码使用AGPL3.0协议
  - 0.2d及之前版本仍然使用MIT协议
  - 支持对代码本身的商业性用途，可以在AGPL3.0下自由复制、传播。
  - 对代码进行修改，或将代码引用到其它软件后将其发布或以Web形式提供服务时，需要按照AGPL3.0协议进行开源，且开源代码必须使用相同协议。

**新增功能**

- 增加：UI优化 & 显示当前进度日志
- 增加：关于页面
  - 部分引用CC4.0-BY-NC协议资源的声明
- 增加：支持中文(GBK编码)
- 增加：截图组件将支持对`TAOBAO`评论区的所有跨域图片的获取
  - 该操作将对浏览页面进行破坏性操作
- 增加：支持`TAOBAO`追加评论的获取

**修改功能**

- 修改：移除遗留脚本
- 修改：对启动器标记弃用
- 修改：评论现在统一放在`Comments`文件夹下

**程序结构修改**

- 结构修改：统一化组件属性
- 结构修改：组件支持`Post Trigger`和工作流定义
- 结构修改：将任务使用流图结构组织
- 结构修改：将详情摘要从评论模块中分离

**问题修复**

- 修复：在非橱窗页面注入Tamper Monkey脚本的问题
- 修复：摘要抓取组件对`TAOBAO`嵌套式图片忽略抓取的问题
- 修复：评论截图组件对`TAOBAO`的重试请求忽略的问题
- 修复：评论截图组件对`TAOBAO`冷却异步等待的问题
- 修复：评论截图组件对`TAOBAO`错误UI回调的问题

