import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vueParticles from 'vue-particles'
import * as api from './config' // 导入api接口
import '@/assets/styles/base.scss'
import '@/assets/styles/common.scss'
import '@/assets/iconfont/iconfont.css'
import dataV from '@jiaminghi/data-view'
import {
	getCookieValue
} from './config/env'

import '../rem';
Vue.use(dataV)
Vue.use(vueParticles)
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$api = api;

router.beforeEach((to, from, next) => {
	if (to.name !== 'Login' && !getCookieValue('SET_TOKEN')) {
		next({ name: 'Login' })}
	else next()
  })
new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')