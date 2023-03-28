import axios from 'axios'
// import qs from 'qs'
import sha1 from 'sha1'
import md5 from 'js-md5';
import {baseURL, account, dateTime, tokenSign, userInfo, secretKey} from './url'
axios.defaults.baseURL = baseURL
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.headers.common["Authorization"] =
  "Bearer " + window.localStorage.getItem("AccessToken");
axios.defaults.headers.post['Accept-Language'] = window.localStorage.getItem('lang') || 'en'
axios.defaults.headers.get['Accept-Language'] = window.localStorage.getItem('lang') || 'en'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  config.headers.Authorization =
    "Bearer " + window.localStorage.getItem("AccessToken");
  return config;
}),
function (error) {
	return Promise.reject(error);
}

//首页播报  /api/Core/HomeBroadcast
export function HomeBroadcast(){
	const url = baseURL + '/api/Core/HomeBroadcast'
	let parameter = Object.assign(userInfo(),tokenSign());
	
	return axios.post(url, parameter).then((res)=>{
		return Promise.resolve(res)
	})
}

//获取产品列表  /api/Core/GetProductList
export function GetProductList(){
	const url = baseURL + '/api/Core/GetProductList'
	let parameter = Object.assign(userInfo(),tokenSign());
	
	return axios.post(url, parameter).then((res)=>{
		return Promise.resolve(res)
	})
}

//获取产品详情  /api/Core/GetProductDetail
export function GetProductDetail(ID){
	const url = baseURL + '/api/Core/GetProductDetail'
	let baseData = {id: ID}
	let parameter = Object.assign({data:baseData},userInfo(),tokenSign(JSON.stringify(baseData)));
	
	return axios.post(url, parameter).then((res)=>{
		return Promise.resolve(res)
	})
}

//获取分享产品详情  /api/Core/GetShareProductDetail
export function GetShareProductDetail(ID){
	const url = baseURL + '/api/Core/GetShareProductDetail'
	let baseData = {id: ID}
	let parameter = Object.assign({data:baseData},userInfo(),tokenSign(JSON.stringify(baseData)));
	
	return axios.post(url, parameter).then((res)=>{
		return Promise.resolve(res)
	})
}

//获取可用优惠券 需登录  /api/Core/GetAvailableCoupon
export function GetAvailableCoupon(ID){
	const url = baseURL + '/api/Core/GetAvailableCoupon'
	let baseData = {id: ID}
	let parameter = Object.assign({data:baseData},userInfo(),tokenSign(JSON.stringify(baseData)));
	
	return axios.post(url, parameter).then((res)=>{
		return Promise.resolve(res)
	})
}

//投资  /api/Core/Invest
export function Invest(ID,Quantity,Money,CouponID){
	const url = baseURL + '/api/Core/Invest'
	let baseData = {id: ID,quantity:Quantity,money:Money,couponid:CouponID}
	let parameter = Object.assign({data:baseData},userInfo(),tokenSign(JSON.stringify(baseData)));
	
	return axios.post(url, parameter).then((res)=>{
		return Promise.resolve(res)
	})
}

//我的订单  /api/Core/GetMyOrderList
export function GetMyOrderList(OrderStatus){
	const url = baseURL + '/api/Core/GetMyOrderList'
	let baseData = {orderstatus: OrderStatus}
	let parameter = Object.assign({data:baseData},userInfo(),tokenSign(JSON.stringify(baseData)));
	
	return axios.post(url, parameter).then((res)=>{
		return Promise.resolve(res)
	})
}

//订单详情  /api/Core/GetOrderDetailInfo
export function GetOrderDetailInfo(OrderNumber){
	const url = baseURL + '/api/Core/GetOrderDetailInfo'
	let baseData = {ordernumber: OrderNumber}
	let parameter = Object.assign({data:baseData},userInfo(),tokenSign(JSON.stringify(baseData)));
	
	return axios.post(url, parameter).then((res)=>{
		return Promise.resolve(res)
	})
}

//领取收益  /api​/Core​/ReceiveIncome
export function ReceiveIncome(OrderNumber,CurrentReceive){
	const url = baseURL + '/api/Core/ReceiveIncome'
	let baseData = {ordernumber: OrderNumber,currentreceive:CurrentReceive}
	let parameter = Object.assign({data:baseData},userInfo(),tokenSign(JSON.stringify(baseData)));
	
	return axios.post(url, parameter).then((res)=>{
		return Promise.resolve(res)
	})
}

//支付配置  /api/Pay/GetPayConfig
export function GetPayConfig(){
	const url = baseURL + '/api/Pay/GetPayConfig'
	let parameter = Object.assign(userInfo(),tokenSign());
	
	return axios.post(url, parameter).then((res)=>{
		return Promise.resolve(res)
	})
}

//用户充值 需登录  /api/Pay/Deposit
export function Deposit(ID,Money,ActRemark){
	const url = baseURL + '/api/Pay/Deposit'
	let baseData = {id: ID,money:Money,actremark:ActRemark}
	let parameter = Object.assign({data:baseData},userInfo(),tokenSign(JSON.stringify(baseData)));
	
	return axios.post(url, parameter).then((res)=>{
		return Promise.resolve(res)
	})
}

//模块信息  /api/System/GetModuleManageList
export function GetModuleManageList(ModuleType,RegChannel){
	const url = baseURL + '/api/System/GetModuleManageList'
	let baseData = {moduletype: ModuleType}
	let parameter = Object.assign({data:baseData},userInfo(RegChannel),tokenSign(JSON.stringify(baseData)));
	
	return axios.post(url, parameter).then((res)=>{
		return Promise.resolve(res)
	})
}

//更新模块点击数  /api/System/UpdateClickCount
export function UpdateClickCount(ModuleID){
	const url = baseURL + '/api/System/UpdateClickCount'
	let baseData = {moduleid: ModuleID}
	let parameter = Object.assign({data:baseData},userInfo(),tokenSign(JSON.stringify(baseData)));
	
	return axios.post(url, parameter).then((res)=>{
		return Promise.resolve(res)
	})
}

//获取评论列表  /api/User/GetCommentList
export function GetCommentList(PagedIndex,PagedSize){
	const url = baseURL + '/api/User/GetCommentList'
	let baseData = {pagedindex: PagedIndex,pagedsize:PagedSize}
	let parameter = Object.assign({data:baseData},userInfo(),tokenSign(JSON.stringify(baseData)));
	
	return axios.post(url, parameter).then((res)=>{
		return Promise.resolve(res)
	})
}

//发布评论  /api/User/PostComments
export function PostComments(Comments,ImgUrls){
	const url = baseURL + '/api/User/PostComments'
	let baseData = {comments: Comments,imgurls:ImgUrls}
	let parameter = Object.assign({data:baseData},userInfo(),tokenSign(JSON.stringify(baseData)));
	
	return axios.post(url, parameter).then((res)=>{
		return Promise.resolve(res)
	})
}