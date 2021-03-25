### 第5章 表单的世界 - 完成自定义 Form 组件
- 5-1 web 世界的经典元素 - 表单
- 5-2 ValidateInput 第一部分 — 简单的实现
- 5-3 ValidateInput 第二部分 —抽象验证规则
- 5-4 ValidateInput 第三部分 — 支持 v-model
- 5-5 ValidateInput 编码第四部分 — 使用 $attrs 支持默认属性
- 5-6 ValidateForm 组件需求分析
- 5-7 ValidateForm 编码第一部分 - 使用插槽 slot
- 5-8 ValidateForm 编码第二部分 - 尝试父子通讯
- 5-9 ValidateForm 编码第三部分 - 寻找外援 mitt
- 5-10 ValidateForm 编码第四部分 - 大功告成

### #NOTE
- [ ] vue2 vue3 中如何自定义  v-model？
- 如何在 ValidateForm 中完成对 ValidateInput 的验证？
	- 此处的情景为——用户登录时，填写完账号密码后，点击提交按钮，需要对账号、密码两个输入框中的内容进行验证根据验证结果进行下一步操作
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