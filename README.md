# Ruankao AI Evaluator - 软考 AI 评卷系统

这是一个基于 [Next.js](https://nextjs.org) 并使用 [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) 初始化的项目。

## 项目功能

本项目旨在开发一个针对**软考（计算机技术与软件专业技术资格考试）非客观题**的在线 AI 自动评分系统。系统将利用人工智能技术，对考生的主观题答案进行分析和评估，给出相应的分数。

## 快速开始

首先，运行开发服务器：

```bash
pnpm dev
# 或
bun dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看结果。

你可以通过修改 `app/page.tsx` 文件来开始编辑页面。当你编辑文件时，页面会自动更新。

本项目使用 [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) 来自动优化和加载 [Geist](https://vercel.com/font) 字体（Vercel 推出的新字体）。

## 部署

- vercel