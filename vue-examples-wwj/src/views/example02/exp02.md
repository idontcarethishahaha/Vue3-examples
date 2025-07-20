## 实验二 Vue双向绑定实验

### TypeScript Interface（TS接口）

#### 1.接口的用途

1. 接口用于约束数据结构
2. TS接口代码不会被编译成js代码，仅用于ts编译器检查代码
   数据结构与接口不符时无法编译

#### 2.接口的语法

1. 定义接口

```ts
interface User {
  id？：number | string | null;
  name?: string;
  age: number;
}
```

? 声明可选属性
| 声明属性类型允许为多种类型

2. 使用接口

```ts
const user: User = {
  id：66,
  name: '张三',
  age: 18
};
```

这里变量user声明为User类型，因此user必须符合User接口的约束，否则无法编译。

3. 实验二中的接口实现

我的实验二的接口在src/views/datasource下

这段代码在src/views/datasource/Types.ts中
将接口声明在独立的类型文件中，export供外部使用

```ts
export interface Course {
  id: number
  name: string
  credit: number
  term: number
}
```

这段代码在src/views/datasource/DataSource.ts中
从统一定义的接口类型文件(Types.ts)中引入(import)需要的接口，约束对象数据结构
先声明是 变量let/常量const (多数时候用const)
再声明 变量名称 : 变量类型
const courses: Course[]
先声明是常量(const)，
再声明变量名称(courses)，
最后声明变量类型(: Course[])
（Course类型的数组）

```ts
//import type 导入类型定义
import type { Course } from '@/datasource/Types'

export function listCourses(): Course[] {
  const courses: Course[] = [
    {
      id: 1,
      name: 'Web开发技术',
      credit: 2.5,
      term: 4
    },
    {
      id: 2,
      name: 'C++程序设计',
      credit: 2.5,
      term: 4
    }
  ]
  return courses
}
```

const courses: Course[]表示courses是一个Course类型的数组，其每个元素都必须符合Course接口的结构

### Vue模板语法

