import ApiService from '@/common/api.service'
import JwtService from '@/common/jwt.service'
import router from '@/router'
import { LOGOUT, CHECK_AUTH, CHECK_TOKEN, FETCH_INFO } from '../actions.type'
import { PURGE_AUTH, SET_ERROR, SET_INFO, FETCH_START, SET_TOKEN } from '../mutations.type'

const state = {
	errors : null,
	textLogin: "Sign In",
    data : {},
    dataInfo : {},
    isAutenticated : !!JwtService.getToken()
}

const getters = {
    isAutenticated(state){
        return state.isAutenticated
	},
	textLogin(state){
		return state.textLogin
	}
}

const actions = {
	[CHECK_TOKEN](context){
		context.commit(SET_TOKEN)
	},
    [LOGOUT](context){
        context.commit(PURGE_AUTH)
	},
	[FETCH_INFO](context){
		let apiUrl = process.env.BASE_URL + "auth/info"
		ApiService.get(apiUrl)
			.then(({ data }) => { context.commit(SET_INFO, data) })
			.catch(({ response }) => { context.commit(SET_ERROR, response) })
	},
    [CHECK_AUTH](context){
		if(JwtService.getTokenURL() !== null){
			JwtService.saveToken(JwtService.getTokenURL())
			ApiService.setHeader()
		}else{
			!JwtService.getToken() ? context.commit(PURGE_AUTH) : ApiService.setHeader()
		}
    },
}

const mutations = {
	[FETCH_START](state){
		state.textLogin = "Loading..."
	},
	[SET_TOKEN](state){
		state.isAutenticated = JwtService.checkToken()
		router.push({ name: "dashboard" })
	},
    [SET_ERROR](state, error) {
		state.errors = error
		state.textLogin = "Sign In"
    },
    [SET_INFO](state, data){
        state.isAutenticated = true
        state.dataInfo = data
        state.errors = null
    },
    [PURGE_AUTH](state) {
        state.isAutenticated = false
        state.data = {}
		state.errors = null
		state.textLogin = "Sign In"
		JwtService.destroyToken()
		window.location.href = ApiService.getUrlLogoutSSO(true)
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}
