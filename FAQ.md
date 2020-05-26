# Typescript

1. 报错 `Property 'flowBg' does not exist on type 'CombinedVueInstance<Vue, unknown, unknown, unknown, Readonly<Record<never, any>>>'.`

参考: https://qiita.com/shunjikonishi/items/3774486d37af80d1ae47


# uniapp

1. 在 `uniapp` 中不支持引用 `vue` 写法

```js
// x.js
import Vue from 'vue'
import dialog from './dialog.vue'
Vue.component('dialog', dialog)

// main.js
import 'x.js'
```

应该写在 `main.js` 中(创建实例中就应该注册上去)