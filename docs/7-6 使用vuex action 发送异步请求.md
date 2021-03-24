- 知识点
	- 如何使用 action 发送异步请求
	- action 发送异步请求后，数据是如何层层传递到组件，最终渲染页面的？
	- 数据 + 视图 + 组件
	```mermaid
	sequenceDiagram
	participant s as state
	participant v as view
	participant c as component
	s->>v:store.state.data 获取数据
	v->>c::props:data 传递数据
	
	```
	- 数据 + 视图 + 组件 + mutation
	```mermaid
	sequenceDiagram
	participant p as page
	participant v as view
	participant c as component
	participant m as mutation
	participant s as state
	autonumber
	p->>v:开始渲染
	s->>v:获取数据，store.state.data
	v->>c:传递数据，:props:data
	p->>v:点击登录，@click
	v->>m:触发 mutation，store.commit("mutationName")
	m->>s:修改数据，loginstatus = ture
	s->>v:监听数据，computed(()=> data)，数据改变
	v->>p:重新渲染
	```
	- 数据 + 视图(视图+组件) + mutation + action
	```mermaid
	sequenceDiagram
	participant p as page
	participant v as view
	participant a as action
	participant m as mutation
	participant s as state
	Note over s:无数据
	p->>v:开始渲染
	v->>a: onMounted，触发 action<br>store.dispatch("actionName")
	a->>m:触发 mutation<br>context.commit("mutationName", data)
	m->>s:修改数据
	Note over s:有数据
	s->>v:监听数据，computed(()=> data)，数据改变
	v->>p:重新渲染
	```
- 待办 
	- [x] 添加适配后端数据结构的 avatar Interface
	- [ ] 缩小图片
	- [x] 修改组件中变量值，适配后端数据形式
	- [ ] 样式优化，页面明显太宽了
	- [x] 总结为什么这次引入后端 API 的过程这么操蛋
	- [ ] 总结 vue 调试方案
- 为什么这次引入后端 API 的过程这么操蛋
	- 后端接口数据类型与前端类型不一致
	- 后端接口数据命名与前端命名不一致
	- 缺少对应组件
	- 不清楚 vuex 的调用流程
	- 因为拼写错误，出现了很多莫名奇妙的 bug
	- 因为不清楚还需要设置缓存
- vue 调试方案
	- [前端chrome浏览器调试总结 - 简书](https://www.jianshu.com/p/b25c5b88baf5)
- 收集箱
	- [vuex中为什么把把异步操作封装在action，把同步操作放在mutations？ - 知乎](https://www.zhihu.com/question/48759748/answer/112823337)