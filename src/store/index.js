import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth.module'
import dashboard from './modules/dashboard.module'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
		auth,
		dashboard
    }
})
