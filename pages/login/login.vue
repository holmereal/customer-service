<template>
	<view class="content">
		<view class="main">
			<view class="box">
				<h3>客服服务系统</h3>
				<view class="user_name">
					<image src="../../static/user_icon.png" mode="aspectFit"></image>
					<input type="text" v-model="userName" placeholder="输入用户名">
				</view>
				<view class="user_password">
					<image src="../../static/password-icon.png" mode="aspectFit"></image>
					<input type="password" v-model="userPassword" placeholder="输入密码">
				</view>
				<!-- <view class="Remember">
					<van-checkbox v-model="checked" shape="square">记住账号密码</van-checkbox>
				</view> -->
				<view class="login_btn" @click="login()">
					<span>登录</span>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { Notify } from 'vant';
	import {login} from '../../api/http.js'
	export default {
		data() {
			return {
				checked: true,
				userName: '',
				userPassword: '',
				RememberUserPassword: ''
			};
		},
		methods:{
			login(){
				let password = this.$md5(this.userPassword)
				login(this.userName,password.toUpperCase()).then(res =>{
					console.log(res)
					Notify({ type: 'success', message: res.data.msg, className: 'MsgClass' });
					if(res.data.code == 0){
						localStorage.setItem('userToken',res.data.data.userToken)
						localStorage.setItem('userType',res.data.data.userType)
						localStorage.setItem('userId',res.data.data.userId)
						localStorage.setItem('iconUrl',res.data.data.iconUrl)
						localStorage.setItem('alias',res.data.data.alias)
						
						uni.navigateTo({
							url: '../index/index'
						})
					}else{
						Notify({ type: 'danger', message: res.data.msg, className: 'MsgClass' });
					}
				})
			}
		},
		mounted() {
			
		}
	}
</script>

<style lang="scss">
	.content{
		min-height: 100vh;
		background: url(../../static/login_bg.png) no-repeat;
		background-size: 100% 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		.main{
			height: 100%;
			.box{
				width: 469px;
				height: 422px;
				background: url(../../static/login_box.png) no-repeat;
				background-size: 100% 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				h3{
					font-size: 30px;
					font-family: Microsoft YaHei UI;
					font-weight: bold;
					color: #FFFFFF;
					text-align: center;
				}
				.user_name,.user_password{
					height: 50px;
					background: #FFFFFF;
					border-radius: 4px;
					display: flex;
					align-items: center;
					margin: 35px 48px 0;
					padding: 0 20px;
					image{
						width: 21px;
						height: 21px;
					}
					input{
						height: 50px;
						line-height: 50px;
						margin-left: 20px;
					}
				}
				.Remember{
					margin: 20px 48px 0;
				}
				.login_btn{
					height: 50px;
					background: #2778FF;
					border-radius: 25px;
					margin: 24px 48px 0;
					display: flex;
					justify-content: center;
					align-items: center;
					cursor: pointer;
					span{
						font-size: 16px;
						font-family: Microsoft YaHei UI;
						font-weight: 400;
						color: #FFFFFF;
					}
				}
			}
		}
	}
</style>
