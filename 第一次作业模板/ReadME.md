# 项目模板

## 作业要求

编写一个**电子商城**静态页面，具体需求详见课件 PPT。以下是本项目模板的基本要求：

| 要求 | 说明 |
|------|------|
| HTML 与 CSS 分离 | 样式统一写在 `src/style.css`，不允许在 HTML 内使用 `<style>` 标签或内联 style |
| 图片资源 | 所有图片放在 `src/assets/` 目录下 |
| 页面结构 | 包含 Header（Logo + 导航）、Banner（至少 1 张促销图）、商品列表、Footer |

---

## 目录结构

```
项目根目录/
├── metadata.json        ← 【必填】填写你的姓名、学号、作业名称
├── package.json         ← 依赖配置，无需修改
├── ReadME.md            ← 本文件
├── src/                 ← 你的作业代码都写在这里
│   ├── index.html       ← 主页面（已有注释引导）
│   ├── style.css        ← 样式文件（已有注释引导）
│   └── assets/          ← 图片资源目录
└── tool/
    ├── check.js         ← 自检脚本
    └── pack.js          ← 打包脚本
```

---

## 开始之前

### 1. 安装依赖

打包脚本依赖 `archiver` 库，在开始之前请执行：

```bash
npm install
```

### 2. 填写个人信息

打开根目录的 `metadata.json`，填写你的信息：

```json
{
  "studentName": "张三",
  "studentId": "20240001",
  "assignmentName": "第一次作业-电子商城页面"
}
```

### 3. 完成报告
请在 `Report.md` 中撰写你的作业报告，内容包括但不限于：
- 页面结构说明
- 组件设计思路

---

## 开发流程

1. 在 `src/index.html` 中编写页面结构（HTML）
2. 在 `src/style.css` 中编写样式（CSS）
3. 将用到的图片放入 `src/assets/` 目录
4. 完成后运行**自检脚本**，确认没有遗漏：

```bash
node tool/check.js
```

5. 自检全部通过后，运行**打包脚本**生成提交文件：

```bash
node tool/pack.js
```

打包完成后，会在根目录生成：

```
{学号}_{姓名}_{作业名称}.zip
```

将此 zip 文件提交到作业平台即可。

---

## 注意事项

- **不要**修改 `tool/` 目录下的脚本
- **不要**在 `src/index.html` 中写内联样式，样式统一放 `style.css`
- 图片文件若过大，打包后体积可能超过 8 MB 限制，请提前压缩图片
- 提交前请确保 `metadata.json` 中的姓名和学号已正确填写

