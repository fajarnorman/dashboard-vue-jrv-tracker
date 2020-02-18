import Vue from 'Vue'
import VueCookies from 'vue-cookies'
import CryptoJS from 'crypto-js'

Vue.use(VueCookies)

const SsoServices = {
	init(){
		this.getTokenSSO() !== null ? this.setTokenSSO() : ""
		this.setGlobalData()
	},
	setGlobalData(){
		if($cookies.get(CryptoJS.MD5('id_token').toString())){

		}
	},
	checkToken(){
		if($cookies.get(CryptoJS.MD5('id_token').toString())){
			return true
		}else{
			return false
		}
	},
	getTokenSSO(){
		let url_string = window.location
		let url = new URL(url_string)
		let getToken = url.searchParams.get("token")
		return getToken
	},
	setTokenSSO(){
		let cookieName = CryptoJS.MD5('id_token').toString()
		let domainName = process.env.BASE_PATH
		let cookieValue = this.getTokenSSO()
		let myDate = new Date()
		myDate.setMonth(myDate.getMonth() + 12)
		document.cookie = cookieName + "=" + cookieValue + ";expires=" + myDate + ";domain=" + domainName + ";path=/"
	}
}

export default SsoServices
