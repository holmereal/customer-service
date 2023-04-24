<template>
	<view class="content">
		<view class="menu">
			<view class="user">
				<view class="user_top">
					<view class="left">
						<image v-if="iconUrl == ''" src="../../static/Avatar.png" mode=""></image>
						<image v-else :src="iconUrl" mode=" scaleToFill"></image>
						<view class="text">
							<h3>{{alias}}</h3>
							<p>账号ID：{{userId || ''}}</p>
						</view>
					</view>
					<view class="right" @click="logout()">
						<image src="../../static/exit.png" mode="aspectFill"></image>
					</view>
				</view>
				<view class="user_tab">
					<view class="cell" :class="userTabNum == index? 'active':''" v-for="(item,index) in userTab" @click="ChatUserTab(index)">
						<span>{{item.name}}</span>
					</view>
					<view class="user_tab_line" :class="userTabNum == 0? 'user_tab_line_index-0':'user_tab_line_index-1'">
						
					</view>
				</view>
			</view>
			<view class="search">
				<image src="../../static/search-icon.png" mode="aspectFill"></image>
				<input type="text" placeholder-class="search_input" placeholder="Search" @input="searchMessage">
			</view>
			<view class="message_list" v-if="userTabNum == 0">
				<view class="box">
					<view class="cell" :class="lineNum == item.targetId? 'active':''" v-click-Message="closeMessageListRight" @contextmenu.prevent="showMessageList($event,item)" v-for="(item,index) in chatList" @click="getChatMessageList(item,index)">
						<view class="left">
							<image :src="item.thumbIconURL" mode=""></image>
						</view>
						<view class="right">
							<view class="name_time">
								<view class="name_time_left">	
									<p>{{item.mobile}}</p>
								</view>
								<view class="name_time_right">
									<!-- <image v-if="item.alias" src="../../static/Remark-icon.png" mode="aspectFit"></image> -->
									<span>{{item.ETime}}</span>
									
									<!-- <view class="Note_Content">
										<span>{{item.alias}}</span>
									</view> -->
								</view>
							</view>
							<view class="detail_icon">
								<p>{{item.message}}</p>
								<view class="label">
									<image v-if="item.flagStar == 1" src="../../static/label.png" mode="aspectFill"></image>
									<span v-if="item.unreadNum > 0">{{item.unreadNum}}</span>
								</view>
							</view>
						</view>
					</view>
				</view>
				
				<view class="messageList_RightClick" v-if="MessageListRightClickShow" id="RightClick_MessageList">
					<view class="cell" @click="messageListMark">
						<span v-if="updateChatList.flagStar == 0">标记</span>
						<span v-else>取消标记</span>
					</view>
					<view class="cell" @click="messageListRemark">
						<span>备注</span>
					</view>
					<view class="cell" @click="messageListDelete">
						<span>删除</span>
					</view>
				</view>
			</view>
			<view class="user_list message_list" v-else>
				<view class="list" v-for="item in ChatUserList">
					<view class="top" @click="item.Toggle = !item.Toggle">
						<img v-if="item.Toggle" src="../../static/down-icon.png" >
						<img v-else src="../../static/purple.png" >
						<p>{{item.name}}</p>
						<span>{{item.groupList.length}}</span>
					</view>
					<view class="box" v-if="item.Toggle">
						<view class="cell" :class="lineNum == item.targetId? 'active':''" v-click-User="closeUserListRight" @contextmenu.prevent="showUserList($event,item)" v-for="(item,index) in item.groupList" @click="getChatMessageList(item,index)">
							<view class="left">
								<image :src="item.thumbIconURL" mode=""></image>
							</view>
							<view class="right">
								<view class="name_time">
									<view class="name_time_left">
										<p>{{item.mobile}}</p>
									</view>
									<view class="name_time_right">
										<!-- <image v-if="item.alias" src="../../static/Remark-icon.png" mode="aspectFit"></image> -->
										<!-- <span>1分钟前</span> -->
										
										<!-- <view class="Note_Content">
											<span>{{item.alias}}</span>
										</view> -->
									</view>
								</view>
								<view class="detail_icon">
									<p>{{item.alias}}</p>
									<view class="label">
										<image v-if="item.flagStar == 1" src="../../static/label.png" mode="aspectFill"></image>
										<!-- <span v-if="item.unreadNum > 0">{{item.unreadNum}}</span> -->
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="messageList_RightClick" v-if="UserListRightClickShow" id="RightClick_UserList">
					<view class="cell" @click="messageListMark">
						<span v-if="updateChatList.flagStar == 0">标记</span>
						<span v-else>取消标记</span>
					</view>
					<view class="cell" @click="messageListRemark">
						<span>备注</span>
					</view>
					<view class="cell move">
						<span>移至</span>
						<view class="moveList">
							<view class="cell" v-for="item in moveList" @click="movement(item.id)">
								<span>{{item.name}}</span>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="main">
			<view class="chat_common">
				<view class="chat_box">
					<view class="chat_mobile">
						<view class="mobile">
							<p>{{CurrentUserInfo.mobile}}</p>
							<span v-if="CurrentUserInfo.alias != CurrentUserInfo.mobile">{{CurrentUserInfo.alias}}</span>
						</view>
						<view class="copy_mobile" id="code" :data-clipboard-text="CurrentUserInfo.mobile" @click="Copys('code')">
							<span>一键复制手机号</span>
						</view>
					</view>
					<view class="chat_dialog">
						<view class="dialog_list" id="dialog_list">
							<view class="dialog_cell" v-click-Chat="closeRightClick" @contextmenu.prevent="showSelectBox($event,item)" :class="userId == item.userId? 'myself':''" v-for="(item,index) in ChatMessageList">
								<view class="name">
									<image v-if="userId == item.userId && iconUrl == ''" src="../../static/Avatar.png" mode="scaleToFill"></image>
									<image v-if="userId == item.userId && iconUrl != ''" :src="iconUrl" mode="scaleToFill"></image>
									<image v-if="userId != item.userId && CurrentUserInfo.iconURL == ''" src="../../static/Avatar.png" mode=""></image>
									<image v-if="userId != item.userId && CurrentUserInfo.iconURL != ''" :src="CurrentUserInfo.iconURL" mode=""></image>
									<p v-if="userId == item.userId">{{alias}}</p>
									<p v-else>{{CurrentUserInfo.mobile}}</p>
									<span>{{item.ETime}}</span>
								</view>
								<view class="text" :class="item.messageType == 0? '':'emojiImage'">
									<p v-if="item.messageType == 0" style="white-space: pre-wrap;" v-html="item.message">{{item.message}}</p>
									<!-- <img v-if="item.messageType == 1 && item.emojiInfo" :src="item.emojiInfo.animURL" alt=""> -->
									<svga v-if="item.messageType == 1 && item.emojiInfo" id="canvas1" :src="item.emojiInfo.animURL" />
									<img class='imageInfo' :preview="targetId" v-if="item.messageType == 2 && item.imageInfo" :src="item.imageInfo.imageURL" alt="">
								</view>
								<view class="translateContent" v-if="item.translateMessage">
									<p>{{item.translateMessage}}</p>
								</view>
							</view>
							
							<view class="message_RightClick" v-if="RightClickShow" id="RightClick">
								<view class="RightClick_translate cell" v-if="RightClick_me.userId != userId" @click="MessageTranslate()">
									<span>翻译</span>
								</view>
								<view class="RightClick_retract cell" v-if="RightClick_me.userId == userId" @click="withdrawText()">
									<span>撤回</span>
								</view>
								<!-- <view class="RightClick_delete cell" v-if="RightClick_me.userId == userId">
									<span>删除</span>
								</view> -->
							</view>
						</view>
					</view>
					<view class="chat_inputbox">
						<view class="emoji">
							<view class="emojiTop">
								<image src="../../static/emoji-icon.png" v-click-Emoji="closeEmojiList" mode="aspectFill" @click="emojiListShow = !emojiListShow"></image>
								<van-uploader :after-read="afterRead">
									<image src="../../static/wenjian-icon.png" mode="aspectFill"></image>
								</van-uploader>
								<view class="emojiList" v-if="emojiListShow">
									<view class="cell" v-for="item in emoticonsList" @click="PickEmoji(item)">
										<image :src="item.emUrl" mode=""></image>
									</view>
								</view>
							</view>
						</view>
						<view class="inputbox">
							<!-- <view class="inputbox_body" contenteditable="true" v-model="message">
								
							</view> -->
							<textarea name="" cols="30" rows="10" maxlength="1000" id="drop_area" class="inputbox_body" @keydown.enter.exact="submit"
								@keydown.ctrl.enter="addNewLine" @keydown.meta.enter="addNewLine" v-model="message" placeholder="输入消息……"></textarea>
						</view>
						<view class="enter">
							<view class="translate" @click="TextTranslate()">
								<span>翻译为英语</span>
							</view>
							<view class="enter_btn" @click="SendMessages()">
								<span>发送</span>
							</view>
						</view>
					</view>
				</view>
				<view class="common_words">
					<view class="common_top">
						<span>常用语</span>
					</view>
					<view class="common_main">
						<view class="search">
							<image src="../../static/search-icon.png" mode="aspectFill"></image>
							<input type="text" placeholder-class="search_input" @input="searchPhrases" placeholder="Search">
						</view>
						<view class="words_box">
							<view class="words_list">
								<view class="words_cell" v-for="item in PhrasesList" @click="PickPhrases(item)">
									<p style="white-space: pre-wrap;" v-html="item.qa">{{item.qa}}</p>
									<image src="../../static/delete-icon.png" mode="aspectFill" @click.stop="DeletePhrases(item)"></image>
								</view>
							</view>
						</view>
						<view class="add_words" @click="wordsShow = true">
							<span>+添加常用语</span>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<van-popup v-model="wordsShow" :close-on-click-overlay="false" class="findGrab" :style="{width:'430px',height:'auto',background: '#FFFFFF',
		'border-radius': '10px',overflow:'hidden'}">
			<view class="addwords_box">
				<view class="title_close">
					<h3>添加常用语</h3>
					<image src="../../static/close-icon.png" mode="aspectFill" @click="wordsShow = false,Phrases = ''"></image>
				</view>
				<view class="addwords_input">
					<textarea name="" id="addwords" v-model="Phrases" cols="30" rows="10" maxlength="1000" @keydown.ctrl.enter="newlinePhrases" @keydown.meta.enter="newlinePhrases" placeholder="输入常用语~"></textarea>
				</view>
				<view class="addwords_btn">
					<view class="addwords_btn_quit" @click="wordsShow = false,Phrases = ''">
						<span>退出</span>
					</view>
					<view class="addwords_btn_sure" :class="addwords_not? 'notclick':''" @click="addPhrases()">
						<span>确定</span>
					</view>
				</view>
			</view>
		</van-popup>
		
		<van-popup v-model="RemarkShow" :close-on-click-overlay="false" class="findGrab" :style="{width:'385px',height:'auto',background: '#FFFFFF',
		'border-radius': '10px',overflow:'hidden'}">
			<view class="addwords_box">
				<view class="title_close">
					<h3>备注</h3>
					<image src="../../static/close-icon.png" mode="aspectFill" @click="RemarkShow = false"></image>
				</view>
				<view class="Remark_user">
					<image :src="updateChatList.thumbIconURL" mode=""></image>
					<p>{{updateChatList.mobile}}</p>
				</view>
				<view class="Remark_input">
					<textarea name="" id="" cols="30" rows="10" maxlength="30" v-model="RemarkName" placeholder="输入备注内容"></textarea>
				</view>
				<view class="addwords_btn">
					<view class="addwords_btn_quit" @click="RemarkShow = false">
						<span>退出</span>
					</view>
					<view class="addwords_btn_sure" :class="Remark_not? 'notclick':''" @click="RemarksModified">
						<span>确定</span>
					</view>
				</view>
			</view>
		</van-popup>
	</view>
