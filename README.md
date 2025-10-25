<div align="center">
	<img src="./public/favicon.svg" width="160" />
	<h1>NestBase Admin</h1>
  <span>基于 SoybeanAdmin 的企业级后台管理系统</span>
</div>

---

[![license](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)
[![Vue](https://img.shields.io/badge/Vue-3.5-green.svg)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1-blue.svg)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![NaiveUI](https://img.shields.io/badge/NaiveUI-2.43-green.svg)](https://www.naiveui.com/)

> [!NOTE]
> 本项目基于优秀的开源项目 [SoybeanAdmin](https://github.com/soybeanjs/soybean-admin) 进行开发和定制。
>
> SoybeanAdmin 是一个清新优雅、高颜值且功能强大的后台管理模板,为本项目提供了坚实的基础架构。感谢 [Soybean](https://github.com/honghuangdc) 及 SoybeanAdmin 社区的所有贡献者!
>
> - **原项目地址**: https://github.com/soybeanjs/soybean-admin
> - **官方文档**: https://docs.soybeanjs.cn
> - **预览地址**: https://naive.soybeanjs.cn

## 项目简介

**NestBase Admin** 是一款基于 [SoybeanAdmin](https://github.com/soybeanjs/soybean-admin) 深度定制的企业级后台管理系统,专为对接 **NestBaseSystem** 后端服务而设计。本系统在 SoybeanAdmin 优秀的基础架构之上,针对实际业务需求进行了功能扩展和优化,提供完整的 RBAC 权限管理、动态路由、国际化等企业级功能,开箱即用。

### 相比原项目的主要改进

- 🔧 **后端适配**: 完整对接 NestBaseSystem 后端服务,调整 API 接口和数据结构
- ⚡ **功能增强**: 新增菜单按钮管理功能,支持更细粒度的权限控制
- 🔒 **安全加固**: 禁止删除 admin 账号,防止误操作
- 🎨 **界面优化**: 优化用户管理、角色管理等模块的交互体验
- 📝 **字段完善**: 改进表单字段映射和默认值处理
- 🌐 **国际化调整**: 根据业务需求调整多语言文案

### 核心特性

- **完整的权限系统**: 用户管理、角色管理、菜单管理,支持按钮级别权限控制
- **灵活的路由机制**: 支持静态路由与动态路由双模式,自动化文件路由生成
- **优雅的 UI 设计**: 基于 NaiveUI 组件库,多主题配置,响应式布局
- **国际化支持**: 内置中英文双语,可扩展多语言
- **Monorepo 架构**: pnpm workspace 管理,代码复用性强
- **严格的类型检查**: 全量 TypeScript 支持,类型安全

## 技术栈

### 核心框架
- **Vue 3.5** - 渐进式 JavaScript 框架
- **Vite 7.1** - 新一代前端构建工具
- **TypeScript 5.9** - JavaScript 的超集,提供静态类型检查
- **Pinia 3.0** - 新一代 Vue 状态管理库
- **Vue Router 4.5** - Vue.js 官方路由管理器

### UI 组件 & 样式
- **NaiveUI 2.43** - Vue 3 组件库
- **UnoCSS 66.5** - 原子化 CSS 引擎
- **Sass 1.92** - CSS 预处理器
- **Iconify** - 统一的图标框架(10万+ 图标)

### 路由 & 请求
- **@elegant-router/vue 0.3.8** - 基于文件的自动化路由系统
- **Axios** (via @sa/axios) - HTTP 请求库
- **dayjs 1.11** - 轻量级日期处理库

### 开发工具
- **ESLint 9.35** - 代码质量检查工具
- **simple-git-hooks 2.13** - Git 钩子管理
- **vue-devtools 8.0** - Vue 调试工具

## 功能模块

### 1. 系统管理

#### 用户管理
- 用户列表查询(支持分页)
- 用户增删改操作
- 搜索过滤: 用户名、昵称、性别、手机号、邮箱、状态
- 用户详情页面展示
- 保护 admin 账号不被删除

#### 角色管理
- 角色列表查询(支持分页)
- 角色 CRUD 操作
- 搜索过滤: 角色名称、角色代码、状态
- 角色权限分配(菜单权限、按钮权限)

#### 菜单管理
- 树形结构展示菜单
- 菜单 CRUD 操作
- 菜单类型: 目录、菜单
- 路由配置: 路径、名称、组件
- 图标配置: 支持 Iconify 或本地图标
- 菜单按钮管理: 为每个菜单配置操作按钮权限
- 菜单元信息配置:
  - 国际化标题
  - 是否隐藏
  - 是否缓存
  - 是否固定在标签页
  - 多标签配置等

### 2. 认证授权

- **登录/登出**: 用户名密码登录
- **Token 管理**:
  - Access Token + Refresh Token 双令牌机制
  - 自动刷新过期的 Token
  - Token 过期自动跳转登录
- **会话管理**:
  - 本地存储持久化
  - 多用户检测(切换用户自动清除标签页)
- **权限控制**:
  - 路由级别权限(通过路由守卫)
  - 按钮级别权限(通过指令或组件)

### 3. 路由系统

基于 **@elegant-router/vue** 实现自动化路由:
- **文件路由**: 根据 `src/views/` 目录结构自动生成路由
- **路由模式**:
  - 静态模式: 前端定义路由(开发友好)
  - 动态模式: 后端返回路由(生产推荐)
- **路由守卫**:
  - 身份验证守卫
  - 权限验证守卫
  - 页面进度条守卫
  - 页面标题守卫
- **路由缓存**: Keep-alive 支持,可配置缓存策略

### 4. 布局系统

- **基础布局** (Base Layout):
  - 侧边栏(可折叠)
  - 顶部导航栏
  - 标签页(多页签)
  - 主内容区
  - 底部信息
- **空白布局** (Blank Layout):
  - 用于登录页、错误页等
- **布局模式**:
  - 垂直布局
  - 混合布局
- **响应式**: 移动端自适应

### 5. 主题系统

- **主题配置**:
  - 主题色切换
  - 暗黑模式
  - 灰色模式
  - 色弱模式
- **布局配置**:
  - 侧边栏模式
  - 导航栏模式
  - 页面动画
  - 标签页样式
- **持久化**: LocalStorage 保存配置

### 6. 国际化 (i18n)

- **语言支持**: 中文、英文
- **组件国际化**: NaiveUI 组件多语言
- **日期国际化**: dayjs 日期格式化
- **动态切换**: 实时切换语言无需刷新

### 7. 内置页面

- **首页/仪表盘** (`/home`)
- **用户管理** (`/manage/user`)
- **角色管理** (`/manage/role`)
- **菜单管理** (`/manage/menu`)
- **用户详情** (`/manage/user-detail/:id`)
- **403 无权限页**
- **404 页面不存在**
- **500 服务器错误**
- **登录页**
- **iframe 嵌入页**

## 项目结构

```
website-admin/
├── src/                          # 源代码目录
│   ├── views/                    # 页面组件
│   │   ├── _builtin/            # 内置页面(404、403、500、登录等)
│   │   ├── home/                # 首页/仪表盘
│   │   └── manage/              # 系统管理模块
│   │       ├── user/            # 用户管理
│   │       ├── role/            # 角色管理
│   │       ├── menu/            # 菜单管理
│   │       └── user-detail/     # 用户详情
│   │
│   ├── router/                   # 路由配置
│   │   ├── routes/              # 路由定义
│   │   ├── guard/               # 路由守卫
│   │   └── elegant/             # 自动生成的路由文件
│   │
│   ├── store/                    # Pinia 状态管理
│   │   └── modules/
│   │       ├── auth/            # 认证状态
│   │       ├── route/           # 路由状态
│   │       ├── tab/             # 标签页状态
│   │       ├── app/             # 应用状态
│   │       └── theme/           # 主题状态
│   │
│   ├── service/                  # API 服务层
│   │   ├── api/                 # API 接口定义
│   │   │   ├── auth.ts          # 认证接口
│   │   │   ├── route.ts         # 路由接口
│   │   │   ├── system-manage.ts # 系统管理接口
│   │   │   └── user.ts          # 用户接口
│   │   └── request/             # 请求封装
│   │
│   ├── components/               # 组件库
│   │   ├── advanced/            # 高级组件
│   │   ├── common/              # 通用组件
│   │   └── custom/              # 自定义组件
│   │
│   ├── layouts/                  # 布局组件
│   │   ├── base-layout/         # 基础布局
│   │   └── blank-layout/        # 空白布局
│   │
│   ├── hooks/                    # Vue 组合式函数
│   │   ├── business/            # 业务相关 hooks
│   │   └── common/              # 通用 hooks
│   │
│   ├── locales/                  # 国际化语言包
│   │   └── langs/
│   │       ├── zh-cn/           # 中文
│   │       └── en-us/           # 英文
│   │
│   ├── typings/                  # TypeScript 类型定义
│   │   ├── api/                 # API 类型
│   │   ├── app.d.ts             # 应用类型
│   │   └── router.d.ts          # 路由类型
│   │
│   ├── utils/                    # 工具函数
│   ├── constants/                # 常量定义
│   ├── enum/                     # 枚举定义
│   ├── plugins/                  # 插件配置
│   ├── styles/                   # 全局样式
│   ├── theme/                    # 主题配置
│   ├── main.ts                   # 应用入口
│   └── App.vue                   # 根组件
│
├── packages/                     # Monorepo 子包
│   ├── @sa/axios/               # Axios 封装
│   ├── @sa/hooks/               # 通用 Hooks
│   ├── @sa/utils/               # 工具函数
│   ├── @sa/color/               # 颜色工具
│   ├── @sa/materials/           # 物料组件
│   ├── @sa/scripts/             # 脚本工具
│   └── @sa/uno-preset/          # UnoCSS 预设
│
├── build/                        # 构建配置
│   ├── config/                  # 环境配置、代理配置
│   └── plugins/                 # Vite 插件配置
│
├── .env                          # 环境变量
├── vite.config.ts               # Vite 配置
├── tsconfig.json                # TypeScript 配置
├── package.json                 # 项目依赖
└── CLAUDE.md                    # 项目说明(供 AI 助手使用)
```

## 快速开始

### 环境要求

确保你的开发环境满足以下要求:

- **Node.js**: >= 20.19.0
- **pnpm**: >= 10.5.0
- **Git**: 版本控制工具

### 安装

1. **克隆项目**

```bash
git clone <your-repository-url>
cd website-admin
```

2. **安装依赖**

```bash
pnpm install
```

> 注意: 本项目使用 pnpm monorepo 架构,请勿使用 npm 或 yarn 安装依赖

### 开发

启动开发服务器:

```bash
pnpm dev
```

服务器将运行在 `http://localhost:9527`

### 构建

#### 生产环境构建

```bash
pnpm build
```

#### 测试环境构建

```bash
pnpm build:test
```

### 预览

预览生产构建:

```bash
pnpm preview
```

预览服务器将运行在 `http://localhost:9725`

## 开发指南

### 添加新页面

1. 在 `src/views/` 下创建页面组件
2. 运行路由生成命令:

```bash
pnpm gen-route
```

3. 路由将自动生成到 `src/router/elegant/` 目录

### 添加 API 接口

1. 在 `src/typings/api/` 定义接口类型
2. 在 `src/service/api/` 创建 API 函数
3. 使用统一的 `request` 实例发起请求

示例:

```typescript
// src/service/api/example.ts
import { request } from '../request';

export function fetchExampleData(params: ExampleParams) {
  return request<ExampleResponse>({
    url: '/api/example',
    method: 'get',
    params
  });
}
```

### 代码规范

项目遵循 [SoybeanJS 代码规范](https://docs.soybeanjs.cn/zh/standard)

#### 运行 Lint

```bash
pnpm lint
```

#### TypeScript 类型检查

```bash
pnpm typecheck
```

#### Git 提交

使用交互式提交工具:

```bash
pnpm commit       # 英文提交信息
pnpm commit:zh    # 中文提交信息
```

### 环境变量

主要环境变量配置 (`.env` 文件):

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `VITE_APP_TITLE` | 应用标题 | NestBaseSystem |
| `VITE_BASE_URL` | 应用基础路径 | / |
| `VITE_AUTH_ROUTE_MODE` | 路由模式 | static |
| `VITE_ROUTER_HISTORY_MODE` | 路由历史模式 | history |
| `VITE_SERVICE_SUCCESS_CODE` | 后端成功状态码 | 0 |
| `VITE_HTTP_PROXY` | 是否启用代理 | Y |
| `VITE_GLOB_API_URL` | API 接口地址 | /api |

## API 接口对接

### 后端接口约定

本项目对接 **NestBaseSystem** 后端服务,接口响应格式:

```typescript
{
  code: number;        // 0 表示成功
  message: string;     // 提示信息
  data: T;            // 业务数据
}
```

### 主要接口

| 接口路径 | 方法 | 说明 |
|---------|------|------|
| `/auth/login` | POST | 用户登录 |
| `/auth/profile` | GET | 获取用户信息 |
| `/auth/refreshToken` | POST | 刷新 Token |
| `/users` | GET | 获取用户列表 |
| `/roles/page` | GET | 获取角色列表(分页) |
| `/roles` | GET | 获取所有角色 |
| `/menus` | GET | 获取菜单列表 |

### 错误码处理

- **8888, 8889**: 自动登出并跳转登录页
- **7777, 7778**: 弹窗提示后登出
- **9999, 9998, 3333**: Token 过期,自动刷新

## 常见问题

### 1. 路由无法访问?

- 检查路由模式 (`VITE_AUTH_ROUTE_MODE`)
- 静态模式: 路由在前端定义,适合开发
- 动态模式: 路由由后端返回,需要接口支持

### 2. 接口请求失败?

- 检查 `VITE_HTTP_PROXY` 是否启用
- 检查 `build/config/proxy.ts` 代理配置
- 检查后端服务是否启动

### 3. 类型检查报错?

运行类型检查命令查看详细错误:

```bash
pnpm typecheck
```

### 4. Git 提交被拒绝?

项目配置了 pre-commit 钩子,会运行:
- 类型检查 (`typecheck`)
- 代码检查 (`lint`)
- 文件变更检查

确保代码通过所有检查后再提交。

## 浏览器支持

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari |
| --------- | --------- | --------- | --------- |
| last 2 versions | last 2 versions | last 2 versions | last 2 versions |

推荐使用最新版本的 Chrome 浏览器进行开发。

## 更新日志

### 最近更新

- ✨ **菜单按钮管理**: 支持为菜单配置操作按钮权限
- ✨ **优化用户管理**: 改进字段类型和搜索功能
- 🔒 **保护 admin 账号**: 禁止删除系统管理员账号
- 🐛 **修复用户表单**: 修正默认值和字段映射问题

## 参考资源

- [Vue 3 官方文档](https://cn.vuejs.org/)
- [Vite 官方文档](https://cn.vitejs.dev/)
- [NaiveUI 组件库](https://www.naiveui.com/)
- [UnoCSS 文档](https://unocss.dev/)
- [SoybeanAdmin 文档](https://docs.soybeanjs.cn/)
- [SoybeanJS 代码规范](https://docs.soybeanjs.cn/zh/standard)

## 致谢

### 特别感谢

本项目基于优秀的开源项目 **[SoybeanAdmin](https://github.com/soybeanjs/soybean-admin)** 进行开发。

SoybeanAdmin 是一个清新优雅、高颜值且功能强大的后台管理模板,它提供了:
- 🎨 精美的 UI 设计和丰富的主题配置
- 🏗️ 清晰的项目架构和严格的代码规范
- 🚀 前沿的技术栈和最佳实践
- 📦 完善的 Monorepo 架构
- 🔄 优雅的自动化路由系统

正是因为 SoybeanAdmin 提供的坚实基础,才让本项目能够快速开发并专注于业务功能的实现。

**衷心感谢:**
- 原作者 [Soybean](https://github.com/honghuangdc) 的辛勤付出
- SoybeanAdmin 社区的所有贡献者
- 所有为开源社区做出贡献的开发者们

**相关链接:**
- 原项目仓库: https://github.com/soybeanjs/soybean-admin
- 项目官方文档: https://docs.soybeanjs.cn
- 在线预览地址: https://naive.soybeanjs.cn

如果您觉得 SoybeanAdmin 对您有帮助,欢迎给原项目一个 ⭐️ Star!

### 技术栈相关

同时感谢以下优秀的开源项目:
- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [NaiveUI](https://www.naiveui.com/) - Vue 3 组件库
- [UnoCSS](https://unocss.dev/) - 即时按需原子化 CSS 引擎
- [Pinia](https://pinia.vuejs.org/) - Vue 状态管理库
- [TypeScript](https://www.typescriptlang.org/) - JavaScript 的超集

## 开源协议

本项目基于 [MIT](./LICENSE) 协议开源,仅供学习参考。

在使用本项目代码时,请保留对 SoybeanAdmin 原项目的版权声明和致谢信息。
