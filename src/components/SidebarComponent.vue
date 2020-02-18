<template>
	<div class="sidebar sidebar-main">
		<div class="sidebar-content">
			<!-- main navigation -->
            <div class="sidebar-category sidebar-category-visible">
				<div class="category-content no-padding">
					<div class="logo">
						<img class="img-logo" src="@/assets/images/logo-jarvis.png">
						<div class="versions">{{versions}}</div>
					</div>
					<a href="#" class="closesidebar" @click.prevent="sidebarClose()"><font-awesome-icon class="fontIcons" :icon="fontsIcons.close" /></a>
					<ul class="navigation navigation-main navigation-accordion">
						<div class="sidebar-nav active" id="produk">
							<el-menu class="el-menu-vertical-demo" :unique-opened="true">
								<el-menu-item index="0">
                                    <router-link v-bind:to="'/'" class="new-icons">
                                        <div class="icon-sidebar" v-html="require('@/assets/images/icons/sidebar/icon-dashboard.svg')"></div>
                                        <span>Devices Tracker</span>
                                    </router-link>
                                </el-menu-item>
							</el-menu>
						</div>
					</ul>
				</div>
            </div>
		</div>
	</div>
</template>

<script>
import { faTimes } from '@fortawesome/free-solid-svg-icons'

export default {
	name: "sidebarComponent",
	data(){
		return{
			versions: process.env.VERSION_DASHBOARD,
            errored: false,
            fontsIcons: {
                close: faTimes
            }
		}
	},
	methods: {
		sidebarClose(){
			document.getElementsByClassName('sidebar')[0].classList.remove('showing')
		}
	},
}
</script>
