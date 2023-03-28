import axios from 'axios'
import qs from 'qs'
import sha1 from 'sha1'
import md5 from 'js-md5';
import { baseURL, tokenSign, userInfo } from './url'
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

//发送短信验证码  /api/User/SendSmsCode
export function SendSmsCode(Email,Mobile,VType){
	const url = baseURL + '/api/User/SendSmsCode'
	let baseData = {email:Email,mobile: Mobile,vtype:VType}
	let parameter = Object.assign({data:baseData},userInfo(),tokenSign(JSON.stringify(baseData)));
	
	return axios.post(url, parameter).then((res)=>{
		return Promise.resolve(res)
	})
}

//发送邮箱  /api/User/SendEmail
export function SendEmail(Email,Mobile,VType){
	const url = baseURL + '/api/User/SendEmail'
	let baseData = {email: Email,mobile: Mobile,vtype:VType}
	let parameter = Object.assign({data:baseData},userInfo(),tokenSign(JSON.stringify(baseData)));
	
	return axios.post(url, parameter).then((res)=>{
		return Promise.resolve(res)
	})
}

//注册  /api/User/Register
export function Register(NickName,Email,Mobile,Password,VerifyCode,InviteCode){
	const url = baseURL + '/api/User/Register'
	let baseData = {nickname:NickName,email:Email,mobile:Mobile,password:Password,verifycode:VerifyCode,invitecode:InviteCode}
	let parameter = Object.assign({data:baseData},userInfo(),tokenSign(JSON.stringify(baseData)));
	
	return axios.post(url, parameter).then((res)=>{
		return Promise.resolve(res)
	})
}

//登陆  /api/User/Login
export function Login(Email,Mobile,Password){
	const url = baseURL + '/api/User/Login'
	let baseData = {email:Email,mobile:Mobile,password:Password}
	let parameter = Object.assign({data:baseData},userInfo(),tokenSign(JSON.stringify(baseData)));
	
	return axios.post(url, parameter).then((res)=>{
		return Promise.resolve(res)
	})
}

//更新访问令牌(同时也更新刷新令牌)  /api/User/UpdateAccessToken
export function UpdateAccessToken(AccessToken,RefreshToken){
	const url = baseURL + '/api/User/UpdateAccessToken'
	let baseData = {accesstoken: AccessToken,refreshtoken:RefreshToken}
	let parameter = Object.assign({data:baseData},userInfo(),tokenSign(JSON.stringify(baseData)));
	
	return axios.post(url, parameter).then((res)=>{
		return Promise.resolve(res)
	})
}

//设置登录密码  /api/User/SetPassword
export function SetPassword(Email,Mobile,Password,VerifyCode){
	const url = baseURL + '/api/User/SetPassword'
	let baseData = {email:Email,mobile:Mobile,password:Password,verifycode:VerifyCode}
	let parameter = Object.assign({data:baseData},userInfo(),tokenSign(JSON.stringify(baseData)));
	
	return axios.post(url, parameter).then((res)=>{
		return Promise.resolve(res)
	})
}

//设置支付密码  /api/User/SetPassword2
export function SetPassword2(Email,Mobile,Password,VerifyCode){
	const url = baseURL + '/api/User/SetPassword2'
	let baseData = {email:Email,mobile:Mobile,password:Password,verifycode:VerifyCode}
	let parameter = Object.assign({data:baseData},userInfo(),tokenSign(JSON.stringify(baseData)));
	
	return axios.post(url, parameter).then((res)=>{
		return Promise.resolve(res)
	})
}

//获取用户基本信息 需登录  /api/User/GetUserInfo
export function GetUserInfo () {
	const url = baseURL + '/api/User/GetUserInfo'
	let parameter = Object.assign(userInfo(),tokenSign());
	
	return axios.post(url, parameter).then((res)=>{
		return Promise.resolve(res)
	})
}

//修改用户基本信息  /api​/User​/EditUserInfo
export function EditUserInfo(NickName,HeadUrl,Whatsapp,Telegram){
	const url = baseURL + '/api/User/EditUserInfo'
	let baseData = {nickname:NickName,headurl: HeadUrl,whatsapp:Whatsapp,telegram:Telegram}
	let parameter = Object.assign({data:baseData},userInfo(),tokenSign(JSON.stringify(baseData)));
	
	return axios.post(url, parameter).then((res)=>{
		return Promise.resolve(res)
	})
}

//获取用户资产信息 需登录  /api/User/GetUserAssetInfo
export function GetUserAssetInfo () {
	const url = baseURL + '/api/User/GetUserAssetInfo'
	let parameter = Object.assign(userInfo(),tokenSign());
	
	return axios.post(url, parameter).then((res)=>{
		return Promise.resolve(res)
	})
}

//获取所有的银行信息  /api/System/GetBankListAll
export function GetBankListAll(){
	const url = baseURL + '/api/System/GetBankListAll'
	let parameter = Object.assign(userInfo(),tokenSign());
	
	return axios.post(url, parameter).then((res)=>{
		return Promise.resolve(res)
	})
}

