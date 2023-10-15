

<template>
	<div class="login-container">
		<div class="form">
			<h2>中央控制管理系统</h2>
			<div class="item">
				<i class="iconfont icon-user"></i>
				<input autocomplete="off" type="text" class="input" v-model="userName" placeholder="请输入用户名" />
			</div>
			<div class="item">
				<i class="iconfont icon-password"></i>
				<input autocomplete="off" type="password" class="input" v-model="userPwd" maxlength="20"
					@keyup.enter="login" placeholder="请输入密码" />
			</div>
			<button class="loginBtn" :disabled="isLoginAble" @click.stop="login">
				立即登录
			</button>

		</div>





	</div>
</template>

<script>

import md5 from 'md5'
import { getLogin } from '../config/logic'


export default {
	name: 'Login',
	components: {},
	data() {
		return {
			userName: 'admin',
			userPwd: '123456',
			visible: false,
			modalContent: '这是一段自定义模态框消息'
		}
	},
	computed: {
		isLoginAble() {
			return !(this.userName && this.userPwd);
		},
	},
	created() { },
	mounted() {
	},

	methods: {
		async login() {

			if (!this.userName || !this.userPwd) {
				this.$Toast({
					content: '请输入正确的用户名和密码',
					type: 'error',
				})
			} else {
				const timestamp = new Date().getTime();
				const auth = md5(`${this.userName}${timestamp}${this.userPwd}`)
				const data = await getLogin({
					username: this.userName,
					timestamp,
					auth,
					type: 1,
					veriCode: md5(this.userPwd)
				})
				this.$store.commit('SET_TOKEN',data.token)
				this.$store.commit('Authorization',auth)

				
					this.$router.push({
					path: '/home'
				})
			
			}
		},
	
	}
}
</script>

<style lang="scss" scoped>
.login-container {
	position: fixed;
	width: 100%;
	height: 100%;
	background: rgba(0, 134, 179, .5);
	background-image: url(../assets/img/bg-2.jpg);
	top: 0;
	left: 0;
	background-size: cover;
	background-repeat: none;
	z-index: 0;

}

.form {
	width: 460px;
    height: auto;
    background: rgb(10, 86, 150);
    margin: 50vh auto;
    padding: 35px 30px 25px;
    box-shadow: 0 0 9px rgba(255, 255, 255, 0.5);
    border-radius: 10px;
    transform: translateY(-50%);
}

.item {
	display: flex;
	align-items: center;
	margin-bottom: 25px;
	border-bottom: 1px solid #d3d7f7;

	i {
		color: #d3d7f7;
		margin-right: 10px;
	}
}

h2 {
	text-align: center;
	font-weight: normal;
	font-size: 26px;
	color: #d3d7f7;
	padding-bottom: 35px;
}

.input {
	font-size: 16px;
	line-height: 30px;
	width: 100%;
	color: #d3d7f7;
	outline: none;
	border: none;
	background-color: rgba(0, 0, 0, 0);
	padding: 10px 0;
}

.loginBtn {
	width: 100%;
	padding: 12px 0;
	border: 1px solid #d3d7f7;
	font-size: 16px;
	color: #d3d7f7;
	cursor: pointer;
	background: transparent;
	border-radius: 4px;
	margin-top: 10px;

	&:hover {
		color: #fff;
		background: #0090ff;
		border-color: #0090ff;
	}
}

.tip {
	font-size: 12px;
	padding-top: 20px;
}

input::-webkit-input-placeholder {
	color: #d3d7f7;
}

input::-moz-placeholder {
	/* Mozilla Firefox 19+ */
	color: #d3d7f7;
}

input:-moz-placeholder {
	/* Mozilla Firefox 4 to 18 */
	color: #d3d7f7;
}

input:-ms-input-placeholder {
	/* Internet Explorer 10-11 */
	color: #d3d7f7;
}
</style>
