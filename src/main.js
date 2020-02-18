// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ApiService from "./common/api.service"
import VueCookies from 'vue-cookies'
import VueMoment from 'vue-moment'
import CryptoJS from 'crypto-js'

import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// import style plugin
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

ApiService.init();

Vue.prototype.$CryptoJS = CryptoJS

Vue.use(ElementUI, { locale })
Vue.use(VueCookies)
Vue.use(VueMoment)
Vue.use(CryptoJS)
Vue.component('font-awesome-icon', FontAwesomeIcon)

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: { App },
	template: '<App/>'
})
