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

#### v0.3b

**2023-5-1** 

- Sync: Update the comment crawler for `TMALLv8` (JSONP->Fetch) 
- Bug Fix: `TMALL Chaoshi` is not included in the user script header section.
- Bug Fix: Snapshot component components might pass null object to the successor compoents, causing bundling error.
- Bug Fix: UI layout rectification
