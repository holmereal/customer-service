import axios from 'axios'

import { baseURL } from './url'
axios.defaults.baseURL = baseURL
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.headers.post['userId'] = localStorage.getItem('userId')
axios.defaults.headers.get['userId'] = localStorage.getItem('userId')
axios.defaults.headers.post['platform'] = 'web'
axios.defaults.headers.get['platform'] = 'web'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  axios.defaults.headers.get['userId'] = localStorage.getItem('userId')
  axios.defaults.headers.post['userId'] = localStorage.getItem('userId')
  return config;
}),
function (error) {
	return Promise.reject(error);
}

//客服登录  /chat/login
export function login(account,password){
	const url = baseURL + '/chat/login'
	let data = {account:account,password:password}
	
	return axios.post(url,data).then((res)=>{
		return Promise.resolve(res)
	})
}

//获得聊天消息列表  /chat/list
export function list(userId,filterName,pageNum,pageSize){
	const url = baseURL + '/chat/list'
	let data = {userId:userId,filterName:filterName,pageNum:pageNum,pageSize:pageSize}
	
	return axios.post(url,data).then((res)=>{
		return Promise.resolve(res)
	})
}

//获得聊天用户列表  /chat/user
export function user(userId,filterName,pageNum,pageSize){
	const url = baseURL + '/chat/user'
	let data = {userId:userId,filterName:filterName,pageNum:pageNum,pageSize:pageSize}
	
	return axios.post(url,data).then((res)=>{
		return Promise.resolve(res)
	})
}

//更新聊天设置  /chat/updateChatSetting
export function updateChatSetting(userId,targetId,obj){
	const url = baseURL + '/chat/updateChatSetting'
	let data = {userId:userId,targetId:targetId,divideId:obj.divideId,flagStar:obj.flagStar,flagDelete:obj.flagDelete,alias:obj.alias}
	
	return axios.post(url,data).then((res)=>{
		return Promise.resolve(res)
	})
}

//获得聊天记录  /chat/getChatMessage
export function getChatMessage(userId,targetId,pageNum,pageSize){
	const url = baseURL + '/chat/getChatMessage'
	let data = {userId:userId,targetId:targetId,pageNum:pageNum,pageSize:pageSize}
	
	return axios.post(url,data).then((res)=>{
		return Promise.resolve(res)
	})
}

//清空聊天记录  /chat/emptyChatMessage
export function emptyChatMessage(userId,targetId){
	const url = baseURL + '/chat/emptyChatMessage'
	let data = {userId:userId,targetId:targetId}
	
	return axios.post(url,data).then((res)=>{
		return Promise.resolve(res)
	})
}

//翻译文本  /chat/translateText
export function translateText(text,sourceLang,targetLang){
	const url = baseURL + '/chat/translateText'
	let data = {text:text,sourceLang:sourceLang,targetLang:targetLang}
	
	return axios.post(url,data).then((res)=>{
		return Promise.resolve(res)
	})
}

//消息屏蔽 /chat/shieldChatMessage
export function shieldChatMessage(id){
	const url = baseURL + '/chat/shieldChatMessage?id=' + id
	
	return axios.get(url).then((res)=>{
		return Promise.resolve(res)
	})
}

//获得表情 /emoticon/get
export function getemoticon(){
	const url = baseURL + '/emoticon/get'
	let data = {}
	
	return axios.get(url,data).then((res)=>{
		return Promise.resolve(res)
	})
}

//获得分组 /divide/get
export function getdivide(){
	const url = baseURL + '/divide/get'
	let data = {}
	
	return axios.get(url,data).then((res)=>{
		return Promise.resolve(res)
	})
}

//获得问答 /qa/get
export function getqa(x){
	const url = baseURL + '/qa/get?x=' + x
	
	return axios.get(url).then((res)=>{
		return Promise.resolve(res)
	})
}

//新增问答 /qa/insert
export function insertqa(x){
	const url = baseURL + '/qa/insert?x=' + x
	
	return axios.get(url).then((res)=>{
		return Promise.resolve(res)
	})
}

//删除问答 /qa/delete
export function deleteqa(id){
	const url = baseURL + '/qa/delete?id=' + id
	
	return axios.get(url).then((res)=>{
		return Promise.resolve(res)
	})
}

//文件上传 files/uploadFile
export function uploadFile(file,h,w){
	const url = baseURL + '/files/uploadFile'
	let data = {file:file,h:h,w:w}
	
	return axios.post(url,data).then((res)=>{
		return Promise.resolve(res)
	})
}