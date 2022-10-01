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

**EN**

- New: Support for TMALLv8
- Change: Refine RegEx match for TMALL. Only showcase pages will trigger alecto listener.
- Bug Fix: Wrong element detection on TMALL
- Bug Fix: Runtime utility `periodicCheck` keeps on running after promises being resolved
- Bug Fix: Obtain empty JSONP URL before DOM `script` being loaded



**CN**

- 增加：对TMALLv8平台的支持
- 修改：优化了TMALL的正则匹配规则，现在只有在橱窗页面显示UI
- 修复：对TMALL页面错误的元素侦测
- 修复：运行时工具 `periodicCheck` 在异步Promise被解决时仍在运行的问题
- 修复：在JSONP对应的DOM节点`script`载入完成前获取JSONP导致值为空的问题
