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

personal_homepage/ 
├── public/links.json # 链接数据配置（支持分类和标签） 
├── pages/index.tsx # 首页逻辑，加载并展示链接 
├── components/ui/ # 基础 UI 组件 
├── styles/globals.css # 全局样式（含 Tailwind） 
├── .github/workflows/ # GitHub Actions 自动部署配置 
├── next.config.js # 设置为静态导出 
└── tailwind.config.js # Tailwind 配置


## 🛠 使用方式

1. 安装依赖：

```bash
npm install
```

2. 本地开发：

```bash
npm run dev
```

3. 构建静态网站（导出至 out/ 目录）：
```bash
npm run build && npm run export
```

## 🌐 部署到 GitHub Pages
此项目内置 GitHub Actions 部署流程：
* 每当 master 分支有变更，将自动构建并发布 out/ 到 gh-pages 分支

* 需确保在仓库设置中启用 GitHub Pages，并选择 gh-pages 分支作为发布源

* 你也可以手动执行部署：
```bash
npm run build && npm run export
# 然后将 out/ 目录推送到 gh-pages 分支
```

## ✍️ 自定义链接数据
编辑 public/links.json 文件：
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