[Vue模板语法](https://cn.vuejs.org/guide/essentials/template-syntax.html)

#### 插值表达式

在模板中，使用{{ }}语法可以将响应式数据插入到 HTML 中，实现数据的动态展示。

```vue
<template>
  <div class="score-display">{{ totalScoreR }}/{{ maxScore }}</div>
</template>
```

{{ totalScoreR }}和{{ maxScore }}会被替换为对应响应式数据的值，并在数据变化时自动更新。

#### ref() 响应式数据

ref 是 Vue 3 提供的响应式引用函数，用于**创建响应式数据**
ref<T>()支持将基本数据类型/对象/数组转为响应式数据
与 watch、computed 等配合实现响应式逻辑
以便在数据变化时触发视图更新等响应式行为

```ts
//需要从 Vue 库中引入ref函数才能使用
import { ref } from 'vue'
```

##### 语法

[响应式基础](https://cn.vuejs.org/guide/essentials/reactivity-fundamentals.html)

`ref<类型>(初始值)`
<类型>为 TypeScript 的类型标注（可选，推荐使用以增强代码严谨性）
初始值为创建ref时的默认值

这部分的代码来自于src/views/example02/CreditJisuan.vue

```ts
// 课程列表响应式数据，初始值为排序后的课程数组
const courses = ref(listCourses().sort((a, b) => a.term - b.term))

//已选课程响应式数据，类型为Course数组，初始值为空数组
const selectedCoursesR = ref<Course[]>([])

//总学分响应式数据，初始值为0
const totalScore = ref(0)

//类似的，还可以有布尔类型的响应式数据...
//src/views/homework01_2/WeekView.vue
const isWeekdayR = ref(false)
```

ref 返回的是一个包含 value 属性的响应式对象，
在 JavaScript/TypeScript 代码中，
需要通过` .value` 来访问和修改其封装的响应式数据

```ts
//修改响应式数据
totalScoreR.value = newValue.reduce((sum, course) => sum + course.credit, 0)
```

##### 在模板中使用响应式数据

在 Vue 模板中使用ref创建的响应式数据时，Vue 会自动解包value属性，无需手动添加.value

```vue
<!-- 在模板中使用响应式数据时，不需要写 .value -->
<template>
  <div>总学分：{{ totalScoreR }}</div>
</template>
```

接口User参考上方

```ts
interface User {
  id？：number | string | null;
  name?: string;
  age: number;
}
```

```ts
const user: User = {
  id: 1,
  name: 'wuwenjin',
  age: 20
}
const userR = ref(user)
```

当对象属性为可选属性时，属性可能为空
可使用`可选链操作符 ?.` 避免空指针异常

```vue
<template>
  <div>
    <p>用户姓名：{{ userR?.name }}</p>
  </div>
</template>
```

#### 指令

[组件 v-model](https://cn.vuejs.org/guide/components/v-model.html)

#### v-model 双向数据绑定

v-model指令用于在表单元素上创建双向数据绑定，即表单元素的值与响应式数据之间可以相互同步：当表单元素的值变化时，响应式数据会自动更新；当响应式数据变化时，表单元素的值也会随之更新

```vue
<template>
  <div v-for="course of coursesR" :key="course.id">
    <label>
      <input type="checkbox" :value="course" v-model="selectedCoursesR" />
      {{ course.name }} - ({{ course.term }}) ({{ course.credit }}学分)
    </label>
  </div>
</template>
```

v-model="selectedCoursesR"将复选框与selectedCoursesR响应式数组进行双向绑定：当勾选复选框时，对应的课程对象会被添加到selectedCoursesR数组中；当取消勾选时，对应的课程对象会从selectedCoursesR数组中移除。

#### v-for 列表渲染

[列表渲染](https://cn.vuejs.org/guide/essentials/list.html)

##### 语法：

v-for="(item, index) in items" :key="item.id"，
item为数组中的每个元素，index为元素的索引（可选）
items为被遍历的数组，key为每个元素的唯一标识

key可以用index

```vue
<div class="course">
      <template v-for="(c, index) of selectedCoursesR" :key="index">
        {{ c.term }}学期 / {{ c.point }}学分 / {{ c.name }}
      </template>
</div>
```

也可以使用别的可唯一表示的属性，如
key="course.id"使用课程的id作为每个元素的唯一标识。

```vue
<template>
  <!--of用于数组遍历，in用于对象属性遍历-->
  <div v-for="course of coursesR" :key="course.id">
    <label>
      <input type="checkbox" :value="course" v-model="selectedCoursesR" />
      {{ course.name }} - ({{ course.term }}) ({{ course.credit }}学分)
    </label>
  </div>
</template>
```

#### 动态样式绑定

[Class与Style绑定] (https://cn.vuejs.org/guide/essentials/class-and-style.html#binding-inline-styles)

通过:style(v-bind:style 的缩写)指令可以动态绑定元素的样式，其值可以是一个对象，对象的属性为 CSS 样式名，值为对应的样式值（可以是响应式数据）

```vue
<template>
  <div class="score-display" :style="{ color: totalScoreR >= maxScore ? 'green' : 'red' }">
    {{ totalScoreR }}/{{ maxScore }}
  </div>
</template>
```

color样式的值会根据totalScoreR与maxScore的比较结果动态变化：当总学分大于等于最大学分时，文字颜色为绿色；否则为红色

### watch 数据监听

[监听器](https://cn.vuejs.org/guide/essentials/watchers.html)

语法

```ts
//watch 基本语法
watch(
  source, // 要监听的响应式数据
  callback, // 回调函数 (newValue, oldValue) => { ... }
  options // 可选配置对象
)
```

```ts
watch(
  被监听的数据,
  (newValue, oldValue) => {
    // 数据变化时执行的回调函数，newValue为新值，oldValue为旧值（可选）
  },
  {
    deep: false, // 是否深度监听（用于监听对象或数组内部变化）
    immediate: false // 是否在初始时立即执行回调函数
  }
)
```

实验二中的 watch 使用示例：

```ts
watch(
  selectedCoursesR,
  newValue => {
    // 当已选课程变化时，重新计算总学分
    totalScoreR.value = newValue.reduce((sum, course) => sum + course.credit, 0)
    // 对已选课程按学期排序
    newValue.sort((a, b) => a.term - b.term)
  },
  { deep: true } // 深度监听，因为selectedCoursesR是数组，需要监听其内部元素的变化
)
```
