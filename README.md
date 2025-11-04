# 初中学习低分重建指导网站（Junior High Study Rebuild Site）

这是项目的静态网站源码，内容涵盖：8个月学习计划、各学科学习指南、家校沟通策略、应急处理方案，以及配套的流程图与知识体系图。

- 仓库地址：https://github.com/nonomil/junior-high-study-rebuild
- 在线访问（启用 GitHub Pages 后）：https://nonomil.github.io/junior-high-study-rebuild/

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