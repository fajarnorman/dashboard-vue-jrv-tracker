<template>
	<div id="app" class="app">
		<div id="login">
			<div class="panel panel-body login-form">
				<div class="text-center">
					<div class="icon-object border-slate-300 text-slate-300">
						<div class="icons" v-html="require('@/assets/images/icons/staff.svg')"></div>
					</div>
					<h5 class="content-group">Login to your account <small class="display-block">Enter your credentials below</small></h5>
				</div>
				<div v-if="errors">
					<el-alert
						title="Error Login"
						type="error"
						:description="errors.data"
						:closable="false"
						show-icon></el-alert>
				</div>
				<el-form :model="forms" :rules="rules" ref="ruleFormLogin" label-width="120px" class="demo-ruleForm" @submit="login()">
					<el-form-item label="Email" prop="email">
						<el-input type="text" v-model="forms.email" placeholder="Enter Email" @keyup.enter.native="onSubmit(forms.email, forms.password)"></el-input>
					</el-form-item>
					<el-form-item label="Password" prop="password">
						<el-input type="password" v-model="forms.password" placeholder="Enter Password" @keyup.enter.native="onSubmit(forms.email, forms.password)"></el-input>
					</el-form-item>
					<el-button type="primary" id="signin" class="button-white-green" v-on:click.prevent="onSubmit(forms.email, forms.password)">{{textLogin}}</el-button>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapGetters } from "vuex"
import { LOGIN } from "@/store/actions.type"

export default {
	name: "loginPages",
	data(){
		return{
			forms: {
				email: "",
				password: ""
			},
			rules:{
				email: [ { required: true, message: 'Email kosong', trigger: 'blur' } ],
				password: [ { required: true, message: 'Password kosong', trigger: 'blur' } ],
			},
		}
	},
	methods: {
		onSubmit(email, password) {
			this.$refs.ruleFormLogin.validate((valid) => {
				if(valid){
					this.$store
						.dispatch(LOGIN, { email, password })
						.then(() => this.$router.push({ name: 'dashboard' }))
				}else{
					return false
				}
			})
		}
	},
	computed: {
		...mapState({ errors: state => state.auth.errors }),
		...mapGetters(["textLogin"])
	}
}
</script>

<style lang="scss" scoped>
	#login{
        max-width: 320px;
        width: 100%;
        margin: 0 auto;
        padding: 0;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        transition-delay: 0s !important;
        right: auto;
        .icon-object{
            width: 72px;
            height: 72px;
            margin: 10px auto;
            .icons{
                width: 35px;
                margin: 0 auto;
            }
        }
        .panel{
            padding: 20px;
            box-shadow: 0px 5px 12px rgba(0, 0, 0, 0.2);
            .el-form-item{
                margin-bottom: 15px;
                .el-form-item__error{
                    position: static;
                }
            }
            button{
                width: 100%;
                display: block;
            }
            .content-group{
                margin-bottom: 15px;
                font-size: 14px;
                font-weight: 600;
                small{
                    font-weight: normal;
                    display: block;
                    font-size: 12px;
                    margin-top: 5px;
                }
            }
        }
    }
</style>
