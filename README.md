# 初中学习低分重建指导网站（Junior High Study Rebuild Site）

这是项目的静态网站源码，内容涵盖：4个月（16周）稳步提分计划、各学科学习指南、家校沟通策略、稳住局面方案，以及配套的流程图与知识体系图。

- 仓库地址：https://github.com/nonomil/junior-high-study-rebuild
- 在线访问（国内）：https://juniorhighstudy-8i7o50u1.maozi.io/
- 在线访问（GitHub Pages）：https://nonomil.github.io/junior-high-study-rebuild/

> 部署触发标记：本次提交用于触发 GitHub Pages 的 Actions 部署（无需代码改动）。

## 项目结构

```
初中学习指导网站/
├── index.html            # 网站首页
├── css/
│   └── style.css         # 全站样式
├── js/
│   ├── main.js           # 交互逻辑
│   └── search.js         # 站内搜索
├── images/               # SVG 图表与图片
└── pages/                # 各专题/科目页面
    ├── biology.html
    ├── chemistry.html
    ├── chinese.html
    ├── emergency-strategies.html
    ├── english.html
    ├── family-education.html
    ├── geography.html
    ├── history.html
    ├── homework-strategy.html
    ├── learning-diagnosis.html
    ├── learning-strategies.html
    ├── math.html
    ├── physics.html
    ├── politics-history.html
    ├── politics.html
    ├── resources.html
    ├── time-management.html
    └── tutoring-decision.html
```

> 说明：本次更新后将新增 `初中学习低分重建--word版/` 文件夹（存放各科对应的 Word 文档），会被移动至本网站根目录以便统一管理与下载。

## 更新日志

### 2026-02-10
- 首页：新增“相信-看见-行动”信念模块与行动召唤区（含激励语句轮播）。
- 新页面：新增“心态重建：相信-看见-行动闭环”独立页面，并在首页导航中接入。

### 2025-11-04 触发部署
- 说明：仅用于触发 GitHub Actions Pages 工作流的部署，以验证自动发布配置。

### 2025-11-04
- 新增内容：
  - 语文页面：新增“专题六：课文与古诗文背诵SOP — 分段背诵·理清脉络·串联整篇”。
  - 政史页面：新增“政治分析方法SOP（立场·概念·逻辑树·材料·时事）”与“历史背诵方法SOP（分段·脉络·整书串联）”。
  - 英语页面：新增“词汇学习方法补充（词根词缀·词组搭配·语境猜词）”，并强调避免死记硬背的训练闭环。
- 文档同步：已将 05-英语、07-政史、13-语文 三个 Markdown 的新增内容转换为对应 DOCX。
- 文件组织：`初中学习低分重建--word版/` 将整体移动到 `初中学习指导网站/` 下，便于网页统一引用与用户下载。
- 导航与交互：为新增章节增加侧边导航锚点，并更新页面滚动高亮逻辑，确保导航定位准确。

## Word 文档位置（更新后）
- 目录：`初中学习指导网站/初中学习低分重建--word版/`
- 已更新的 DOCX 文件示例：
  - `05-英语科目学习指南-词汇语法与技能突破.docx`
  - `07-政治历史科目学习指南-记忆技巧与答题策略.docx`
  - `13-语文学科学习指南-阅读与写作能力突破.docx`


## 本地预览
- 直接用浏览器打开 `index.html` 即可访问首页；或将整个文件夹用任意 HTTP 服务器（如 VS Code Live Server）启动。

## 部署到 GitHub Pages（两种方式）

方案 A：直接用 main 分支部署（推荐，当前项目是纯静态站点）
1. 进入 GitHub 仓库页面：Settings > Pages
2. 在 “Source” 选择 “Deploy from a branch”
3. Branch 选择 `main`，Folder 选择 `/（root）`
4. 保存并等待几分钟，访问：`https://nonomil.github.io/junior-high-study-rebuild/`

方案 B：使用 gh-pages 分支部署（多用于需要构建的前端工程）
- 适用场景：例如 React/Vue 项目需要打包生成 `dist` 后再部署。源码放在 `main`，构建产物放在 `gh-pages`。
- 简要流程：
  1) 在 CI（GitHub Actions）或本地执行构建，生成 `dist`（或 build 目录）
  2) 将构建产物推送到 `gh-pages` 分支（根目录）
  3) 在 Settings > Pages 中选择 `gh-pages` 分支作为 Source
- 本项目目前是“纯静态”，无需构建，优先采用方案 A。

## 自定义域名（可选）
- 如果你有自己的域名（如 `study.example.com`），可在 Settings > Pages 中设置 Custom domain。
- 同时在仓库根目录添加 `CNAME` 文件，内容只写你的域名，例如：
  ```
  study.example.com
  ```
- 在域名服务商（DNS）处添加解析：
  - 使用子域名时（推荐）：将 `study.example.com` 的 CNAME 指向 `nonomil.github.io`
  - 如果绑定根域名（`example.com`），需要使用 A/ALIAS/ANAME 或开启 CNAME Flattening（不同域名服务商设置略有差异）。
- 设置完成后，等待 DNS 生效，即可通过你的自定义域名访问网站。

## 许可证（建议）
- 代码部分：MIT License
- 文档与内容：CC BY-NC-SA 4.0（非商业许可，署名、相同方式共享）

## 贡献与维护
- 欢迎提交 Issue/PR，建议：
  - 保持页面结构一致性与导航清晰
  - 图片与图表统一放置在 `images/`；页面资源引用使用相对路径
  - 提交前本地检查链接是否有效、样式是否正常

---
如需将 Pages 设置、CNAME 文件或 README 的更多细节自动化，请在 Issue 中说明你的需求；也可在我协助下添加 GitHub Actions 实现自动部署流程。
