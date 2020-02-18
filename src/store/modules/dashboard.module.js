import ApiService from '@/common/api.service'
import func from '@/functions'
import { FETCH_DATA_DEVICES, SAVE_DATA_DEVICES, FETCH_DATA_DETAIL_DEVICES } from '../actions.type'
import { SET_DEVICES, SET_ERROR, FETCH_START, SET_DETAIL_DEVICES } from '../mutations.type'

const apiName = "device"

const state = {
	errors : null,
	data : [],
	dataDetail: [],
	isLoading : false,
	isLoadingDetail: false,
}

const getters = {
	data(state){
		return state.data
	},
	dataDetail(state){
		return state.dataDetail
	},
	isLoading(state){
		return state.isLoading
	},
	isLoadingDetail(state){
		return state.isLoadingDetail
	}
}

const actions = {
	[FETCH_DATA_DEVICES]({ commit }, params){
		commit(FETCH_START)
		ApiService.get(apiName + params)
			.then(({ data }) => {
				commit(SET_DEVICES, data)
			})
			.catch(({ response }) => {
				commit(SET_ERROR, response)
			})
	},
	[FETCH_DATA_DETAIL_DEVICES](context, params){
		context.commit(FETCH_START)
		return new Promise(resolve => {
			ApiService.get(apiName + params)
				.then(({ data }) => {
					context.commit(SET_DETAIL_DEVICES, data)
					resolve(data)
				})
				.catch(({ response }) => {
					context.commit(SET_ERROR, response)
				})
		})
	},
	[SAVE_DATA_DEVICES](context, credentials){
        return new Promise(resolve => {
            ApiService.post(apiName, credentials)
                .then(({ data }) => {
                    context.dispatch(FETCH_DATA_DEVICES, func.createParams(10, 1, ""))
                    resolve(data)
                })
                .catch(({ response }) => {
                    context.commit(SET_ERROR, response)
                })
        })
    },
}

const mutations = {
	[FETCH_START](state) {
		state.isLoading = true
		state.isLoadingDetail = true
	},
	[SET_ERROR](state, error) {
		state.errors = error
		state.isLoading = false
		state.isLoadingDetail = false
		state.data = ""
	},
	[SET_DETAIL_DEVICES](state, data){
		state.dataDetail = data
		state.isLoading = false
		state.isLoadingDetail = false
	},
	[SET_DEVICES](state, data){
		state.data = data
		state.isLoading = false
		state.isLoadingDetail = false
	}
}

export default {
	state,
    actions,
    mutations,
    getters
}
