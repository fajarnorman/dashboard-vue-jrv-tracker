<template>
	<div id="Header">
		<header>
			<nav class="navbar navbar-dark bg-navbar-header navbar-expand-md">
				<el-menu class="el-menu-demo" default-active="2" mode="horizontal" @select="handleSelect">
					<el-menu-item index="1" class="img-navbar"></el-menu-item>
					<el-submenu index="6" class="float-right" popper-class="menu-top-dropdown">
						<template slot="title">
                            <img src="@/assets/images/placeholder.jpg" class="user-img">
                            <div class="caret-custom"></div>
                        </template>
						<el-menu-item index="6-2">
                            <a href="#" @click.prevent="logout" class="logout">
                                <div class="icons" v-html="require('@/assets/images/icons/logout.svg')"></div> Logout
                            </a>
                        </el-menu-item>
					</el-submenu>
				</el-menu>
			</nav>
			<div class="menu-responsive clearfix">
				<div class="logo">
					<img class="img-logo" src="@/assets/images/logo.png">
				</div>
				<a href="#" @click.prevent="sidebarOpen()"><font-awesome-icon class="fontIcons" :icon="fontsIcons.menu" /></a>
			</div>
		</header>
	</div>
</template>

<script>
import { LOGOUT } from "@/store/actions.type"
import { faBars, faKey } from '@fortawesome/free-solid-svg-icons'

export default {
	name: "headerComponent",
	data(){
        return {
			fontsIcons: {
                menu: faBars,
                key: faKey,
            },
		}
	},
	methods: {
		logout() {
            this.$store.dispatch(LOGOUT)
        },
        sidebarOpen(){
            document.getElementsByClassName('sidebar')[0].classList.add('showing')
        },
        handleSelect(key, keyPath) {
			let element = key
			let checkKeyLogout = (key == '6-2') ? this.logout() : ""
        },
	}
}
</script>
