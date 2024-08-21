# Online snippet editor

一个基于Nuxt3的在线代码片段编辑器，可以使用 html,css,less,scss,js实现前端在线编辑，支持远程引入css，js脚本。

## 页面展示

![](/assets/about/001.jpg)

![](/assets/about/002.jpg)

![](/assets/about/003.jpg)

## 项目环境

- node > 18
- pnpm
- nuxt3

## 项目启动

- pnpm install
- pnpm dev

## 目录文件说明

Look at the [docs](https://www.nuxt.com.cn/docs/guide/directory-structure/nuxt)

- assets 静态文件目录
- components 使用composables/目录将你的Vue组合式函数自动导入到你的应用程序中。
- composables 使用composables/目录将你的Vue组合式函数自动导入到你的应用程序中。
- contend 使用 content/ 目录为你的应用创建一个基于文件的内容管理系统（CMS）。
- layouts Nuxt 提供了一个布局框架，用于将常见的 UI 模式提取为可重用的布局。
- middleware Nuxt 提供了中间件来在导航到特定路由之前运行代码。
- modules 使用modules/目录在应用程序中自动注册本地模块。
- pages Nuxt 提供了基于文件的路由功能，用于在你的 Web 应用中创建路由。
- plugins Nuxt拥有一个插件系统，可以在创建Vue应用程序时使用Vue插件和其他功能。
- public public/ 目录用于提供网站的静态资源。
- server server/目录用于在应用程序中注册API和服务器处理程序。
- utils 使用utils/目录在整个应用程序中自动导入你的工具函数。
- .env 一个 .env 文件用于指定构建和开发环境变量。
- .nuxtignore .nuxtignore 文件允许 Nuxt 在构建阶段忽略项目根目录下的文件。
- app.vue app.vue 文件是你的 Nuxt 应用的主要组件。
- app.config.ts 使用App Config文件在应用程序中公开响应式配置。
- nuxt.config.ts Nuxt可以通过一个单独的nuxt.config文件进行简单配置。
- package.json package.json文件包含了应用程序的所有依赖项和脚本。
- tsconfig.json Nuxt会根据你在Nuxt项目中使用的别名，以及其他合理的默认值，自动生成一个`.nuxt/tsconfig.json`文件。

### store

使用pinia和

### ICON

可以使用 ICON组件的 <https://icones.js.org/> 生成svg图标

vuetify 自带的组件icon来自 <https://pictogrammers.com/library/mdi/> 前面拼写 mdi-
