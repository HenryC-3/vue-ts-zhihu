## 如何设计一个组件
- 设计组件时，通常需要考虑以下要素：
  - 组件的位置
    - 全局组件，teleport
    - 容器组件，slot
    - 根组件，`<router-view>`
    - 视图组件
    - 子组件
  - 组件的参数
    - props
    - attributes
    - emits
  - 组件的样式
    - 组件的 dom 元素
    - 组件的 style
  - 组件的行为
    - 什么时候展示/隐藏组件
    - 组件依靠哪些数据？
      - 异步数据
      - 同步数据
-注意：
  - 视图传递数据给子组件
- 视图组件中的任务：
  - 设置初始数据：ref reactive
  - 异步获取数据：axios dispatch(action, payload)
  - 传递数据给子组件：v-bind
  - 跳转路由: router.push({name:"路由名称"})
  - 监听子组件事件: v-on
  - 监听 vuex 中数据变化：computed
- 子组件中的任务：
  - 设置初始数据
  - 设置 props
  - 设置 $attrs
  - 监听 DOM 事件
  - 发送事件给父(视图)组件：
    ```javascript
    // miit
    emitter.emit("event",data)

    // vue 内置
    context.emit("event"，data)
    ```
## axios
- axios 中的任务
  - 设置通用请求头、通用请求体、通用链接
  - 设置请求成功或失败操作
  - axios 获取到的数据在 response.data 中
## vuex
- vuex 中的任务
  - 发送异步请求
  - 存储数据
  - 修改数据
  - 数据存储至 localStorage(数据持久化)
  - 流程: dispatch action → commit mutation → 修改 store 中的数据

## vue-router
- vue-router 中的任务
  - 动态路由
  ```javascript
  // router.js
  {
  path: "/column/:id",
  name: "column",
  component: ColumnDetail
  }

  // Component.vue
  <router-link
    class="btn btn-outline-success"
    :to="`/column/${column._id}`"
    >进入专栏</router-link>
  ``` 
## Typescript
- IDE 提示
- 验证函数参数、对象属性

## 排查思路
- 组件为什么没有渲染？
  - 数据缺失