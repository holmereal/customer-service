/**
 * Created on 2021/6/30.
 */
import sha1 from 'sha1'
import axios from 'axios'

//http://192.168.2.121:7020  https://c.365-farm.com
export const baseURL = 'https://c.365-farm.com'


let channel = ''
let kai = true


export function userInfo (res) {
	if(res){
		channel = res
	}else{
		channel = window.localStorage.getItem('channel') || 'GL500'
	}
  // let channel = window.sessionStorage.getItem('channel')
  let basicInfo = {
    Uid: window.localStorage.getItem('userID')||"-1",
    Timestamp: dateTime(),
    Nonce: randomWord(32),
    deviceid: window.localStorage.getItem('identificationNumber'),
    channel: channel,
    OSVer: '1',
    APPVer: '3.2.2',
    // Token: window.localStorage.getItem('token'),
    MemberToken: window.localStorage.getItem('MemberToken'),
    IP: getIP() || '',
    osType: 2,
	CID: window.localStorage.getItem('CID')|| "125",
	Language: window.localStorage.getItem('lang') || 'en',
	Timestr: getTimestr()
  }
  return basicInfo
}

// export const account = 'NBDJ_WEB'
export function account () {
  return window.sessionStorage.getItem('account')
}
// export const secretKey = 'vzYxzlRr6LZ3DGVcp4rlzhNGOiBbIhbs'
export function secretKey () {
  return window.sessionStorage.getItem('secretKey')
}

export function getTimestr () {
    let tmp = new Date()
    tmp = tmp.toLocaleString();
    return tmp;
}

export function dateTime () {
  if (window.sessionStorage.getItem('IP') == null){
    if (kai){
      kai = false
      const url = 'https://httpbin.org/ip'
      axios.get(url).then((res) => {
        window.sessionStorage.setItem('IP',res.data.origin)

      })
    }
  }

  let tmp = Date.parse( new Date() ).toString();
  tmp = tmp.substr(0,10);
  window.sessionStorage.setItem('dateTime',tmp)
  return tmp;
}

export function randomWord (max){
  var str = '',
    range = max,
    arr = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
  //随机产生
  for (var i=0;i<range;i++) {
    let pos = Math.round(Math.random() * (arr.length-1));
    str += arr[pos]
  }
  window.sessionStorage.setItem('randomWord',str)
  return str;
}

export function tokenSign (baseData) {
  let obj
  let info = {
    channel:channel,
    deviceid:window.localStorage.getItem('identificationNumber'),
    nonce:window.sessionStorage.getItem('randomWord'),
    timestamp:window.sessionStorage.getItem('dateTime'),
    uid:window.localStorage.getItem('userID') || '-1'
  }

  if (baseData == null){
    obj = info
  } else {
    let newBaseData = JSON.parse(baseData)
    obj = Object.assign(info, newBaseData)
  }

  function objKeySort(obj) {//排序的函数
    let newkey = Object.keys(obj);
    let newObj = '';

    let arrSort = newkey.sort(function(s, t) {
      let a = s.toLowerCase();
      let b = t.toLowerCase();
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    })
    for (let i in arrSort){
	  if(obj[arrSort[i]] == "" && obj[arrSort[i]] !== 0) {
		arrSort.splice(i,1,'');
	  }else if(Array.isArray(obj[arrSort[i]])){
		arrSort.splice(i,1,'');
	  }
    }
	var r = arrSort.filter(function (s) {
	   return s && s.trim();
	});
	for (let x in r){
		newObj += r[x]+'='+obj[r[x]]+'&'
	}
    return newObj.substr(0,newObj.length-1)
  }
  let arrmsg = objKeySort(obj)
  // console.log(arrmsg)

  return {Signdata: sha1(arrmsg)}
}

export function getIP () {
  try {
    let ip = returnCitySN["cip"]
    return ip
  }catch (e) {
    if (window.sessionStorage.getItem('IP') != null){
      return window.sessionStorage.getItem('IP')
    } else {
      return ''
    }
  }
}
