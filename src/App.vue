<template>
	<div id="app-first" class="app">
		<div class="backdrop"></div>
		<header-component />
		<div class="page-container">
			<div class="page-content clearfix">
				<sidebar-component />
				<transition name="fade">
					<router-view/>
				</transition>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex"
import HeaderComponent from '@/components/HeaderComponent'
import SidebarComponent from '@/components/SidebarComponent'
import { CHECK_TOKEN, FETCH_INFO, LOGOUT } from "@/store/actions.type"

export default {
	name: 'App',
	mounted(){
		this.getInfo()
		this.$store.dispatch(CHECK_TOKEN)
	},
	methods: {
		getInfo(){
			if(this.$cookies.get(this.$CryptoJS.MD5('id_token').toString())){
				performance.navigation.type == 1 ? this.$store.dispatch(FETCH_INFO) : ""
			}else{
				performance.navigation.type == 1 ? this.$store.dispatch(LOGOUT) : ""
			}
		},
	},
	components: { HeaderComponent, SidebarComponent }
}
</script>

<!-- styling for the component -->
<style src="./assets/styles/scss/global.scss" lang="scss"></style>
