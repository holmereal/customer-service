<template>
	<view class="content">
		<image class="logo" src="/static/logo.png" @click="login()"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>

<script>
	import protoRoot from '@/proto/C10000Msg.js'
	import protobuf from 'protobufjs'
	export default {
		data() {
			return {
				title: 'Hello',
				wsUrl: '://cc.365-farm.com/visit', // ws地址
				websock: null, // ws实例
				timeoutObj:undefined,
				serverTimeoutObj:undefined,
				lockReconnect: false,
				userId: localStorage.getItem('userId') || '',
				userType: localStorage.getItem('userType') || '',
			}
		},
		onLoad() {

		},
		created() {
			if (typeof (WebSocket) === 'undefined')
			  return console.log('您的浏览器不支持websocket')
			
			this.initWebSocket()
		},
		methods: {
			initWebSocket() {
				this.connectSocket()
				
				this.websock.onopen = this.websocketonopen()
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
								console.log('websocked收到', reader.result);
								console.log(new Uint8Array(reader.result))
								
								var code = new Uint8Array(reader.result)
								code = Array.from(code)
								const channel = this.toInt32(code.slice(0,4))
								const child = this.toInt16(code.slice(4,6))
								console.log('channel:',channel)
								console.log('child:',child)
								
								if(channel == 10000 && child == 0){
									
								}else{
									//protobuf解码
									let testdata = protoRoot.lookup("C100001s2c").decode(code.slice(6)); //decode数据
									console.log("testdata：", testdata);
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
				this.websock = new WebSocket(url)
				// 监听连接失败
				this.websock.onerror = this.websocketonerror()
				// 监听连接关闭
				this.websock.onclose = this.websocketclose()
			},
			websocketonopen() {
			  // 连接建立之后执行send方法发送数据
			  console.log('已经连通了websocket')
			  this.longstart();   // 成功建立连接后，创建心跳检测
			  // this.login();
			},
			websocketonerror() {
			  // 连接建立失败重连
			  console.log('websocket连接断开')
			  // this.initWebSocket()
			},
			websocketclose(e) {
			  // 关闭
			  console.log('断开连接', e)
			  if(this.lockReconnect){
				this.initWebSocket()
			  }
			},
			longstart(){
				clearInterval(this.timeoutObj)
				clearTimeout(this.serverTimeoutObj)
				
				this.timeoutObj = setInterval(()=>{
					console.log('重置监测心跳')
				
					var channel = this.getInt32Bytes(10000)
					var child = this.getInt16Bytes(0)
					var userId = this.longToByteArray(0)
					var attachId = this.longToByteArray(0)
					channel = Array.from(channel)
					child = Array.from(child)
					userId = Array.from(userId)
					attachId = Array.from(attachId)
					
					var messageCode = []
					messageCode.push(...channel,...child,...userId,...attachId)
					messageCode = new Uint8Array(messageCode)
					
					this.websock.send(messageCode)
					this.serverTimeoutObj = setTimeout(() =>{
						this.lockReconnect = true
						console.log("后台挂掉，没有心跳了....");
						console.log("打印websocket的地址:"+this.websock);
						this.websock.close();
					},2000)
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
				let testobj = protoRoot.lookup("C100001c2s").create(actions);
				console.log("testobj:", testobj);
				let testObjBuffer = protoRoot.lookup("C100001c2s").encode(testobj).finish(); //encode数据
				console.log("testObjBuffer:", testObjBuffer);
				testObjBuffer = Array.from(testObjBuffer)
				
				var messageCode = []
				messageCode.push(...channel,...child,...userId,...attachId,...testObjBuffer)
				messageCode = new Uint8Array(messageCode)
				
				this.websock.send(messageCode)
			}
		},
		mounted() {
			// this.initWebSocket()
		},
		// 组件销毁时，关闭与服务器的连接
		destroyed () {
			this.lockReconnect = false
			// 组件销毁时，关闭与服务器的连接
			if (this.socketio) {
				this.socketio.close() // 离开路由之后断开websocket连接
			}
			clearInterval(this.timeoutObj)
			clearTimeout(this.serverTimeoutObj)
		},
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
