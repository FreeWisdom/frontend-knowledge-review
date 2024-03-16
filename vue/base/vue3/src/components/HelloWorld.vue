<template>
  <div class="hello">
    {{ msg }}
    {{ addMsg }}
    <!-- 面试题 -->
    <!-- 计算类型 -->
    number: {{ state.number }}
    number1: {{ state.number1 }}
    <div>
      1. 绑定数据计算可以直接写在花括号里么？ - 数字运算OK
      <h3>number + 1: {{ state.number + 1 }}</h3>
    </div>
    <div>
      2. 截断 - 简单的字符串处理？ - 字符串处理OK
      <h3>{{ msg.slice(0, -1) }}</h3>
    </div>
    <div>
      3. 浮点数操作？ - OK
      <h3>{{ state.number.toFixed(2) }}</h3>
    </div>
    <div>
      4. 转整形？ - OK
      <h3>{{ parseInt(state.number, 10) }}</h3>
    </div>

    <!-- 加工类型 -->
    <div>
      5. 函数加工？ - OK
      <h3>{{ calcNumber(state.number) }}</h3>
    </div>

    <!-- 条件类型 -->
    <div>
      6. 三元运算？ - OK
      <h3>100 > 99:{{ 100 > 99 ? '对' : '错' }}</h3>
    </div>
    <div>
      7. 逻辑运算？ - OK
      <h3>100 > 99 && 100 > 98:{{ 100 > 99 && 100 > 98 }}</h3>
    </div>

    <div @click="handleAdd">加油</div>

    <div v-for="it in state.stateArr" :key="it">{{ it }}</div>
    <div v-for="it in state.stateObj.stateArr" :key="it">{{ it }}</div>
    <!-- vueTemplateCompiler -->
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import {
  reactive, // 响应式
  // ref, // 响应式
  computed,
  watch
} from 'vue'

const msg = 'welcome to zhaowa'
// reactive 对对象类型进行响应式声明，对整体进行流转，直接用来某个模块的使用
const state = reactive({
  number: 0,
  number1: 0,
  stateArr: [0, 1, 2, 3, 4],
  stateObj: {
    stateArr: [0, 1, 2, 3, 4],
  }
})

// ref 对单个简单类型进行响应式声明，单个新增变量的补充
// const number = ref(0)
// number.value

const addMsg = computed(() => msg + state.number)
watch(
  () => state.number,
  () => {
    state.number1 = state.number1 + 2
  }
)

state.stateArr.push(5)
state.stateObj.stateArr.push(5)

const calcNumber = function(num) {
  return num + 2
}

const handleAdd = function() {
  state.number ++
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
