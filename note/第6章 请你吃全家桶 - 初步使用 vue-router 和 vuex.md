### 第6章 请你吃全家桶 - 初步使用 vue-router 和 vuex
- 6-1 什么是 SPA（Single Page Application） 应用？
    - 知识点
        - 什么是 SPA
            - 一种 web 应用程序或网站
            - 用户交互时不会跳转到其他网页
        - SPA 的优势
            - 速度快，一次下载完成静态文件，跳转后不需要再次下载
            - 体验好，交互趋于无缝，更倾向于原生应用
- 6-2 vue-router 安装和使用
- 6-3 vue-router 配置路由
- 6-4 vue-router 添加路由
- 6-5 添加 columnDetail页面
    - 知识点
        - 功能分析
            - 点击 columnList 中的 column 进入到对应的 column detail 界面
- 6-6 状态管理工具是什么
- 6-7 Vuex 简介和安装
    - 知识点
        - 为什么要用 vuex
        - vuex 的模式是？
        - Vue 中使用 vuex 的步骤
            - 初始化
                - 初始化 vuex，按照官网的例子搭个结构，写好 store、mutation
                - 确定 store 中的内容，写好 store 的 interface
            - 使用
                - 在组件中(setup) 使用 store
                    - 为什么通过 computed 获取数据
                        ```mermaid
                        sequenceDiagram
                        participant v as view
                        participant c as computed
                        participant s as store
                        s->>c:嘿，数据变了
                        c->>v:嘿，store 里的数据变了，这是新数据
                        Note over v:根据新数据重新渲染页面
                        ```
                - 根据不同组件的需求写好 mutation
            - 确定何时 commit mutation
- 6-8 Vuex 整合当前应用
- 6-9 使用 Vuex getters
- 6-10 添加新建文章页面
    - 知识点
        - 功能分析
            - [ ] 图片上传
            - [ ] 输入框
                - [x] 标题不能为空
                - [ ] 字数限制
                - [ ] 样式优化
            - [ ] 输入框
                - [x] 文章内容不能为空
                - [ ] 字数限制
                - [x] 文章编辑区域为 textarea
                - [ ] 编辑器
                - [ ] 样式优化
            - [ ] 提交按钮
                - [ ] 验证所有内容
                - [x] 提交后自动跳转到该文章所属专栏详情页
            - [ ] 测试
                - [x] 添加文章标题、文章内容后，点击提交按钮，跳转至专栏详情页，底部出现新添加的文章
