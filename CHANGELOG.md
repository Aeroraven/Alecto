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



#### v0.2e 

**2022-10-2**

**EN**

- New: Refined UI & Displaying logs
- New: Added about page
- New: Added support for Simplified Chinese encoding
- New: Comment snapshots handler will capture cross-origin images on TAOBAO platform
  - This action is destructive for the page.
- Change: Removed legacy scripts 
- Change: Deprecated launcher
- Bug Fix: Tamper Monkey injection might be triggered in non-showcase pages



**CN**

- 增加：UI优化 & 显示当前进度日志
- 增加：关于页面
- 增加：支持中文(GBK编码)
- 增加：截图组件将支持对`TAOBAO`评论区的所有跨域图片的获取
  - 该操作将对浏览页面进行破坏性操作
- 修改：移除遗留脚本
- 修改：对启动器标记弃用
- 修复：在非橱窗页面注入脚本的问题
