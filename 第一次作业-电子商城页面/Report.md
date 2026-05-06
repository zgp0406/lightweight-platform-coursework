# 第一次作业报告

**姓名：** 周广鹏  
**学号：** 2330145
**作业名称：** 移动端商城静态页面

---

## 1. 页面结构

页面整体分为三部分：

- **header**：包含搜索框和商品分类导航
- **content**：包含广告横幅（Banner）和商品列表
- **footer**：底部导航栏，含首页、分类、购物车、我的等入口

## 2. 页面组件说明

| 组件 | 位置 | 说明 |
|------|------|------|
| 搜索框 | header 顶部 | 带放大镜图标的输入框，使用 flex: 1 自适应宽度 |
| 登录按钮 | header 右侧 | 红色主题的登录按钮 |
| 商品分类 | header 底部 | 横向排列的分类标签（超市、电器、美妆、充值），使用 space-around 均匀分布 |
| 广告横幅 | content 顶部 | 全宽 Banner 图，使用 CSS 动画实现自动轮播 |
| 商品列表 | content 主体 | 三列卡片布局展示商品，每张卡片包含图片、名称和价格 |
| 底部导航栏 | footer | 固定在页面底部，包含首页、分类、购物车、我的四个入口 |
| 悬浮按钮 | 页面右下角 | 返回顶部按钮，使用 position: fixed 固定定位，悬停时变色放大 |

## 3. Flex 布局使用

在 `style.css` 中共使用了以下 flex 属性：

| 属性 | 使用位置 | 作用 |
|------|----------|------|
| `display: flex` | .header (第3行)、.category-nav (第18行)、.category-item (第26行)、.banner-slides (第42行)、.product-list (第72行)、.bottom-nav (第138行)、.nav-item (第148行)、.float-btn (第175行) | 开启 flex 容器，使子元素可以弹性布局 |
| `flex: 1` | .search-bar (第13行) | 使搜索框占据剩余空间 |
| `flex-direction: column` | .category-item (第27行)、.nav-item (第149行) | 设置为垂直排列，使图标和文字上下排列 |
| `justify-content: space-between` | .header (第4行)、.product-list (第76行) | 设置为两端对齐，使元素分布在容器两端 |
| `justify-content: space-around` | .category-nav (第19行)、.bottom-nav (第139行) | 设置为均匀分布，使元素在容器中均匀排列 |
| `justify-content: center` | .float-btn (第176行) | 设置为居中对齐，使按钮内容居中 |
| `align-items: center` | .header (第5行)、.category-item (第28行)、.nav-item (第150行)、.float-btn (第177行) | 设置为居中对齐，使子元素在交叉轴上居中 |
| `flex-wrap: wrap` | .product-list (第73行) | 设置为自动换行，使商品卡片在空间不足时换行 |
| `gap: 5px` | .product-list (第74行) | 设置为 5px，控制商品卡片之间的间距 |

## 4. 悬浮组件

页面右下角设置了一个**悬浮返回顶部按钮**，使用 `position: fixed` 实现，始终显示在视口右下角。按钮使用圆形设计，带有半透明黑色背景，悬停时变为红色并放大。

> 对应代码位置：`src/style.css` 第 160-181 行

## 5. 伪类 / 伪元素

使用了以下 3 种：

1. **`:hover`**：
   - 商品卡片鼠标悬停时添加阴影并上移，提升交互反馈
   - 悬浮按钮悬停时变为红色并放大
2. **`:active`**：商品卡片点击时缩小至 98%，提供点击反馈
3. **`:active`**：底部导航项点击时的状态变化

## 6. 附加项（加分）

- [x] **CSS 动画**：Banner 图使用 `@keyframes` 实现自动轮播效果，动画时长为 9 秒，在 0%、45% 和 50%、95% 处设置关键帧，实现两张图片的平滑切换
- [x] **CSS transform**：
  - 商品卡片 hover 时使用 `transform: translateY(-5px)` 向上移动
  - 商品卡片 active 时使用 `transform: scale(0.98)` 缩小
  - 悬浮按钮 hover 时使用 `transform: scale(1.1)` 放大

## 7. 素材来源

页面图片素材来源：
京东H5页面
---


