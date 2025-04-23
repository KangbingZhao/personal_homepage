# 🧭 My Dev Links - 个人导航页

一个基于 **Next.js + Tailwind CSS** 构建的响应式个人导航页，支持分类展示、全局搜索、自定义链接配置，适合开发者收集和管理常用工具链接。支持静态导出并部署到 GitHub Pages。

## 🚀 功能特性

- 📌 分类展示常用链接（可配置）
- 🔍 全局搜索：支持标题、描述、标签模糊搜索
- 🧩 纯前端静态项目，支持 GitHub Pages 部署
- 🛠️ 响应式设计，适配桌面与移动端

## 🧱 技术栈

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- TypeScript
- GitHub Actions（自动部署）

## 📁 项目结构

```
my-dev-links/
├── public/links.json          # 链接数据配置（支持分类和标签）
├── pages/index.tsx            # 首页逻辑，加载并展示链接
├── components/ui/             # 基础 UI 组件
├── styles/globals.css         # 全局样式（含 Tailwind）
├── .github/workflows/         # GitHub Actions 自动部署配置
├── next.config.js             # 设置为静态导出
└── tailwind.config.js         # Tailwind 配置
```

## 🌐 GitHub Pages 部署指南

1. 创建一个新的分支：`gh-pages`（如果没有）
2. 在仓库设置中启用 GitHub Pages，并指定分支为 `gh-pages`
3. 在仓库设置 → Secrets 中新增以下 secret：
   - `GITPAGES_TOKEN`：用于部署的 GitHub Token，建议权限仅限于 `public_repo`（可通过 [GitHub PAT 生成器](https://github.com/settings/tokens) 生成）

4. 提交主分支代码后，GitHub Actions 会自动构建并部署静态页面

部署完成后访问地址为：

```
https://<你的 GitHub 用户名>.github.io/<你的仓库名>/
```

例如：

```
https://kbzhao.github.io/my-dev-links/
```

## ✍️ 自定义链接数据

编辑 `public/links.json` 文件：

```json
{
  "categories": [
    {
      "name": "开发工具",
      "links": [
        {
          "title": "Postman",
          "url": "https://www.postman.com/",
          "description": "API 调试工具",
          "tags": ["API", "调试"]
        }
      ]
    }
  ]
}
```

## 📄 License

MIT License