//获取银行卡列表 /api/Pay/GetUserBankList
export function GetUserBankList () {
	const url = baseURL + '/api/Pay/GetUserBankList'
	let parameter = Object.assign(userInfo(),tokenSign());
	
	return axios.post(url, parameter).then((res)=>{
		return Promise.resolve(res)
	})
}

//添加银行卡信息 需登录  /api/Pay/AddUserBankInfo
export function AddUserBankInfo(BankCode,BankCardNumber,Kvs,ID){
	const url = baseURL + '/api/Pay/AddUserBankInfo'
	let baseData = {bankcode:BankCode,bankcardnumber:BankCardNumber,kvs:Kvs,id:ID}
	let parameter = Object.assign({data:baseData},userInfo(),tokenSign(JSON.stringify(baseData)));
	
	return axios.post(url, parameter).then((res)=>{
		return Promise.resolve(res)
	})
}

//删除银行卡信息 需登录  /api​/Pay​/DeleteUserBank
export function DeleteUserBank(ID){
	const url = baseURL + '/api/Pay/DeleteUserBank'
	let baseData = {id:ID}
	let parameter = Object.assign({data:baseData},userInfo(),tokenSign(JSON.stringify(baseData)));
	
	return axios.post(url, parameter).then((res)=>{
		return Promise.resolve(res)
	})
}

//用户提款 需登录	/api/Pay/Withdraw
export function Withdraw(ID,Money,Password,ISure){
	const url = baseURL + '/api/Pay/Withdraw'
	let baseData = {id:ID,money:Money,password:Password,isure:ISure}
	let parameter = Object.assign({data:baseData},userInfo(),tokenSign(JSON.stringify(baseData)));
	
	return axios.post(url, parameter).then((res)=>{
		return Promise.resolve(res)
	})
}

//用户提款撤回 需登录  /api/Pay/WithdrawCancel
export function WithdrawCancel(ID){
	const url = baseURL + '/api/Pay/WithdrawCancel'
	let baseData = {id:ID}
	let parameter = Object.assign({data:baseData},userInfo(),tokenSign(JSON.stringify(baseData)));
	
	return axios.post(url, parameter).then((res)=>{
		return Promise.resolve(res)
	})
}

//获取用户流水 需登录  /api/User/GetUserFlowList
export function GetUserFlowList(OperatorType,PagedIndex,PagedSize){
	const url = baseURL + '/api/User/GetUserFlowList'
	let baseData = {operatortype:OperatorType,pagedindex:PagedIndex,pagedsize:PagedSize}
	let parameter = Object.assign({data:baseData},userInfo(),tokenSign(JSON.stringify(baseData)));
	
	return axios.post(url, parameter).then((res)=>{
		return Promise.resolve(res)
	})
}

//签到 需登录  /api/Activity/SigninHandle
export function SigninHandle (IsSure) {
	const url = baseURL + '/api/Activity/SigninHandle'
	let baseData = {issure:IsSure}
	let parameter = Object.assign({data:baseData},userInfo(),tokenSign(JSON.stringify(baseData)));
	
	return axios.post(url, parameter).then((res)=>{
		return Promise.resolve(res)
	})
}

//获取资讯列表  /api/Activity/GetNewsList
export function GetNewsList(NewsType,PagedIndex,PagedSize){
	const url = baseURL + '/api/Activity/GetNewsList'
	let baseData = {newstype:NewsType,pagedindex:PagedIndex,pagedsize:PagedSize}
	let parameter = Object.assign({data:baseData},userInfo(),tokenSign(JSON.stringify(baseData)));
	
	return axios.post(url, parameter).then((res)=>{
		return Promise.resolve(res)
	})
}

//获取资讯详情  /api/Activity/GetNewsDetailInfo
export function GetNewsDetailInfo (ID) {
	const url = baseURL + '/api/Activity/GetNewsDetailInfo'
	let baseData = {id:ID}
	let parameter = Object.assign({data:baseData},userInfo(),tokenSign(JSON.stringify(baseData)));
	
	return axios.post(url, parameter).then((res)=>{
		return Promise.resolve(res)
	})
}

//获取我的团队信息 需登录  /api/Team/GetTeamInfo
export function GetTeamInfo () {
	const url = baseURL + '/api/Team/GetTeamInfo'
	let parameter = Object.assign(userInfo(),tokenSign());
	
	return axios.post(url, parameter).then((res)=>{
		return Promise.resolve(res)
	})
}

//获取抽奖奖项  /api/Activity/GetPrizeList
export function GetPrizeList () {
	const url = baseURL + '/api/Activity/GetPrizeList'
	let parameter = Object.assign(userInfo(),tokenSign());
	
	return axios.post(url, parameter).then((res)=>{
		return Promise.resolve(res)
	})
}