</template>

<script>
	import protoRoot0 from '@/proto/C10000Msg.js'
	import protoRoot1 from '@/proto/C10001Msg.js'
	import protoRoot2 from '@/proto/C10002Msg.js'
	import axios from 'axios'
	import { baseURL } from '../../api/url.js'
	import { Notify } from 'vant';
	import Clipboard from 'clipboard'
	import { list,user,getChatMessage,getemoticon,getqa,insertqa,deleteqa,updateChatSetting,translateText,shieldChatMessage,getdivide,uploadFile } from '../../api/http.js'
	export default {
		data() {
			return {
				userTab: [
					{name:'消息'},{name:'用户'}
				],
				userTabNum: 0,
				lineNum: 0,
				wordsShow: false,
				RemarkShow: false,
				RemarkName: '',		//备注名称
				userId: localStorage.getItem('userId') || '',
				userType: localStorage.getItem('userType') || '',
				alias: localStorage.getItem('alias') || '',
				iconUrl: localStorage.getItem('iconUrl') || '',
				targetId: '',
				groupId: '',
				filterName: '',
				pageNum: 1,
				pageSize: 500,
				message: '',	//发送的消息
				chatList: [],		//聊天会话列表
				ChatUserList: [],	//聊天用户列表
				ChatMessageList: [],  //聊天内容列表
				emoticonsList: [],    //表情列表
				moveList: [],		//分组列表
				emojiListShow: false,
				EmojiUrl: '',		
				CurrentUserInfo: '',	//当前用户
				PhrasesList: [],	//常用语
				inputPhrases: '',
				Phrases: '',		//添加常用语
				imgUrl:'',		//发送图片
				RightClickShow: false,		//消息右键菜单
				RightClick_me: '',
				MessageListRightClickShow: false,
				UserListRightClickShow: false,
				updateChatList: '',			//右键菜单消息内容
				
				// wsUrl: '://cc.365-farm.com/visit', // 尼日基建 ws地址
				wsUrl: '://cc.globalfarmingweb.com/visit', // 伊拉克粮食
				websock: null, // ws实例
				timeoutObj:undefined,
				serverTimeoutObj:undefined,
				lockReconnect: false,
				
				addwords_not: false,
				Remark_not: false,
			}
		},
		created() {
			if (typeof (WebSocket) === 'undefined')
			  return console.log('您的浏览器不支持websocket')
			
			this.initWebSocket()
		},
		onShow() {
			
		},
		updated() {
			
		},
		watch: {
			ChatMessageList:{
				handler(newValue, oldValue) {
					if (newValue !== oldValue) {
						this.ChatMessageList = newValue
					}
				}
			}
		},
		directives: {
		  'click-Message': {
			bind: function(el, binding, vnode) {
			  el.clickOutsideEvent = function(event) {
				// 判断是否点击了 el 元素外部
				if (!(el === event.target || el.contains(event.target))) {
				  // 触发绑定的回调函数
				  vnode.context[binding.expression]();
				}
			  };
			  document.body.addEventListener('click', el.clickOutsideEvent);
			},
			unbind: function(el) {
			  document.body.removeEventListener('click', el.clickOutsideEvent);
			},
		  },
		  'click-User': {
			bind: function(el, binding, vnode) {
				el.clickOutsideEvent = function(event) {
					// 判断是否点击了 el 元素外部
					if (!(el === event.target || el.contains(event.target))) {
					  // 触发绑定的回调函数
					  vnode.context[binding.expression]();
					}
				};
				document.body.addEventListener('click', el.clickOutsideEvent);
			},
			unbind: function(el) {
				document.body.removeEventListener('click', el.clickOutsideEvent);
			},
		  },
		  'click-Chat': {
			  bind: function(el, binding, vnode) {
			  	el.clickOutsideEvent = function(event) {
			  		// 判断是否点击了 el 元素外部
			  		if (!(el === event.target || el.contains(event.target))) {
			  		  // 触发绑定的回调函数
			  		  vnode.context[binding.expression]();
			  		}
			  	};
			  	document.body.addEventListener('click', el.clickOutsideEvent);
			  },
			  unbind: function(el) {
			  	document.body.removeEventListener('click', el.clickOutsideEvent);
			  },
		  },
		  'click-Emoji': {
			bind: function(el, binding, vnode) {
				el.clickOutsideEvent = function(event) {
					// 判断是否点击了 el 元素外部
					if (!(el === event.target || el.contains(event.target))) {
					  // 触发绑定的回调函数
					  vnode.context[binding.expression]();
					}
				};
				document.body.addEventListener('click', el.clickOutsideEvent);
			},
			unbind: function(el) {
				document.body.removeEventListener('click', el.clickOutsideEvent);
			},
		  }
		},
		methods: {
			closeMessageListRight() {
				this.MessageListRightClickShow = false;
			},
			closeUserListRight(){
				this.UserListRightClickShow = false;
			},
			closeRightClick(){
				this.RightClickShow = false;
			},
			closeEmojiList(){
				this.emojiListShow = false;
			},
			ChatUserTab(i){
				this.userTabNum = i
				
				if(i == 0){
					this.getChatList()
				}else{
					this.getChatUserList()
				}
			},
			initWebSocket() {
				this.connectSocket()
				
				this.websock.onopen = (event) => {
					console.log('WebSocket 连接已建立');
					this.longstart();   // 成功建立连接后，创建心跳检测
					if (this.websock.readyState === 1){
						this.login();
					}else{
						setTimeout(() => { 
							this.login()
						}, 1000)
					}
				};
				
				this.websock.onmessage = async(msg) => {
					console.log('心跳重置')
				    this.longstart();
					try {
						//收到信息为Blob类型时
						let result = null;
						if (msg.data instanceof Blob) {
							const reader = new FileReader();
							reader.readAsArrayBuffer(msg.data);
							reader.onload = (e) => {
								//Uint8Array格式
								
								var code = new Uint8Array(reader.result)
								code = Array.from(code)
								const channel = this.toInt32(code.slice(0,4))
								const child = this.toInt16(code.slice(4,6))
								console.log('channel:',channel)
								console.log('child:',child)
								
								if(channel == 10000 && child == 1){
									//protobuf解码
									let testdata = protoRoot0.lookup("C100001s2c").decode(code.slice(6)); //decode数据
									console.log("testdata：", testdata);
									
									if(testdata.errCode == 0){
										clearTimeout(this.serverTimeoutObj)
										this.getChatList()
									}else{
										uni.reLaunch({
											url: '/pages/login/login'
										})
									}
								}else if(channel == 10001 && child == 2){
									//protobuf解码
									let reminder = protoRoot1.lookup("C100012s2c").decode(code.slice(6)); //decode数据
									console.log("reminder：", reminder);
									
									if(this.chatList.length == 0){
										this.getChatList()
									}else{
										this.chatList.forEach((res,i) =>{
											if(res.targetId == reminder.attachId){
												res.unreadNum ++;
												res.message = reminder.message
											}else{
												this.getChatList()
											}
										})
									}
								}else if(channel == 10002 && child == 0){
									//protobuf解码
									let testdata = protoRoot2.lookup("C100020s2c").decode(code.slice(6)); //decode数据
									console.log("testdata：", testdata);
									
									this.CurrentUserInfo = testdata.userInfo[0]
									this.chatList.forEach((res,i) =>{
										if(res.targetId == this.CurrentUserInfo.userId){
											res.unreadNum = 0
										}
									})
								}else if(channel == 10002 && child == 1){
									//protobuf解码
									let testdata = protoRoot2.lookup("C100021s2c").decode(code.slice(6)); //decode数据
									console.log("testdata：", testdata);
									if(testdata.errCode == 0){
										if(this.messageType == 0){
											var obj = {
												createTimestamp: (new Date().getTime() / 1000),
												isAction: 0,
												message: this.message,
												messageId: testdata.messageId,
												messageType: this.messageType,
												recordId: testdata.recordId,
												userId: this.userId
											}
											
											this.chatList.forEach((res,i) =>{
												if(res.targetId == testdata.targetId){
													res.message = obj.message
												}
											})
										}else if(this.messageType == 1){
											var obj = {
												createTimestamp: (new Date().getTime() / 1000),
												isAction: 0,
												message: this.message,
												messageId: testdata.messageId,
												messageType: this.messageType,
												recordId: testdata.recordId,
												userId: this.userId,
												emojiInfo: {
													animURL: this.EmojiUrl
												}
											}
											
											this.chatList.forEach((res,i) =>{
												if(res.targetId == testdata.targetId){
													res.message = '[Emoji]'
												}
											})
										}else if(this.messageType == 2){
											var obj = {
												createTimestamp: (new Date().getTime() / 1000),
												isAction: 0,
												message: this.message,
												messageId: testdata.messageId,
												messageType: this.messageType,
												recordId: testdata.recordId,
												userId: this.userId,
												imageInfo: {
													width: 100,
													height: 100,
													imageURL: this.imgUrl
												}
											}
											
											this.chatList.forEach((res,i) =>{
												if(res.targetId == testdata.targetId){
													res.message = '[Picture]'
												}
											})
										}
										
										this.ChatMessageList.push(obj)
										this.ChatMessageList.forEach(res =>{
											var Time = new Date(res.createTimestamp * 1000)
											var year = Time.getFullYear()
											var month = (Time.getMonth() + 1) < 10? "0" + (Time.getMonth() + 1) : (Time.getMonth() + 1)
											var day = Time.getDate() < 10 ?  "0" + Time.getDate() : Time.getDate()
											var hour = Time.getHours() < 10 ?  "0" + Time.getHours() : Time.getHours()
											var min = Time.getMinutes() < 10 ?  "0" + Time.getMinutes() : Time.getMinutes()
											var ETime = month + '/' + day + ' ' + hour + ':' + min
											
											this.$set(res,'ETime',ETime)
										})
										
										this.$nextTick(() =>{
											var ele = document.getElementById("dialog_list");
											console.log(ele.scrollHeight,ele.clientHeight)
											//判断元素是否出现了滚动条
											if(ele.scrollHeight > ele.clientHeight) {
												//设置滚动条到最底部
												ele.scrollTop = ele.scrollHeight;
											}
											
											this.message = ''
											this.emojiListShow = false
										})
									}else{
										Notify({ type: 'danger', message: testdata.errMsg, className: 'MsgClass' });
									}
								}else if(channel == 10002 && child == 2){
									//protobuf解码
									let testdata = protoRoot2.lookup("C100022s2c").decode(code.slice(6)); //decode数据
									console.log("testdata：", testdata);
									
									if(testdata.messageType == 0){
										var obj = {
											sort: testdata.sort,
											createTimestamp: testdata.createTime,
											isAction: testdata.isAction,
											message: testdata.message,
											messageId: testdata.messageId,
											messageType: testdata.messageType,
											recordId: testdata.recordId,
											userId: testdata.userId
										}
									
										this.chatList.forEach((res,i) =>{
											if(res.targetId == obj.userId){
												res.message = obj.message
											}
										})
									}else if(testdata.messageType == 1){
										var obj = {
											sort: testdata.sort,
											createTimestamp: testdata.createTime,
											isAction: testdata.isAction,
											message: testdata.message,
											messageId: testdata.messageId,
											messageType: testdata.messageType,
											recordId: testdata.recordId,
											userId: testdata.userId,
											emojiInfo: {
												emName: testdata.emojiInfo.emName,
												animURL: testdata.emojiInfo.animURL
											}
										}
										
										this.chatList.forEach((res,i) =>{
											if(res.targetId == obj.userId){
												res.message = '[Emoji]'
											}
										})
									}else if(testdata.messageType == 2){
										var obj = {
											sort: testdata.sort,
											createTimestamp: testdata.createTime,
											isAction: testdata.isAction,
											message: testdata.message,
											messageId: testdata.messageId,
											messageType: testdata.messageType,
											recordId: testdata.recordId,
											userId: testdata.userId,
											imageInfo: {
												width: testdata.imageInfo.width,
												height: testdata.imageInfo.height,
												imageURL: testdata.imageInfo.imageURL
											}
										}
										
										this.chatList.forEach((res,i) =>{
											if(res.targetId == obj.userId){
												res.message = '[Picture]'
											}
										})
									}
									
									this.ChatMessageList.push(obj)
									this.ChatMessageList.forEach(res =>{
										var Time = new Date(res.createTimestamp * 1000)
										var year = Time.getFullYear()
										var month = (Time.getMonth() + 1) < 10? "0" + (Time.getMonth() + 1) : (Time.getMonth() + 1)
										var day = Time.getDate() < 10 ?  "0" + Time.getDate() : Time.getDate()
										var hour = Time.getHours() < 10 ?  "0" + Time.getHours() : Time.getHours()
										var min = Time.getMinutes() < 10 ?  "0" + Time.getMinutes() : Time.getMinutes()
										var ETime = month + '/' + day + ' ' + hour + ':' + min
										
										this.$set(res,'ETime',ETime)
									})
									
									this.$nextTick(() =>{
										var ele = document.getElementById("dialog_list");
										//判断元素是否出现了滚动条
										if(ele.scrollHeight > ele.clientHeight) {
											//设置滚动条到最底部
											ele.scrollTop = ele.scrollHeight;
										}
									})
									
									
								}else if(channel == 10002 && child == 3){
									//protobuf解码
									
									this.ChatMessageList = []
									this.lineNum = 0
									this.CurrentUserInfo = []
								}else if(channel == 10002 && child == 5){
									//protobuf解码
									let testdata = protoRoot2.lookup("C100025s2c").decode(code.slice(6)); //decode数据
									console.log("testdata：", testdata);
									
									this.ChatMessageList.forEach((res,i) =>{
										if(res.recordId == testdata.recordId){
											this.ChatMessageList.splice(i,1)
										}
									})
								}
							}
						}
					} catch(err){
						return
					}
				}
			},
			connectSocket(){
				var protocol = 'ws'
				if (location.protocol === 'https:') {
					protocol = 'wss'
				}
				var url = ''
				url = protocol + this.wsUrl
				this.websock = this.createWebSocket(url)
				// 监听连接失败
				this.websock.onerror = () => {
					// 连接建立失败重连
					console.log('websocket连接断开')
					this.connectSocket()
				}
				// 监听连接关闭
				this.websock.onclose = () => {
					console.log('WebSocket连接已断开');
					if(!this.lockReconnect){
						this.reconnectWebSocket();
					}
				}
			},
			// 创建websocket对象
			createWebSocket(url) {
				console.log(url)
			     try{
			         if(window.WebSocket)
			             return new WebSocket(url);
			         if(window.MozWebSocket)
			             return new MozWebSocket(url);
			     } catch(e) {
			     }
			     return false;
			},
			websocketsend(Data) {
			  // 数据发送
			  this.websock.send(Data)
			},
			reconnectWebSocket() {
			    this.serverTimeoutObj = setTimeout(() => {
			      console.log('重新连接WebSocket');
			      this.initWebSocket();
			    }, 5000);
			},
			longstart(){
				clearInterval(this.timeoutObj)
				
				this.timeoutObj = setInterval(()=>{
					console.log('重置监测心跳')
				
					var channel = this.getInt32Bytes(10000)
					var child = this.getInt16Bytes(0)
					var userId = this.longToByteArray(this.userId)
					var attachId = this.longToByteArray(0)
					channel = Array.from(channel)
					child = Array.from(child)
					userId = Array.from(userId)
					attachId = Array.from(attachId)
					
					var messageCode = []
					messageCode.push(...channel,...child,...userId,...attachId)
					messageCode = new Uint8Array(messageCode)
					
					this.websocketsend(messageCode)
				},15000)
			},
			getUint8Array(len, setNum) {
				var buffer = new ArrayBuffer(len);  //指定字节长度
				setNum(new DataView(buffer));  //根据不同的类型调用不同的函数来写入数值
				return new Uint8Array(buffer); //创建一个字节数组，从缓存中拿取数据
			},
			getView(bytes) {
				var view = new DataView(new ArrayBuffer(bytes.length));
				for (var i = 0; i < bytes.length; i++) {
					view.setUint8(i, bytes[i]);
				}
				return view;
			},
			getInt16Bytes(num) {
				return this.getUint8Array(2, function (view) { view.setInt16(0, num); })
			},
			toInt16(bytes) {
				return this.getView(bytes).getInt16();
			},
			getInt32Bytes(num) {
				return this.getUint8Array(4, function (view) { view.setInt32(0, num); })
			},
			toInt32(bytes) {
				return this.getView(bytes).getInt32();
			},
			longToByteArray(num) {
			    // we want to represent the input as a 8-bytes array
			    var byteArray = [0, 0, 0, 0, 0, 0, 0, 0];
			
			    for ( var index = byteArray.length - 1; index >= 0 ; index -- ) {
			        var byte = num & 0xff;
			        byteArray [ index ] = byte;
			        num = (num - byte) / 256 ;
			    }
			
			    return byteArray;
			},
			byteArrayToLong(byteArray) {
			    var value = 0;
			    for ( var i = byteArray.length - 1; i >= 0; i--) {
			        value = (value * 256) + byteArray[i];
			    }
			
			    return value;
			},
			login(){
				console.log('1111')
				var channel = this.getInt32Bytes(10000)
				var child = this.getInt16Bytes(1)
				var userId = this.longToByteArray(this.userId)
				var attachId = this.longToByteArray(0)
				channel = Array.from(channel)
				child = Array.from(child)
				userId = Array.from(userId)
				attachId = Array.from(attachId)
				
				//protobuf转码
				let actions = {
					identity: this.userType,
					deviceId: localStorage.getItem('identificationNumber'),
					token: localStorage.getItem('userToken')
				}
				let testobj = protoRoot0.lookup("C100001c2s").create(actions);
				let testObjBuffer = protoRoot0.lookup("C100001c2s").encode(testobj).finish(); //encode数据
				testObjBuffer = Array.from(testObjBuffer)
				
				var messageCode = []
				messageCode.push(...channel,...child,...userId,...attachId,...testObjBuffer)
				messageCode = new Uint8Array(messageCode)
				
				this.websocketsend(messageCode)
			},
			leaveChat(){
				var channel = this.getInt32Bytes(10002)
				var child = this.getInt16Bytes(3)
				var userId = this.longToByteArray(this.userId)
				var attachId = this.longToByteArray(0)
				channel = Array.from(channel)
				child = Array.from(child)
				userId = Array.from(userId)
				attachId = Array.from(attachId)
				
				//protobuf转码
				let actions = {
					sort: 1,
					targetId: this.updateChatList.targetId,
					groupId: ''
				}
				let testobj = protoRoot0.lookup("C100023c2s").create(actions);
				let testObjBuffer = protoRoot0.lookup("C100023c2s").encode(testobj).finish(); //encode数据
				testObjBuffer = Array.from(testObjBuffer)
				
				var messageCode = []
				messageCode.push(...channel,...child,...userId,...attachId,...testObjBuffer)
				messageCode = new Uint8Array(messageCode)
				
				this.websocketsend(messageCode)
			},
			logout(){
				localStorage.removeItem('userToken')
				localStorage.removeItem('userType')
				localStorage.removeItem('userId')
				localStorage.removeItem('alias')
				localStorage.removeItem('iconUrl')
				this.lockReconnect = true
				clearInterval(this.timeoutObj)
				clearTimeout(this.serverTimeoutObj)
				this.websock.close();
				
				uni.reLaunch({
					url: '/pages/login/login'
				})
			},
			getChatList(){
				list(this.userId,this.filterName,this.pageNum,this.pageSize).then(res =>{
					if(res.data.code == 0){
						this.chatList = res.data.data.chatList
						
						this.chatList.forEach(res =>{
							let newTime = new Date(res.lastTimestamp * 1000)
							let localTime = new Date().getTime()
							let Time = new Date(localTime - (res.lastTimestamp * 1000))
							let day = Math.floor((Time) / (86400000))
							let hour = Math.floor((Time % 86400000) / 3600000);
							let min = Math.floor((Time % 3600000) / 60000);
							let sec = Math.floor((Time % 60000) / 1000);
							var ETime = ''
							
							if(min <= 0){
								ETime = "刚刚"
							}else if(min <= 60 && hour < 1){
								ETime = min + "分钟前"
							}else if(hour >= 1 && day < 1){
								ETime = hour + "小时前"
							}else if(day >= 1){
								ETime = day + "天前"
							}
							
							this.$set(res,'ETime',ETime)
						})
					}else if(res.data.code == 201){
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}else{
						Notify({ type: 'danger', message: res.data.msg, className: 'MsgClass' });
					}
				})
			},
			getChatUserList(){
				user(this.userId,this.filterName,this.pageNum,this.pageSize).then(res =>{
					if(res.data.code == 0){
						this.ChatUserList = res.data.data.groupList
						
						this.ChatUserList.forEach((res,index) =>{
							this.$set(res,'Toggle',false)
							if(index == 0){
								this.$set(res,'Toggle',true)
							}
						})
					}else{
						Notify({ type: 'danger', message: res.data.msg, className: 'MsgClass' });
					}
				})
			},
			getChatMessageList(e,i){
				this.lineNum = e.targetId
				this.targetId = e.targetId
				this.groupId = e.groupId
				getChatMessage(this.userId,this.targetId,this.pageNum,this.pageSize).then(res =>{
					if(res.data.code == 0){
						this.ChatMessageList = res.data.data.list.reverse()
						
						this.$nextTick(() =>{
							var ele = document.getElementById("dialog_list");
							//判断元素是否出现了滚动条
							if(ele.scrollHeight > ele.clientHeight) {
								//设置滚动条到最底部
								ele.scrollTop = ele.scrollHeight;
							}
						})
						
						this.$previewRefresh()
						
						this.ChatMessageList.forEach(res =>{
							var Time = new Date(res.createTimestamp * 1000)
							var year = Time.getFullYear()
							var month = (Time.getMonth() + 1) < 10? "0" + (Time.getMonth() + 1) : (Time.getMonth() + 1)
							var day = Time.getDate() < 10 ?  "0" + Time.getDate() : Time.getDate()
							var hour = Time.getHours() < 10 ?  "0" + Time.getHours() : Time.getHours()
							var min = Time.getMinutes() < 10 ?  "0" + Time.getMinutes() : Time.getMinutes()
							var ETime = month + '/' + day + ' ' + hour + ':' + min
							
							this.$set(res,'ETime',ETime)
						})
					}else{
						Notify({ type: 'danger', message: res.data.msg, className: 'MsgClass' });
					}
				})
				
				var channel = this.getInt32Bytes(10002)
				var child = this.getInt16Bytes(0)
				var userId = this.longToByteArray(this.userId)
				var attachId = this.longToByteArray(0)
				channel = Array.from(channel)
				child = Array.from(child)
				userId = Array.from(userId)
				attachId = Array.from(attachId)
				
				//protobuf转码
				let actions = {
					sort: 1,
					targetId: this.targetId,
					groupId: e.groupId
				}
				let testobj = protoRoot2.lookup("C100020c2s").create(actions);
				console.log("testobj:", testobj);
				let testObjBuffer = protoRoot2.lookup("C100020c2s").encode(testobj).finish(); //encode数据
				console.log("testObjBuffer:", testObjBuffer);
				testObjBuffer = Array.from(testObjBuffer)
				
				var messageCode = []
				messageCode.push(...channel,...child,...userId,...attachId,...testObjBuffer)
				messageCode = new Uint8Array(messageCode)
				
				this.websocketsend(messageCode)
			},
			submit(e) {
				if (window.event) {
					window.event.returnValue = false
				} else {
					e.preventDefault()
				}
				
			    this.SendMessages()
			},
			addNewLine(e) {
			  // 1.获取光标位置
			  // const ele = e.target
			  // const cursorIndex = ele.selectionStart
			  
			  const element = document.activeElement;
			  const cursorPosition = element.selectionStart;
		 
			  // 2.光标后加入换行符
			  let temp_text = this.message.split('')
			  temp_text.splice(cursorPosition, 0, '\n')
			  this.message = temp_text.join('')
		 
			  // 3.移动光标
			  this.$nextTick(() => {
				element.selectionStart = element.selectionEnd = cursorPosition + 1
			  })
			},
			SendMessages(){
				if(this.message == "" || this.message == null){
					Notify({ type: 'danger', message: '输入内容不能为空!', className: 'MsgClass' });
				}else{
					var channel = this.getInt32Bytes(10002)
					var child = this.getInt16Bytes(1)
					var userId = this.longToByteArray(this.userId)
					var attachId = this.longToByteArray(0)
					channel = Array.from(channel)
					child = Array.from(child)
					userId = Array.from(userId)
					attachId = Array.from(attachId)
					
					let time = new Date().getTime()
					//protobuf转码
					let actions = {
						sort: 1,
						targetId: this.CurrentUserInfo.userId,
						groupId: this.groupId,
						message: this.message,
						messageId: time + this.userId,
						messageType: this.messageType = 0,
					}
					let testobj = protoRoot2.lookup("C100021c2s").create(actions);
					console.log("testobj:", testobj);
					let testObjBuffer = protoRoot2.lookup("C100021c2s").encode(testobj).finish(); //encode数据
					console.log("testObjBuffer:", testObjBuffer);
					testObjBuffer = Array.from(testObjBuffer)
					
					var messageCode = []
					messageCode.push(...channel,...child,...userId,...attachId,...testObjBuffer)
					messageCode = new Uint8Array(messageCode)
					
					this.websocketsend(messageCode)
				}
			},
			searchMessage(event){
				this.filterName = event.target.value
				if(this.userTabNum == 0){
					this.getChatList()
				}else{
					this.getChatUserList()
				}
			},
			getPhrases(){
				//加载常用语
				getqa(this.inputPhrases).then(res =>{
					if(res.data.code == 0){
						this.PhrasesList = res.data.data
					}else{
						Notify({ type: 'danger', message: res.data.msg, className: 'MsgClass' });
					}
				})
			},
			newlinePhrases(){
				const element = document.activeElement;
				const cursorPosition = element.selectionStart;
						 
				// 2.光标后加入换行符
				let temp_text = this.Phrases.split('')
				temp_text.splice(cursorPosition, 0, '\n')
				this.Phrases = temp_text.join('')
						 
				// 3.移动光标
				this.$nextTick(() => {
					element.selectionStart = element.selectionEnd = cursorPosition + 1
				})
			},
			addPhrases(){
				if(/^\s*$/.test(this.Phrases)){
					Notify({ type: 'danger', message: '常用语不能为空', className: 'MsgClass' });
				}else{
					this.addwords_not = true
					const encodedParam = encodeURIComponent(this.Phrases);
					
					insertqa(encodedParam).then(res =>{
						if(res.data.code == 0){
							this.wordsShow = false
							this.getPhrases()
							this.Phrases = ''
							
							this.addwords_not = false
						}else{
							Notify({ type: 'danger', message: res.data.msg, className: 'MsgClass' });
							this.addwords_not = false
						}
					})
				}
			},
			searchPhrases(event){
				this.inputPhrases = event.target.value
				this.getPhrases()
			},
			PickPhrases(e){
				this.message = e.qa
			},
			DeletePhrases(e){
				deleteqa(e.id).then(res =>{
					if(res.data.code == 0){
						this.getPhrases()
					}else{
						Notify({ type: 'danger', message: res.data.msg, className: 'MsgClass' });
					}
				})
			},
			PickEmoji(e){
				var channel = this.getInt32Bytes(10002)
				var child = this.getInt16Bytes(1)
				var userId = this.longToByteArray(this.userId)
				var attachId = this.longToByteArray(0)
				channel = Array.from(channel)
				child = Array.from(child)
				userId = Array.from(userId)
				attachId = Array.from(attachId)
				
				this.EmojiUrl = e.dongUrl
				let time = new Date().getTime()
				//protobuf转码
				let actions = {
					sort: 1,
					targetId: this.CurrentUserInfo.userId,
					groupId: this.groupId,
					message: this.message,
					messageId: time + this.userId,
					messageType: this.messageType = 1,
					emojiInfo: {
						emName: e.emName,
						animURL: e.dongUrl
					}
				}
				let testobj = protoRoot2.lookup("C100021c2s").create(actions);
				console.log("testobj:", testobj);
				let testObjBuffer = protoRoot2.lookup("C100021c2s").encode(testobj).finish(); //encode数据
				console.log("testObjBuffer:", testObjBuffer);
				testObjBuffer = Array.from(testObjBuffer)
				
				var messageCode = []
				messageCode.push(...channel,...child,...userId,...attachId,...testObjBuffer)
				messageCode = new Uint8Array(messageCode)
				
				this.websocketsend(messageCode)
			},
			afterRead(file) {
				const that = this
				console.log(file.file)
				// var str = this.dataURItoBlob(file.content)
				
				const formData = new FormData()
				formData.append('file', file.file)
				let imgUrl = baseURL + '/files/uploadFile'
				console.log(formData.get('file'));
				let config = {
					headers: {
						"Content-Type": "multipart/form-data",
						//因为我的请求内容只有file，如果formdata复杂的话，建议参考上面的链接
						// transformRequest: [file => file]
					}
				};
				axios.post(imgUrl, formData, config).then((res) => {
					if(res.data.code == 0){
						console.log(res)
						
						var channel = that.getInt32Bytes(10002)
						var child = that.getInt16Bytes(1)
						var userId = that.longToByteArray(that.userId)
						var attachId = that.longToByteArray(0)
						channel = Array.from(channel)
						child = Array.from(child)
						userId = Array.from(userId)
						attachId = Array.from(attachId)
						
						that.imgUrl = res.data.data.picUrl
						let time = new Date().getTime()
						//protobuf转码
						let actions = {
							sort: 1,
							targetId: that.CurrentUserInfo.userId,
							groupId: that.groupId,
							message: that.message,
							messageId: time + that.userId,
							messageType: that.messageType = 2,
							imageInfo: {
								imageURL: (res.data.data.id).toString(),
								imageExt: 'net'
							}
						}
						let testobj = protoRoot2.lookup("C100021c2s").create(actions);
						console.log("testobj:", testobj);
						let testObjBuffer = protoRoot2.lookup("C100021c2s").encode(testobj).finish(); //encode数据
						testObjBuffer = Array.from(testObjBuffer)
						console.log("testObjBuffer:", testObjBuffer);
						
						var messageCode = []
						messageCode = channel.concat(child,userId,attachId,testObjBuffer);
						messageCode = new Uint8Array(messageCode)
						console.log(messageCode)
						
						that.websocketsend(messageCode)
					}else{
						Notify({ type: 'danger', message: res.data.msg, className: 'MsgClass' });
					}
				})
				
				// if(['png','jpeg','jpg'].includes(str.type.split('/')[1])){
				// 	var reader = new FileReader();
				// 	let imgResult = ''
				// 	reader.readAsArrayBuffer(str);
					
				// 	reader.onload = function() {
				// 		imgResult = new Uint8Array((reader.result))
				// 		console.log(imgResult)
						
				// 		var channel = that.getInt32Bytes(10002)
				// 		var child = that.getInt16Bytes(1)
				// 		var userId = that.longToByteArray(that.userId)
				// 		var attachId = that.longToByteArray(0)
				// 		channel = Array.from(channel)
				// 		child = Array.from(child)
				// 		userId = Array.from(userId)
				// 		attachId = Array.from(attachId)
						
				// 		that.imgUrl = file.content
				// 		let time = new Date().getTime()
				// 		//protobuf转码
				// 		let actions = {
				// 			sort: 1,
				// 			targetId: that.CurrentUserInfo.userId,
				// 			groupId: that.groupId,
				// 			message: that.message,
				// 			messageId: time + that.userId,
				// 			messageType: that.messageType = 2,
				// 			imageInfo: {
				// 				width: 100,
				// 				height: 100,
				// 				imageURL: imgResult,
				// 				imageExt: net
				// 			}
				// 		}
				// 		let testobj = protoRoot2.lookup("C100021c2s").create(actions);
				// 		console.log("testobj:", testobj);
				// 		let testObjBuffer = protoRoot2.lookup("C100021c2s").encode(testobj).finish(); //encode数据
				// 		testObjBuffer = Array.from(testObjBuffer)
				// 		console.log("testObjBuffer:", testObjBuffer);
						
				// 		var messageCode = []
				// 		messageCode = channel.concat(child,userId,attachId,testObjBuffer);
				// 		messageCode = new Uint8Array(messageCode)
				// 		console.log(messageCode)
						
				// 		that.websocketsend(messageCode)
				// 	}
				// }else{
				// 	Notify({ type: 'danger', message: 'The upload format is incorrect!', className: 'MsgClass' });
				// }
			},
			dataURItoBlob(base64Data) {
			    //console.log(base64Data);//data:image/png;base64,
			    var byteString;
			    if(base64Data.split(',')[0].indexOf('base64') >= 0)
			        byteString = atob(base64Data.split(',')[1]);//base64 解码
			    else{
			        byteString = unescape(base64Data.split(',')[1]);
			    }
			    var mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];//mime类型 -- image/png
				
			    // var arrayBuffer = new ArrayBuffer(byteString.length); //创建缓冲数组
			    // var ia = new Uint8Array(arrayBuffer);//创建视图
			    var ia = new Uint8Array(byteString.length);//创建视图
			    for(var i = 0; i < byteString.length; i++) {
			        ia[i] = byteString.charCodeAt(i);
			    }
			    var blob = new Blob([ia], {
			        type: mimeString
			    });
			    return blob;
			},
			Copys(e){
				let id = '#' + e;
				var clipboard = new Clipboard(id)
				clipboard.on('success', e => {
				 Notify({ type: 'success', message: 'Copy succeeded!', className: 'MsgClass' });
				 // 释放内存
				 clipboard.destroy()
				})
				clipboard.on('error', e => {
				 // 不支持复制
				 console.log('该浏览器不支持自动复制')
				 // 释放内存
				 clipboard.destroy()
				})
			},
			showMessageList(event,item) {
				event.preventDefault();
				
				// 显示选择框
				this.MessageListRightClickShow = true;
				
				this.updateChatList = item
				console.log(this.updateChatList)
				
				this.$nextTick(() =>{
					if(this.MessageListRightClickShow){
						const selectionBox = document.getElementById('RightClick_MessageList');
						selectionBox.style.top = `${event.clientY}px`;
						selectionBox.style.left = `${event.clientX}px`;
					}
				})
			},
			showUserList(event,item) {
				event.preventDefault();
				
				// 显示选择框
				this.UserListRightClickShow = true;
				
				this.updateChatList = item
				console.log(this.updateChatList)
				
				this.$nextTick(() =>{
					if(this.UserListRightClickShow){
						const selectionBox = document.getElementById('RightClick_UserList');
						selectionBox.style.top = `${event.clientY}px`;
						selectionBox.style.left = `${event.clientX}px`;
					}
				})
			},
			showSelectBox(event,item) {
				event.preventDefault();
				
				this.RightClick_me = item
				console.log(this.RightClick_me)
				// 显示选择框
				this.RightClickShow = true;
				
				this.$nextTick(() =>{
					if(this.RightClickShow){
						const selectionBox = document.getElementById('RightClick');
						selectionBox.style.top = `${event.clientY}px`;
						selectionBox.style.left = `${event.clientX}px`;
					}
				})
			},
			MessageTranslate(){
				//翻译
				var sourceLang = 'en'
				var targetLang = 'zh_cn'
				translateText(this.RightClick_me.message,sourceLang,targetLang).then(res =>{
					if(res.data.code == 0){
						this.ChatMessageList.forEach((e,index) =>{
							if(e.messageId == this.RightClick_me.messageId){
								console.log(index)
								this.$set(e,'translateMessage',res.data.data)
							}
						})
					}else{
						Notify({ type: 'danger', message: res.data.msg, className: 'MsgClass' });
					}
				})
			},
			TextTranslate(){
				//翻译
				var sourceLang = 'zh_cn'
				var targetLang = 'en'
				translateText(this.message,sourceLang,targetLang).then(res =>{
					if(res.data.code == 0){
						this.message = res.data.data
					}else{
						Notify({ type: 'danger', message: res.data.msg, className: 'MsgClass' });
					}
				})
			},
			withdrawText(){
				//撤回
				shieldChatMessage(this.RightClick_me.recordId).then(res =>{
					if(res.data.code == 0){
						this.ChatMessageList.forEach((res,i) =>{
							if(res.recordId == this.RightClick_me.recordId){
								this.ChatMessageList.splice(i,1)
								this.RightClickShow = !this.RightClickShow;
							}
						})
					}else{
						Notify({ type: 'danger', message: res.data.msg, className: 'MsgClass' });
					}
				})
			},
			messageListMark(){
				if(this.updateChatList.flagStar == 0){
					var obj = {
						flagStar: 1
					}
				}else{
					var obj = {
						flagStar: 0
					}
				}
				updateChatSetting(this.userId,this.updateChatList.targetId,obj).then(res =>{
					if(res.data.code == 0){
						this.MessageListRightClickShow = false
						this.UserListRightClickShow = false
						this.getChatList()
						this.getChatUserList()
					}else{
						Notify({ type: 'danger', message: res.data.msg, className: 'MsgClass' });
					}
				})
			},
			messageListRemark(){
				this.MessageListRightClickShow = false
				this.UserListRightClickShow = false
				this.RemarkShow = true
				
				this.RemarkName = this.updateChatList.alias
			},
			messageListDelete(){
				let obj = {
					flagDelete: 1	
				}
				updateChatSetting(this.userId,this.updateChatList.targetId,obj).then(res =>{
					if(res.data.code == 0){
						this.MessageListRightClickShow = false
						this.UserListRightClickShow = false
						this.getChatList()
						this.getChatUserList()
						
						this.leaveChat()
					}else{
						Notify({ type: 'danger', message: res.data.msg, className: 'MsgClass' });
					}
				})
			},
			movement(id){
				let obj = {
					divideId: id
				}
				updateChatSetting(this.userId,this.updateChatList.targetId,obj).then(res =>{
					if(res.data.code == 0){
						this.MessageListRightClickShow = false
						this.UserListRightClickShow = false
						this.getChatList()
						this.getChatUserList()
					}else{
						Notify({ type: 'danger', message: res.data.msg, className: 'MsgClass' });
					}
				})
			},
			RemarksModified(){
				let obj = {
					alias: this.RemarkName
				}
				this.Remark_not = true
				updateChatSetting(this.userId,this.updateChatList.targetId,obj).then(res =>{
					if(res.data.code == 0){
						this.RemarkShow = false
						this.Remark_not = false
						this.getChatList()
						this.getChatUserList()
					}else{
						this.Remark_not = false
						Notify({ type: 'danger', message: res.data.msg, className: 'MsgClass' });
					}
				})
			},
			dropEvent(e) {
				const that = this
			    const file = e.dataTransfer.files[0];
				console.log(file)
			    e.preventDefault();
			    const formData = new FormData()
			    formData.append('file', file)
			    let imgUrl = baseURL + '/files/uploadFile'
			    console.log(formData.get('file'));
				Notify({ type: 'danger', message: '已发送,等待上传', className: 'MsgClass' });
			    let config = {
			    	headers: {
			    		"Content-Type": "multipart/form-data",
			    		//因为我的请求内容只有file，如果formdata复杂的话，建议参考上面的链接
			    		// transformRequest: [file => file]
			    	}
			    };
			    axios.post(imgUrl, formData, config).then((res) => {
			    	if(res.data.code == 0){
			    		console.log(res)
			    		
			    		var channel = that.getInt32Bytes(10002)
			    		var child = that.getInt16Bytes(1)
			    		var userId = that.longToByteArray(that.userId)
			    		var attachId = that.longToByteArray(0)
			    		channel = Array.from(channel)
			    		child = Array.from(child)
			    		userId = Array.from(userId)
			    		attachId = Array.from(attachId)
			    		
			    		that.imgUrl = res.data.data.picUrl
			    		let time = new Date().getTime()
			    		//protobuf转码
			    		let actions = {
			    			sort: 1,
			    			targetId: that.CurrentUserInfo.userId,
			    			groupId: that.groupId,
			    			message: that.message,
			    			messageId: time + that.userId,
			    			messageType: that.messageType = 2,
			    			imageInfo: {
			    				imageURL: (res.data.data.id).toString(),
			    				imageExt: 'net'
			    			}
			    		}
			    		let testobj = protoRoot2.lookup("C100021c2s").create(actions);
			    		console.log("testobj:", testobj);
			    		let testObjBuffer = protoRoot2.lookup("C100021c2s").encode(testobj).finish(); //encode数据
			    		testObjBuffer = Array.from(testObjBuffer)
			    		console.log("testObjBuffer:", testObjBuffer);
			    		
			    		var messageCode = []
			    		messageCode = channel.concat(child,userId,attachId,testObjBuffer);
			    		messageCode = new Uint8Array(messageCode)
			    		console.log(messageCode)
			    		
			    		that.websocketsend(messageCode)
			    	}else{
			    		Notify({ type: 'danger', message: res.data.msg, className: 'MsgClass' });
			    	}
			    })
			}
		},
		mounted() {
			this.websock.onerror = () => {
			    console.log('WebSocket连接出现错误');
			    this.reconnectWebSocket();
			};
			
			var ele = document.getElementById("dialog_list");
			//判断元素是否出现了滚动条
			if(ele.scrollHeight > ele.clientHeight) {
				//设置滚动条到最底部
				ele.scrollTop = ele.scrollHeight;
			}
			
			let dropArea = document.getElementById('drop_area');
			dropArea.addEventListener("drop", this.dropEvent, false);
			dropArea.addEventListener("dragleave", (e) => {
			    e.preventDefault();
			    // this.dropActive = false;
			}, false);
			dropArea.addEventListener("dragenter", (e) => {
			    e.preventDefault();
			    // this.dropActive = true;
			}, false);
			dropArea.addEventListener("dragover", (e) => {
			    e.preventDefault();
			    // this.dropActive = true;
			}, false);
			
			//加载表情
			getemoticon().then(res =>{
				if(res.data.code == 0){
					this.emoticonsList = res.data.data
				}else{
					Notify({ type: 'danger', message: res.data.msg, className: 'MsgClass' });
				}
			})
			
			//获得分组
			getdivide().then(res =>{
				if(res.data.code == 0){
					this.moveList = res.data.data
				}else{
					Notify({ type: 'danger', message: res.data.msg, className: 'MsgClass' });
				}
			})
			
			this.getPhrases()
		},
		// 组件销毁时，关闭与服务器的连接
		beforeDestroy() {
			this.lockReconnect = true
			clearInterval(this.timeoutObj)
			this.websock.close();
		}
	}
