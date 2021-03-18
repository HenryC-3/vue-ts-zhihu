### 第5章 表单的世界 - 完成自定义 Form 组件
- 5-1 web 世界的经典元素 - 表单
	- 知识点
		- 功能分析
			- 验证邮箱，内容不能为空，格式正确
			- 触发 blur 事件时，触发验证
			- 验证失败提供提示
- 5-2 ValidateInput 第一部分 — 简单的实现
- 5-3 ValidateInput 第二部分 —抽象验证规则
- 5-4 ValidateInput 第三部分 — 支持 v-model
	- 知识点
		- vue2 vue3 中如何自定义  v-model？
- 5-5 ValidateInput 编码第四部分 — 使用 $attrs 支持默认属性
	- 知识点
		- [[component-attrs]]
- 5-6 ValidateForm 组件需求分析
- 5-7 ValidateForm 编码第一部分 - 使用插槽 slot
	- [[component-slots]]
	- [[component-custom-events]]
- 5-8 ValidateForm 编码第二部分 - 尝试父子通讯
	- 知识点
		- 如何在 ValidateForm 中完成对 ValidateInput 的验证？
			- 方案一：通过 [[#^4ffe4a | refs]] 获取组件实例，进而获取到该组件上的方法，调用方法完成验证
			- 方案二：使用 emiit 库 
			```mermaid
			sequenceDiagram
			participant l as LoginView.vue
			participant vf as ValidateForm.vue
			participant vi as ValidateInput.vue
			autonumber
			Note over vf: 监听 form-item-created，接收 ValidateInput 函数，储存至 funcArr
			vi->>vf: ValidateInput 组件挂载成功<br> 触发 form-item-created 事件 <br> 并携带 ValidateInput 函数
			Note over vf: 监听 提交按钮区域 click 事件
			l->>vf: 提交表单，触发 click 事件
			Note over vf: 遍历执行 funcArr 中的所有函数
			Note over l: 监听 form-submit 事件，根据 result 的值执行其他逻辑
			vf->>l: 触发 form-submit 事件<br>携带 result(funcArr 所有函数的最终执行结果)
			Note over vf: unmounted 时停止监听 form-item-created 事件
			```
- 5-9 ValidateForm 编码第三部分 - 寻找外援 mitt
- 5-10 ValidateForm 编码第四部分 - 大功告成
	- 待办事项
		- 解决 bug
		- vscode 中不显示错误，编译时显示错误