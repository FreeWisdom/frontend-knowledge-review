## vue基础用法
### 1、理论
#### 1.1、面试题1: 简单聊聊对于MVVM的理解
* 语义化模版
* MVC - model view controller
* MVVM - model view viewModel
    * 数据本身会绑定在viewmodel层，视图层跟viewmodel层关联
    * 视图发生变化 => viewModel => 更改数据
    * 数据发生变化 => viewModel => 更新视图

### 2、写法
#### 2.1、vue是如何利用mvvm思想进行写法统一和前端开发
0. 数据双向绑定
1. 利用花括号，构筑了数据与vm的绑定关系 => buidTemplate => build
2. 通过视图绑定事件，来处理数据 => v-model => :value @input => model
    ```js
        <a-component v-model="data1"></a-component>

        // a-component
        props: {
            value: {
                type: string,
                default: ''
            }
        },
        methods: {
            handleChangeValue() {
                this.$emit('input', dataSon)
            }
        },
    ```
3. buidTemplate => render()
    ```js
        <template>
            <div class='data1'>{{ data1 }}</div>
        </template>

        render() {
            return (
                <div class='data1'>{ this.data1 }</div>
            )
        }
        // v8 javascript设计模式 javascript语言精粹
    ```

#### 2.2、生命周期
##### 面试题：vue生命周期
1. ***创建阶段***：beforeCreate（setup） => created（setup） => beforemount => mounted
    * bC: new Vue() - 实例创建阶段
    * c: data | props | method | computed - 数据操作 => 不涉及vdom以及dom操作
    * bM：vDOM - 数据操作都可以进行，不涉及dom
    * m：DOM - 任何操作
2. ***更新阶段***：beforeUpdate => updated
    * bU: vDom完成更新，dom旧
    * u: dom已经更新 => 谨慎修改数据
3. ***销毁阶段***：beforeDestroy（beforeUnmount） => destroyed（unmounted）
    * bD: 实例未被销毁 - 清空eventBus...
    * d: 实例已经被销毁

#### 2.3、指令 ｜ 监听
##### 条件
v-if v-show
v-else v-else-if

##### 循环
> for & if 拿个优先级高？
>* vue2.x  v-for 优先作用于 v-if
>* vue3.x  v-if 优先作用于 v-for

##### 其他
v-model v-once v-text v-html v-bind v-on
自定义指令
```js
    directives: {
        zhaowa: {
            update: function() {}
        }
    }
```

##### watch & computed
>vue 2.x不同vue 3.x
* vue2 配置化
* vue3 函数化