//抽奖操作  /api/Activity/LuckyDraw
export function LuckyDraw () {
	const url = baseURL + '/api/Activity/LuckyDraw'
	let parameter = Object.assign(userInfo(),tokenSign());
	
	return axios.post(url, parameter).then((res)=>{
		return Promise.resolve(res)
	})
}

//分页获取抽奖记录  /api/Activity/GetPrizeRecord
export function GetPrizeRecord (PagedIndex,PagedSize) {
	const url = baseURL + '/api/Activity/GetPrizeRecord'
	let baseData = {pagedindex:PagedIndex,pagedsize:PagedSize}
	let parameter = Object.assign({data:baseData},userInfo(),tokenSign(JSON.stringify(baseData)));
	
	return axios.post(url, parameter).then((res)=>{
		return Promise.resolve(res)
	})
}

//分页获取用户优惠券  /api/Activity/GetCouponList
export function GetCouponList (Status,PagedIndex,PagedSize) {
	const url = baseURL + '/api/Activity/GetCouponList'
	let baseData = {status:Status,pagedindex:PagedIndex,pagedsize:PagedSize}
	let parameter = Object.assign({data:baseData},userInfo(),tokenSign(JSON.stringify(baseData)));
	
	return axios.post(url, parameter).then((res)=>{
		return Promise.resolve(res)
	})
}

//获取用户积分流水 需登录  /api/Activity/GetScoreFlowList
export function GetScoreFlowList (OperatorType,PagedIndex,PagedSize) {
	const url = baseURL + '/api/Activity/GetScoreFlowList'
	let baseData = {operatortype:OperatorType,pagedindex:PagedIndex,pagedsize:PagedSize}
	let parameter = Object.assign({data:baseData},userInfo(),tokenSign(JSON.stringify(baseData)));
	
	return axios.post(url, parameter).then((res)=>{
		return Promise.resolve(res)
	})
}

//获取积分产品列表  /api/Activity/GetScoreProductList
export function GetScoreProductList () {
	const url = baseURL + '/api/Activity/GetScoreProductList'
	let parameter = Object.assign(userInfo(),tokenSign());
	
	return axios.post(url, parameter).then((res)=>{
		return Promise.resolve(res)
	})
}

//获取积分产品详情  /api/Activity/GetScoreProductDetail
export function GetScoreProductDetail (ID) {
	const url = baseURL + '/api/Activity/GetScoreProductDetail'
	let baseData = {id:ID}
	let parameter = Object.assign({data:baseData},userInfo(),tokenSign(JSON.stringify(baseData)));
	
	return axios.post(url, parameter).then((res)=>{
		return Promise.resolve(res)
	})
}

//积分兑换 需登录  /api/Activity/ScoreExchangeHandle
export function ScoreExchangeHandle (ID) {
	const url = baseURL + '/api/Activity/ScoreExchangeHandle'
	let baseData = {id:ID}
	let parameter = Object.assign({data:baseData},userInfo(),tokenSign(JSON.stringify(baseData)));
	
	return axios.post(url, parameter).then((res)=>{
		return Promise.resolve(res)
	})
}

//获取推荐任务  /api/Team/GetTaskList
export function GetTaskList () {
	const url = baseURL + '/api/Team/GetTaskList'
	let parameter = Object.assign(userInfo(),tokenSign());
	
	return axios.post(url, parameter).then((res)=>{
		return Promise.resolve(res)
	})
}

//领取推荐任务奖励  /api/Team/TaskReward
export function TaskReward (ID) {
	const url = baseURL + '/api/Team/TaskReward'
	let baseData = {id:ID}
	let parameter = Object.assign({data:baseData},userInfo(),tokenSign(JSON.stringify(baseData)));
	
	return axios.post(url, parameter).then((res)=>{
		return Promise.resolve(res)
	})
}

//获取用户消息  /api/User/GetUserMsgList
export function GetUserMsgList () {
	const url = baseURL + '/api/User/GetUserMsgList'
	let parameter = Object.assign(userInfo(),tokenSign());
	
	return axios.post(url, parameter).then((res)=>{
		return Promise.resolve(res)
	})
}

//查看消息 /api/User/ViewMsg
export function ViewMsg (MsgID) {
	const url = baseURL + '/api/User/ViewMsg'
	let baseData = {msgid:MsgID}
	let parameter = Object.assign({data:baseData},userInfo(),tokenSign(JSON.stringify(baseData)));
	
	return axios.post(url, parameter).then((res)=>{
		return Promise.resolve(res)
	})
}

//检测升级版本  /api/System/CheckNewVersion
export function CheckNewVersion () {
	const url = baseURL + '/api/System/CheckNewVersion'
	let parameter = Object.assign(userInfo(),tokenSign());
	
	return axios.post(url, parameter).then((res)=>{
		return Promise.resolve(res)
	})
}

//获取国家地区列表  /api/System/GetCountryList
export function GetCountryList () {
	const url = baseURL + '/api/System/GetCountryList'
	let parameter = Object.assign(userInfo(),tokenSign());
	
	return axios.post(url, parameter).then((res)=>{
		return Promise.resolve(res)
	})
}