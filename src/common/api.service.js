import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import JwtService from './jwt.service'
import { API_URL } from './config'

const SITE_KEY = "4483893"
const SITE_SECRET = "0d79a05f5a3a914daa48534d5f50bb3a34558a3f"

const ApiServices = {
    init() {
        Vue.use(VueAxios, axios)
        Vue.axios.defaults.baseURL = API_URL
    },

    setHeader() {
        Vue.axios.defaults.headers.common["Authorization"] = "Bearer " + JwtService.getToken()
    },

    get(resource) {
        return Vue.axios.get(`${resource}`).catch(error => {
            throw new Error(`[RWV] ApiService ${error}`)
        })
    },

    post(resource, params) {
        return Vue.axios.post(`${resource}`, params)
    },

    put(resource, params) {
        return Vue.axios.put(`${resource}`, params)
    },

    delete(resource) {
        return Vue.axios.delete(resource).catch(error => {
            throw new Error(`[RWV] ApiService ${error}`)
        })
	},

	getUrlLogoutSSO(value){
		let logout = value === true ? '/logout' : ''
		return process.env.BASE_URL + 'auth/sso' + logout + "?site_key=" + SITE_KEY + "&site_secret=" + SITE_SECRET
	}
}

export default ApiServices