</script>

<style lang="scss">
	#canvas,#canvas1{
		width: 100px !important;
		height: 100px !important;
	}
	.content {
		display: flex;
		background-color: #F7F7F7;
		max-height: 100vh;
		min-height: 100vh;
		overflow: hidden;
		.search{
			height: 34px;
			margin: 15px 15px 0;
			padding: 0 16px;
			background: #F5F9FC;
			border: 1px solid #F2F5F7;
			border-radius: 17px;
			display: flex;
			align-items: center;
			image{
				width: 17px;
				height: 17px;
			}
			input{
				margin-left: 10px;
				font-size: 14px;
				line-height: 34px;
			}
			.search_input{
				font-size: 14px;
				font-family: Microsoft YaHei UI;
				font-weight: 400;
				color: #999999;
			}
		}
		.menu{
			width: 339px;
			background: #FFFFFF;
			display: flex;
			flex-direction: column;
			margin-right: 1px;
			.user{
				border-bottom: 1px solid #F7F7F7;
				min-height: 158px;
				.user_top{
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 20px 25px 40px;
					.left{
						display: flex;
						align-items: center;
						image{
							width: 60px;
							height: 60px;
							border-radius: 30px;
						}
						.text{
							margin-left: 15px;
							h3{
								font-size: 16px;
								font-family: Microsoft YaHei UI;
								font-weight: bold;
								color: #333333;
								line-height: 19px;
							}
							p{
								font-size: 14px;
								font-family: Microsoft YaHei UI;
								font-weight: 400;
								color: #333333;
								line-height: 19px;
								margin-top: 14px;
							}
						}
					}
					.right{
						image{
							cursor: pointer;
							width: 24px;
							height: 24px;
						}
					}
				}
				.user_tab{
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin: 0 40px;
					position: relative;
					.cell{
						flex: 1;
						text-align: center;
						cursor: pointer;
						span{
							display: inline-block;
							font-size: 14px;
							font-family: Microsoft YaHei UI;
							font-weight: 400;
							color: #333333;
							padding-bottom: 22px;
						}
					}
					.active{
						span{
							font-weight: bold;
							// border-bottom: 3px solid #4E8DFF;
						}
					}
					.user_tab_line{
						position: absolute;
						bottom: 0;
						left: calc(50% * var(--index) - 25% - 28px / 2);
						width: 28px;
						height: 3px;
						background: #4E8DFF;
						transition: 0.35s ease;
					}
					.user_tab_line_index-0 {
					  --index: 1;
					}
					.user_tab_line_index-1 {
					  --index: 2;
					}
				}
			}
			.message_list{
				margin-top: 15px;
				flex: 1;
				overflow-y: overlay;
				overflow: auto;
				z-index: 99;
				&:hover{
					&::-webkit-scrollbar-thumb {
					  border: 2px solid rgba(0, 0, 0, 0);
					  border-radius: 100px;
					  background-clip: padding-box;
					  background-color: rgba(0, 0, 0, 0.15);
					}
				}
			  
				&::-webkit-scrollbar {
				  width: 10px;
				  height: 10px;
				  border-radius: 100px;
				  background-color: rgba(0, 0, 0, 0);
				}
			  
				&::-webkit-scrollbar:hover {
				  background-color: rgba(0, 0, 0, 0.09);
				}
			  
				&::-webkit-scrollbar-thumb:active {
				  border-radius: 100px;
				  background: rgba(0, 0, 0, 0.61);
				}
			  
				/* add vertical min-height & horizontal min-width */
				&::-webkit-scrollbar-thumb:vertical {
				  min-height: 10px;
				}
			  
				&::-webkit-scrollbar-thumb:horizontal {
				  min-width: 10px;
				}
				.box{
					.cell{
						height: 80px;
						padding: 0 20px;
						display: flex;
						align-items: center;
						justify-content: space-between;
						cursor: pointer;
						.left{
							image{
								width: 36px;
								height: 36px;
								background: #000000;
								border-radius: 50%;
							}
						}
						.right{
							flex: 1;
							display: flex;
							flex-direction: column;
							margin-left: 16px;
							overflow:hidden;
							.name_time{
								display: flex;
								justify-content: space-between;
								align-items: center;
								width: 100%;
								.name_time_left{
									p{
										font-size: 14px;
										font-family: Microsoft YaHei UI;
										font-weight: bold;
										color: #333333;
									}
								}
								.name_time_right{
									display: flex;
									align-items: center;
									position: relative;
									image{
										width: 14px;
										height: 14px;
									}
									& > span{
										font-size: 12px;
										font-family: Microsoft YaHei UI;
										font-weight: 400;
										color: #999999;
										margin-left: 15px;
									}
									.Note_Content{
										display: none;
										position: absolute;
										top: 20px;
										left: -50%;
										z-index: 99;
										padding: 9px 16px;
										background: rgba(4, 7, 12, 0.8);
										border-radius: 6px;
										span{
											font-size: 12px;
											font-family: Microsoft YaHei UI;
											font-weight: 400;
											color: #FFFFFF;
											line-height: 19px;
										}
									}
									image:hover ~ .Note_Content{
										display: block;
									}
								}
							}
							.detail_icon{
								display: flex;
								justify-content: space-between;
								align-items: center;
								width: 100%;
								margin-top: 10px;
								p{
									font-size: 12px;
									font-family: Microsoft YaHei UI;
									font-weight: 400;
									color: #666666;
									width: 70%;
									white-space: nowrap;
									text-overflow: ellipsis;
									overflow: hidden;
								}
								.label{
									display: flex;
									justify-content: flex-end;
									align-items: center;
									width: 20%;
									image{
										width: 15px;
										height: 15px;
									}
									span{
										display: block;
										text-align: center;
										width: 16px;
										height: 16px;
										line-height: 16px;
										background: #1762D4;
										border-radius: 50%;
										font-size: 12px;
										font-family: Microsoft YaHei UI;
										font-weight: 400;
										color: #FFFFFF;
										margin-left: 20px;
									}
								}
							}
						}
					}
					.active{
						background: #F6FAFF;
						border-left: 4px solid #2062C5;
					}
				}
				.messageList_RightClick{
					position: fixed;
					top: 0;
					left: 0;
					display: flex;
					flex-direction: column;
					min-width: 42px;
					height: auto;
					background: #FFFFFF;
					box-shadow: 0px 2px 5px 0px rgba(17,32,54,0.13);
					border-radius: 4px;
					cursor: pointer;
					.cell{
						flex: 1;
						padding: 0 15px;
						text-align: center;
						line-height: 43px;
						border-top: 1px solid #DEDEDF;
						span{
							font-size: 14px;
							font-family: Microsoft YaHei UI;
							font-weight: 400;
							color: #333333;
						}
						&:first-child{
							border-top: 0;
						}
						&:hover{
							background: #F6FAFF;
							span{
								color: #4288EE;
							}
						}
					}
					.move{
						position: relative;
						.moveList{
							min-width: 100px;
							line-height: 87px;
							position: absolute;
							top: 0;
							left: 100%;
							background: #FFFFFF;
							box-shadow: 0px 2px 5px 0px rgba(17,32,54,0.13);
							border-radius: 4px;
							display: none;
							flex-direction: column;
							.cell{
								span{
									color: #333333;
								}
								&:hover{
									background: #F6FAFF;
									span{
										color: #4288EE;
									}
								}
							}
						}
					}
					.move:hover{
						.moveList{
							display: flex;
						}
					}
				}
			}
			.user_list{
				position: relative;
				padding-bottom: 70px;
				.list{
					overflow: hidden;
					.top{
						display: flex;
						align-items: center;
						padding: 0 15px;
						margin: 20px 0 10px;
						cursor: pointer;
						img{
							max-width: 12px;
							max-height: 12px;
						}
						p{
							font-size: 14px;
							font-family: Microsoft YaHei UI;
							font-weight: 400;
							color: #333333;
							margin: 0 10px;
						}
						span{
							font-size: 14px;
							font-family: Arial;
							font-weight: 400;
							color: #333333;
						}
					}
				}
			}
		}
		.main{
			flex: 1;
			height: 100vh;
			display: flex;
			flex-direction: column;
			.chat_common{
				flex: 1;
				display: flex;
				height: calc(100% - 77px);
				justify-content: space-between;
				margin-top: 1px;
				.chat_box{
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					.chat_mobile{
						height: 80px;
						background: #FFFFFF;
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 0 13px 0 24px;
						.mobile{
							flex: 1;
							overflow: hidden;
							p{
								font-size: 20px;
								font-family: Microsoft YaHei UI;
								font-weight: bold;
								color: #333333;
							}
							span{
								display: block;
								font-size: 16px;
								font-family: Microsoft YaHei UI;
								font-weight: 400;
								color: #666666;
								margin-top: 5px;
							}
						}
						.copy_mobile{
							width: 117px;
							height: 34px;
							background: #4E8DFF;
							border-radius: 4px;
							text-align: center;
							line-height: 34px;
							cursor: pointer;
							margin-left: 20px;
							span{
								font-size: 14px;
								font-family: Microsoft YaHei UI;
								font-weight: 400;
								color: #FFFFFF;
							}
						}
					}
					.chat_dialog{
						flex: 3;
						overflow: hidden;
						.dialog_list{
							height: 100%;
							overflow-y: overlay;
							overflow: auto;
							z-index: 99;
							&:hover{
								&::-webkit-scrollbar-thumb {
								  border: 2px solid rgba(0, 0, 0, 0);
								  border-radius: 100px;
								  background-clip: padding-box;
								  background-color: rgba(0, 0, 0, 0.15);
								}
							}
										  
							&::-webkit-scrollbar {
							  width: 10px;
							  height: 10px;
							  border-radius: 100px;
							  background-color: rgba(0, 0, 0, 0);
							}
										  
							&::-webkit-scrollbar:hover {
							  background-color: rgba(0, 0, 0, 0.09);
							}
										  
							&::-webkit-scrollbar-thumb:active {
							  border-radius: 100px;
							  background: rgba(0, 0, 0, 0.61);
							}
										  
							/* add vertical min-height & horizontal min-width */
							&::-webkit-scrollbar-thumb:vertical {
							  min-height: 10px;
							}
										  
							&::-webkit-scrollbar-thumb:horizontal {
							  min-width: 10px;
							}
							.dialog_cell{
								margin: 35px 30px;
								display: flex;
								flex-direction: column;
								align-items: flex-start;
								.name{
									display: flex;
									align-items: center;
									image{
										width: 36px;
										height: 36px;
										border-radius: 50%;
									}
									p{
										font-size: 14px;
										font-family: Microsoft YaHei UI;
										font-weight: bold;
										color: #333333;
										margin: 0 14px;
									}
									span{
										font-size: 13px;
										font-family: Arial;
										font-weight: 400;
										color: #999999;
										direction: initial;
									}
								}
								.text{
									background: #FFFFFF;
									border-radius: 10px;
									padding: 24px 28px;
									margin: 17px 93px 0 6px;
									p{
										font-size: 14px;
										font-family: Source Han Sans CN;
										font-weight: 400;
										color: #333333;
										line-height: 24px;
										word-break: break-all;
									}
									img{
										max-width: 100px;
										width: 100%;
										max-height: 100px;
									}
									.imageInfo{
										max-width: 200px;
										width: 100%;
										max-height: 200px;
										cursor: pointer;
									}
								}
								.emojiImage{
									background: transparent;
									padding: 0;
								}
								.translateContent{
									background: #ebe3e3;
									border-radius: 10px;
									padding: 24px 28px;
									margin: 17px 93px 0 6px;
									p{
										font-size: 14px;
										font-family: Source Han Sans CN;
										font-weight: 400;
										color: #333333;
										line-height: 24px;
									}
								}
							}
							.myself{
								align-items: flex-end;
								.name{
									direction: rtl;
								}
								.text{
									background: #4288EE;
									margin: 17px 6px 0 93px;
									p{
										color: #FFFFFF;
									}
								}
								.emojiImage{
									background: transparent;
									padding: 0;
								}
							}
							.message_RightClick{
								position: fixed;
								top: 0;
								left: 0;
								display: flex;
								flex-direction: column;
								width: 66px;
								height: auto;
								background: #FFFFFF;
								box-shadow: 0px 5px 6px 0px rgba(106,112,118,0.06);
								border-radius: 4px;
								padding: 0 8px;
								cursor: pointer;
								.cell{
									flex: 1;
									text-align: center;
									line-height: 43px;
									border-top: 1px solid #DEDEDF;
									span{
										font-size: 14px;
										font-family: Microsoft YaHei UI;
										font-weight: 400;
										color: #333333;
									}
									&:first-child{
										border-top: 0;
									}
								}
							}
						}
					}
					.chat_inputbox{
						// flex: 1;
						height: 212px;
						background: #FFFFFF;
						display: flex;
						flex-direction: column;
						.emoji{
							.emojiTop{
								display: flex;
								align-items: center;
								padding: 12px 0;
								position: relative;
								image{
									width: 18px;
									height: 18px;
									margin-left: 18px;
									cursor: pointer;
								}
							}
							.emojiList{
								background: #FFFFFF;
								position: absolute;
								bottom: calc(100% + 10px);
								left: 10px;
								width: 300px;
								height: auto;
								display: flex;
								flex-wrap: wrap;
								.cell{
									cursor: pointer;
									width: 50px;
									height: 50px;
									image{
										display: block;
										width: 50px;
										height: 50px;
										margin-left: 0;
									}
								}
							}
						}
						.inputbox{
							flex: 1;
							background: #FFFFFF;
							display: flex;
							justify-content: center;
							align-items: center;
							.inputbox_body{
								width: 94%;
								height: 90%;
								background: #FFFFFF;
							}
						}
						.enter{
							display: flex;
							justify-content: space-between;
							align-items: center;
							margin: 10px 0;
							.translate{
								width: 88px;
								height: 34px;
								border: 1px solid #D0D2D3;
								border-radius: 4px;
								text-align: center;
								line-height: 34px;
								cursor: pointer;
								span{
									font-size: 14px;
									font-family: Microsoft YaHei UI;
									font-weight: 400;
									color: #4E8DFF;
								}
							}
							.enter_btn{
								width: 88px;
								height: 34px;
								background: #4E8DFF;
								border-radius: 4px;
								text-align: center;
								line-height: 34px;
								cursor: pointer;
								span{
									font-size: 14px;
									font-family: Microsoft YaHei UI;
									font-weight: 400;
									color: #FFFFFF;
								}
							}
						}
					}
				}
				.common_words{
					width: 354px;
					display: flex;
					flex-direction: column;
					margin-left: 1px;
					.common_top{
						height: 80px;
						background: #FFFFFF;
						display: flex;
						align-items: flex-end;
						span{
							font-size: 20px;
							font-family: Microsoft YaHei UI;
							font-weight: bold;
							color: #333333;
							display: inline-block;
							border-bottom: 2px solid #4E8DFF;
							margin-left: 24px;
							padding-bottom: 18px;
						}
					}
					.common_main{
						flex: 1;
						background: #FFFFFF;
						margin-top: 1px;
						.words_box{
							max-height: 500px;
							background: #F5F9FC;
							margin: 12px 15px 0;
							padding: 20px 12px;
							overflow-y: overlay;
							overflow: auto;
							z-index: 99;
							&:hover{
								&::-webkit-scrollbar-thumb {
								  border: 2px solid rgba(0, 0, 0, 0);
								  border-radius: 100px;
								  background-clip: padding-box;
								  background-color: rgba(0, 0, 0, 0.15);
								}
							}
										  
							&::-webkit-scrollbar {
							  width: 10px;
							  height: 10px;
							  border-radius: 100px;
							  background-color: rgba(0, 0, 0, 0);
							}
										  
							&::-webkit-scrollbar:hover {
							  background-color: rgba(0, 0, 0, 0.09);
							}
										  
							&::-webkit-scrollbar-thumb:active {
							  border-radius: 100px;
							  background: rgba(0, 0, 0, 0.61);
							}
										  
							/* add vertical min-height & horizontal min-width */
							&::-webkit-scrollbar-thumb:vertical {
							  min-height: 10px;
							}
										  
							&::-webkit-scrollbar-thumb:horizontal {
							  min-width: 10px;
							}
							.words_list{
								.words_cell{
									display: flex;
									justify-content: space-between;
									align-items: center;
									background: #FFFFFF;
									padding: 12px 13px;
									border-radius: 4px;
									margin-bottom: 10px;
									cursor: pointer;
									p{
										flex: 1;
										font-size: 13px;
										font-family: Microsoft YaHei UI;
										font-weight: 400;
										color: #333333;
										line-height: 19px;
										word-break: break-all;
									}
									image{
										width: 18px;
										height: 18px;
										margin-left: 15px;
									}
								}
							}
						}
						.add_words{
							width: 163px;
							height: 34px;
							background: #4E8DFF;
							border-radius: 4px;
							margin: 25px auto 0;
							text-align: center;
							line-height: 34px;
							cursor: pointer;
							span{
								font-size: 13px;
								font-family: Microsoft YaHei UI;
								font-weight: 400;
								color: #FFFFFF;
							}
						}
					}
				}
			}
		}
	}
	
	.addwords_box{
		.title_close{
			padding: 10px 20px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #E5E5E5;
			h3{
				font-size: 16px;
				font-family: Microsoft YaHei UI;
				font-weight: 400;
				color: #333333;
			}
			image{
				width: 19px;
				height: 19px;
				cursor: pointer;
			}
		}
		.Remark_user{
			display: flex;
			flex-direction: column;
			align-items: center;
			image{
				width: 46px;
				height: 46px;
				background-color: #000000;
				border-radius: 50%;
				margin: 8px 0;
			}
			p{
				font-size: 14px;
				font-family: Arial;
				font-weight: 400;
				color: #333333;
			}
		}
		.Remark_input{
			padding: 0 20px;
			textarea{
				width: calc(100% - 24px);
				height: 54px;
				margin-top: 8px;
				background: #FFFFFF;
				border: 1px solid #DEDEDF;
				border-radius: 4px;
				padding: 13px 12px 18px;
				line-height: 24px;
			}
		}
		.addwords_input{
			padding: 0 20px;
			input{
				height: 34px;
				background: #FAF9F9;
				border: 1px solid #D9D9D9;
				border-radius: 4px;
				margin: 28px 0 0;
				padding: 0 10px;
			}
			textarea{
				width: calc(100% - 24px);
				height: 133px;
				margin-top: 8px;
				background: #FAF9F9;
				border-radius: 4px;
				padding: 13px 12px 18px;
				line-height: 24px;
			}
		}
		.addwords_btn{
			margin: 20px 0 25px;
			display: flex;
			justify-content: center;
			align-items: center;
			.addwords_btn_quit{
				width: 114px;
				height: 34px;
				background: #FFFFFF;
				border: 1px solid #DEDEDF;
				border-radius: 4px;
				text-align: center;
				line-height: 34px;
				cursor: pointer;
				span{
					font-size: 14px;
					font-family: Source Han Sans CN;
					font-weight: 500;
					color: #666666;
				}
			}
			.addwords_btn_sure{
				width: 114px;
				height: 34px;
				background: #4E8DFF;
				border-radius: 4px;
				text-align: center;
				line-height: 34px;
				margin-left: 14px;
				cursor: pointer;
				span{
					font-size: 14px;
					font-family: Source Han Sans CN;
					font-weight: 500;
					color: #0FFFFF;
				}
			}
			.notclick{
				pointer-events: none;
			}
		}
	}
</style>