- 6-11 Vue router 添加路由守卫 - 前置守卫
    - 知识点
        - 路由守卫是什么？
            - [ ] 在 setup 中使用路由守卫
                - setup
            - [ ] vue-router 钩子函数与 vue 生命周期钩子函数 
                - [Vue 导航守卫(路由的生命周期)](https://juejin.cn/post/6844903912340717575)
            - [ ] vue-router 钩子函数能够做什么
            - 文档 [[project/Vue3+TS/source/vue-router/docs/zh/guide/advanced/navigation-guards | 路由守卫]]
            - 根据配置位置不同，vue-router 提供的钩子函数可分为 3 种
                - 全局守卫：挂载在 router 实例上的钩子函数
                - 路由守卫：路由配置里的钩子函数
                - 组件守卫：组件内的钩子(只说明如何在 setup 中使用钩子函数)
            - 全局守卫会在每次切换路由时触发，路由守卫只会在切换不同路由时触发，组件守卫会在每次切换路由时触发
            - 下面的例子中，涉及到 2 种情形
                - 从 `/login` 切换到 `/post/2` 属于切换不同的路由，除了触发全局守卫和组件守卫外，还触发了路由守卫 `beforeEnter`
                - 从 `/post/1` 切换到 `/post/2` 时，属于在可复用组件间切换路由，会额外触发 `beforeRouterUpdate`
        ```mermaid
        sequenceDiagram
            participant l as / login
            participant p1 as / post / 1
            participant p2 as / post / 2
            autonumber
            l->>p2:1.beforeRouterLeave → 2.beforeEach → 3.**beforeEnter**<br> → 4.beforeRouterEnter → 5.beforeResolve → 6.afterEach
            p2->>p1:1.beforeRouterLeave → 2.beforeEach → 3.**beforeRouterUpdate**<br> → 4.beforeRouterEnter → 5.beforeResolve → 6.afterEach
        ```
- 6-12 Vue router 添加路由守卫 - 使用元信息完成权限管理
    - 知识点
        - 使用路由 meta 的意义是？
            - 很多时候跳转路由的逻辑是：如果满足了条件 A，那么就跳转路由。逻辑上，该条件与该路由是绑定在一起，因此可以放在 meta 信息中，方便管理
            - 借助 vue-router 钩子，可以读取当前路由的 meta 信息，编写跳转逻辑
            ```javasript
            {
                path: "/create",
                name: "create",
                component: CreatePost,
                meta: { requiredLogin: true }
            }
            ```
        - [[project/Vue3+TS/source/vue-router/docs/zh/guide/advanced/meta | 路由元信息]]

### 第6章 请你吃全家桶 - 初步使用 vue-router 和 vuex
- 6-1 什么是 SPA（Single Page Application） 应用？
    - 知识点
        - 什么是 SPA
            - 一种 web 应用程序或网站
            - 用户交互时不会跳转到其他网页
        - SPA 的优势
            - 速度快，一次下载完成静态文件，跳转后不需要再次下载
            - 体验好，交互趋于无缝，更倾向于原生应用
- 6-2 vue-router 安装和使用
- 6-3 vue-router 配置路由
- 6-4 vue-router 添加路由
- 6-5 添加 columnDetail页面
    - 知识点
        - 功能分析
            - 点击 columnList 中的 column 进入到对应的 column detail 界面
- 6-6 状态管理工具是什么
- 6-7 Vuex 简介和安装
    - 知识点
        - 为什么要用 vuex
        - vuex 的模式是？
        - Vue 中使用 vuex 的步骤
            - 初始化 vuex，按照官网的例子搭个结构，写好 store、mutation
            - 确定 store 中的内容，写好 store 的 interface
            - 在组件中(setup) 使用 store
                - 为什么通过 computed 获取数据
                ```mermaid
                sequenceDiagram
                participant v as view
                participant c as computed
                participant s as store
                s->>c:嘿，数据变了
                c->>v:嘿，store 里的数据变了，这是新数据
                Note over v:根据新数据重新渲染页面
                ```
                - 根据不同组件的需求写好 mutation
            - 确定何时 commit mutation
- 6-8 Vuex 整合当前应用
- 6-9 使用 Vuex getters
- 6-10 添加新建文章页面
    - 知识点
        - 功能分析
            - [ ] 图片上传
            - [ ] 输入框
                - [x] 标题不能为空
                - [ ] 字数限制
                - [ ] 样式优化
            - [ ] 输入框
                - [x] 文章内容不能为空
                - [ ] 字数限制
                - [x] 文章编辑区域为 textarea
                - [ ] 编辑器
                - [ ] 样式优化
            - [ ] 提交按钮
                - [ ] 验证所有内容
                - [x] 提交后自动跳转到该文章所属专栏详情页
            - [ ] 测试
                - [x] 添加文章标题、文章内容后，点击提交按钮，跳转至专栏详情页，底部出现新添加的文章
- 6-11 Vue router 添加路由守卫 - 前置守卫
    - 知识点
        - 路由守卫是什么？
            - [ ] 在 setup 中使用路由守卫
                - setup
            - [ ] vue-router 钩子函数与 vue 生命周期钩子函数 
                - [Vue 导航守卫(路由的生命周期)](https://juejin.cn/post/6844903912340717575)
            - [ ] vue-router 钩子函数能够做什么
            - 文档 [[project/Vue3+TS/source/vue-router/docs/zh/guide/advanced/navigation-guards | 路由守卫]]
            - 根据配置位置不同，vue-router 提供的钩子函数可分为 3 种
                - 全局守卫：挂载在 router 实例上的钩子函数
                - 路由守卫：路由配置里的钩子函数
                - 组件守卫：组件内的钩子(只说明如何在 setup 中使用钩子函数)
            - 全局守卫会在每次切换路由时触发，路由守卫只会在切换不同路由时触发，组件守卫会在每次切换路由时触发
            - 下面的例子中，涉及到 2 种情形
                - 从 `/login` 切换到 `/post/2` 属于切换不同的路由，除了触发全局守卫和组件守卫外，还触发了路由守卫 `beforeEnter`
                - 从 `/post/1` 切换到 `/post/2` 时，属于在可复用组件间切换路由，会额外触发 `beforeRouterUpdate`
        ```mermaid
        sequenceDiagram
            participant l as / login
            participant p1 as / post / 1
            participant p2 as / post / 2
            autonumber
            l->>p2:1.beforeRouterLeave → 2.beforeEach → 3.**beforeEnter**<br> → 4.beforeRouterEnter → 5.beforeResolve → 6.afterEach
            p2->>p1:1.beforeRouterLeave → 2.beforeEach → 3.**beforeRouterUpdate**<br> → 4.beforeRouterEnter → 5.beforeResolve → 6.afterEach
        ```
- 6-12 Vue router 添加路由守卫 - 使用元信息完成权限管理
    - 知识点
        - 使用路由 meta 的意义是？
            - 很多时候跳转路由的逻辑是：如果满足了条件 A，那么就跳转路由。逻辑上，该条件与该路由是绑定在一起，因此可以放在 meta 信息中，方便管理
            - 借助 vue-router 钩子，可以读取当前路由的 meta 信息，编写跳转逻辑

        - [[project/Vue3+TS/source/vue-router/docs/zh/guide/advanced/meta | 路由元信息]]