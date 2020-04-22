# 管理后台模板

## 开发步骤

1. 全局安装依赖管理工具 `yarn`，`注意`以后安装依赖包请不要使用 `npm`，请使用 `yarn`，官方文档 https://yarn.bootcss.com/docs/usage/

``` bash
$ npm install yarn --global
```

2. 使用依赖管理工具 yarn 安装所有依赖

``` bash
$ yarn install
```

3. 编译运行代码

``` bash
$ yarn dev
```
或
``` bash
$ yarn dev:prod // 运行正服的接口
```

## 上线步骤

1. 打开 https://walle.cblink.net
2. 点击创建上线单
3. 点击测试环境或线上环境中的项目
4. 填写上线单标题，选取分支，版本选取，点击提交
5. 点击我的上线单的上线

## git 规范

### 关于代码分支的若干规范

请阅读 https://www.yuque.com/docs/share/bca1851e-5c80-4596-b5ff-bcb83b3ebac9?#（密码：rqx5）

### 拉取远程库代码

``` bash
# 添加主库远程源
$ git remote add team git@git.cblink.net:cblink/dashboard.haosailei.cn.git

# 同步主库 master 分支的代码
$ git pull team master
```

### 推送代码到远程库

``` bash
$ git add .

# 请阅读 commit 规范 https://www.conventionalcommits.org/zh-hans/v1.0.0-beta.4/
$ git commit -m 'fix: xxx'

# 推送，不是第一次执行 git push 就行了
$ git push origin -u master
```

## 项目规范

+ 未经商榷不准将任何依赖包添加进项目，以减少 dist 体积
+ 不可擅自修改项目配置


### 框架及代码规范

+ 命名要求
  - 变量、函数采用 `camelCase` 命名方式，且不能使用缩写，getBtnView(X)，getButtonView(√)
  - 在异步请求的函数内的变量可以根据后台字段酌情命名，如： `under_score_case`，以便于构建 payload
  - 普通函数的命名请使用 `动 + 宾` 的格式，如：getCategory
  - 事件回调函数请使用 `on + 目标对象 + 事件`，如 `onTimerChange`
  - 强烈反对任何形式的中式英语，可参照 https://unbug.github.io/codelf/ 挑选合适的词语
+ 异步请求函数请加上接口作用的描述
+ 所有的异步请求一定要捕捉异常
+ Vuex 中的 Mutation 必须是纯函数
+ 路由、API 的嵌套设计和命名要和后台模块接口保持一致（一般以后台 model 维度进行文件拆分），同时尽量保持 RESTful 风格。此外，当某个页面是基于某个 id 来确定资源的，这个 id 就可以定为 `param` 了，剩下的查询参数都应成为 `query`
+ 不准在 vue template 上有过多的业务逻辑，请尽可能多地使用 `computed`
+ 项目开发时尽量抽出可复用的组件，同时外层容器 class 名一律以 `cb-` 开头，以便隔离样式的命名空间
+ CSS 样式命名请采用 `BEM` 规范，涉及到尺寸的定义，尽量使用 8 的倍数进行，涉及到字体颜色，请尽量使用 `variables.less` 文件里定义的字体色号
+ 不准随意添加任何形式的全局对象，如 mixin，修改 Vue 原型链，挂载变量对象到 window 下
+ 未经商榷不准将任何依赖包添加进项目，以减少 dist 体积，同时不可擅自修改项目配置
+ 单页中的 data 、 API 、方法函数、template 头部都要写注释，特别是一些业务逻辑比较繁琐的流程，方便回顾的时候快速 get 到当时的想法
+ 不同字符类型之间的要用空格分隔，如中文、英文、数字两两之间相互用空格分隔
+ 未完成的功能写好功能结构后要加上 `@Todo` 标志，格式示例： `// @Todo: 小5 - 菜单支持通过链接控制显示与否`
+ 不推荐的写法、日后需要优化的写法，后面要加上 `@Deprecated` 标志

### VSCode 配置

开发尽量使用 VSCode 编辑器，同时还需安装 ESLint、Vetur、Prettier、Path Intellisense 插件，以便统一代码风格，路径智能感知的配置参照自 [Vetur Issue](https://github.com/vuejs/vetur/issues/890)。

**注意：** 项目加入了 `pre-commit` 钩子，将会在提交代码前检查代码规范，不通过将无法提交。当出现提交不通过的情况，请先执行 `yarn fix` 后再 `git add` 所有变更，最后再 commit。

### UI 规范

+ icon 请查看使用 https://vue.ant.design/components/icon-cn/
+ iconfont 图标统一用线条型，同时图标尺寸应保持一致，另外还要给图标一个规范标准的英文名称。

### 项目主要结构

``` bash
项目根目录
  │
  ├─.nuxt                     // Nuxt.js 构建目录
  │
  ├─assets                    // 资源文件夹，存放需要 Webpack 加载器来处理文件的加载和引用的资源
  │  └─less                   // Less 样式文件夹
  │     ├─global.less         // 全局样式
  │     ├─mixins.less         // Less 混合
  │     └─variables.less      // Less 样式变量
  │
  ├─components                // 组件文件夹
  │  └─CbEmpty
  │     └─index.vue
  │
  ├─dist                      // Nuxt.js 生成目录
  │
  ├─layouts                   // 布局视图
  │  ├─default.vue            // 默认布局
  │  └─empty.vue              // 空布局（PC 端用于未登录状态，即无菜单导航等框架布局）
  │
  ├─pages                     // 应用页面，需要按照模块进行路由划分
  │  ├─index.vue
  │  └─authorzation
  │     └─wechat-platform
  │        └─index.vue
  │
  ├─plugins                   // 插件
  │  ├─antd                   // AntDesign
  │  │  └─ui.js               // UI 组件按需导入
  │  ├─api                    // API 定义，需要按照模块进行划分
  │  │  ├─index.js
  │  │  └─common.js
  │  │─vue                    // Vue 框架配置
  │  │  └─component.js        // 组件管理
  │  ├─axios.js               // Axios 配置
  │  └─inject.js              // Nuxt.js 全局 context 注入配置
  │
  ├─static                    // 资源文件夹，存放不需要 Webpack 处理的静态资源文件
  │  └─images                 // 图片文件夹，需要按照模块和所属页面进行划分
  │
  │─store                     // Vuex 状态管理，需要按照模块划分状态树
  │  └─user.js                // 用户信息模块
  │
  │─.editorconfig             // 通用编辑器格式规范配置
  │
  │─.eslintrc.js              // ESLint 配置
  │
  │─.prettierrc.js            // Prettier 配置
  │
  └─nuxt.config.js            // Nuxt.js 框架配置

```

### 文案设计

参考：[Ant Design 设计语言](https://ant.design/docs/spec/copywriting-cn)
