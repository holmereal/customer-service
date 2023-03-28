import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import md5 from 'js-md5';
import { Checkbox, CheckboxGroup } from 'vant';
import { Notify } from 'vant';
import { Popup } from 'vant';
import { Uploader } from 'vant';
import { List } from 'vant';
import { Loading } from 'vant';

import 'vant/lib/index.less';
Vue.config.productionTip = false
Vue.prototype.$md5 = md5;

Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Notify);
Vue.use(Popup);
Vue.use(Uploader);
Vue.use(List);
Vue.use(Loading);
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif