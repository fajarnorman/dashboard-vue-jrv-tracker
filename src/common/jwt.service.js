import Vue from 'Vue'
import CryptoJS from 'crypto-js'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

const ID_TOKEN_KEY = CryptoJS.MD5('id_token').toString()

export const getToken = () => {
    return $cookies.get(ID_TOKEN_KEY)
}

export const saveToken = token => {
    $cookies.set(ID_TOKEN_KEY, token)
}

export const destroyToken = () => {
    $cookies.remove(ID_TOKEN_KEY)
}

export const checkToken = () => {
	let valueToken = $cookies.get(CryptoJS.MD5('id_token').toString()) ? true : false
	return valueToken
}

export const getTokenURL = () => {
	let url_string = window.location
	let url = new URL(url_string)
	let getToken = url.searchParams.get("token")
	return getToken
}

export default {
	getToken,
	saveToken,
	destroyToken,
	checkToken,
	getTokenURL
}
