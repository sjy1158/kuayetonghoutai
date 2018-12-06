import axios from 'axios'
import router from '@/router'
import { Message } from 'element-ui'
import FileSaver from 'file-saver'
import { storage } from '@/util'
import config from '../util/config'
// 每个请求加上Token
axios.interceptors.request.use(request => {
  request.headers['channel'] = localStorage.getItem('header')
  return request
})

// 使用iframe下载文件
function download(url) {
	const xhr = new XMLHttpRequest()
	xhr.open('GET', url,true)
	xhr.responseType = 'arraybuffer'
	xhr.onload = function() {
		if (this.status == 200) {
			let filename = ''
			const disposition = xhr.getResponseHeader('Content-Disposition')
			if (disposition && disposition.indexOf('attachment') > -1) {
				var filenameRegex = /filename[^=\n]*=((['"]).*?\2|[^\n]*)/
				var matches = filenameRegex.exec(disposition)
				if (matches != null && matches[1]) filename = matches[1].replace(/['"]/g, '')
			}
			const type = xhr.getResponseHeader('Content-Type')
			const blob = typeof File === 'function'
				? new File([this.response], filename, { type: type })
				: new Blob([this.response], { type: type })

			FileSaver.saveAs(blob, filename)

			Message({
				message: '文件已下载',
				type: 'success',
				showClose: true
			})
		} else {
			Message({
				message: '下载文件失败',
				type: 'error',
				showClose: true
			})
		}
	}
	xhr.setRequestHeader('Authorization', storage.getToken())
	xhr.send()
}
// 处理服务端错误
axios.interceptors.response.use(response => {
    if(response.data.code==200){
        return response.data.data
    }else if(response.data.code==300){
    	Message({
			type:'success',
			message:response.data.msg
		});
        setTimeout(()=>{
    		window.history.go(-1);
		},2000)
	}else{
     	return Promise.reject({
            			message: response.data.msg
            		})
	}
})
//
axios.interceptors.response.use(undefined, error => {
  // 未知错误
  Message({
    message: error.message || error,
		type: 'error',
    showClose: true
  })
  return Promise.reject(error)
})

const api = {
    Login(params){
        return axios.request({
            method:'get',
            url:config.baseUrl+'/crossindustry/userManage/login',
            params:params
        })
    },
	// 获取卡密列表
	getCardlist(params){
		return axios.request({
            method:'get',
            url:config.baseUrl+'/crossindustry/cardManage/cardList',
			params:params
		})
	},
	//划拨卡密
	subCardpass(params){
    	return axios.request({
			method:'get',
			url:config.baseUrl+'/crossindustry/cardManage/transferCard',
			params:params
		})
	},
	//生成卡密
	proDucePass(params){
    	return axios.request({
			method:'get',
			url:config.baseUrl+'/crossindustry/cardManage/createCard',
			params:params
		})
	},
	// 修改卡密
	changeAlter(params){
    	return axios.request({
			method:'get',
			url:config.baseUrl+'/crossindustry/cardManage/alter',
			params:params
		})
	},
	//空中充值
    skyRecharge(params){
		return axios.request({
			method:'get',
			url:config.baseUrl+'/crossindustry/cardManage/directRecharge',
			params:params
		})
	},
	// 卡号充值
    cardRecharge(params){
		return axios.request({
			method:'get',
			url:config.baseUrl+'/crossindustry/cardManage/cardRecharge',
			params:params
		})
	},
	//费率设置
    onphoneshezhi(params){
		return axios.request({
			method:'get',
			url:config.baseUrl+'/crossindustry/cardManage/updateCost',
			params:params
		})
	},
	//获取充值记录列表
	getRechage(params){
		return axios.request({
			method:'get',
			url:config.baseUrl+'/crossindustry/cardManage/recordByQuery',
			params:params
		})
	},
	//获取卡管理员列表
	getCardad(params){
		return axios.request({
			method:'get',
			url:config.baseUrl+'/crossindustry/agentManage/queryAgent',
			params:params
		})
	},
	// 单张修改
	changeOnepage(params){
		return axios.request({
			method:'get',
			url:config.baseUrl+'/crossindustry/agentManage/alter',
			params:params
		})
	},
	//添加管理员
	addMnage(params){
		return axios.request({
			method:'get',
			url:config.baseUrl+'/crossindustry/agentManage/addAgent',
			params:params
		})
	},
	//获取商家列表
	getStoreList(params){
    	return axios.request({
			method:'get',
			url:config.baseUrl+'/crossindustry/shopManage/shopList',
			params:params
		})
	},
	//获取商家类型
	getStoretype(params){
    	return axios.request({
			method:'get',
			url:config.baseUrl+'/crossindustry/shopManage/queryShopType',
			params:params
		})
	},
	//获取商家头条
	getHeaderline(params){
    	return axios.request({
			method:'get',
			url:config.baseUrl+'/crossindustry/shopManage/headLine',
			params:params
		})
	},
	//添加商家头条
	addHeaderline(params){
    	return axios.request({
			method:'get',
			url:config.baseUrl+'/crossindustry/shopManage/addHeadLine',
			params:params
		})
	},
	//修改商家头条
	changeHeader(params){
		return axios.request({
			method:'get',
			url:config.baseUrl+'/crossindustry/shopManage/alterHeadLine',
			params:params
		})
	},
	//商家提现列表
	storeGet(params){
    	return axios.request({
			method:'get',
			url:config.baseUrl+'/crossindustry/shopManage/shopWithdrawList',
			params:params
		})
	},
	//获取用户反馈列表
	getFankuiList(params){
		return axios.request({
			method:'get',
			url:config.baseUrl+'/crossindustry/clientManage/feedbackList',
			params:params
		})
	},
	//获取常见问题列表
	getCommonpro(params){
    	return axios.request({
			method:'get',
			url:config.baseUrl+'/crossindustry/clientManage/commonProblemList',
			params:params
		})
	},
	//常见问题添加
	addCompro(params){
		return axios.request({
			method:'get',
			url:config.baseUrl+'/crossindustry/clientManage/addCommonProblem',
			params:params
		})
	},
	//常见问题修改
	changeCm(params){
		return axios.request({
			method:'get',
			url:config.baseUrl+'/crossindustry/clientManage/alterCommonProblem',
			params:params
		})
	},
	//资费说明
	getCostsay(params){
    	return axios.request({
			method:'get',
			url:config.baseUrl+'/crossindustry/clientManage/costExplain',
			params:params
		})
	},
	//资费说明添加
	getAddcost(params){
		return axios.request({
			method:'get',
			url:config.baseUrl+'/crossindustry/clientManage/addCostExplain',
			params:params
		})
	},
	changCostsay(params){
		return axios.request({
			method:'get',
			url:config.baseUrl+'/crossindustry/clientManage/alterCostExplain',
			params:params
		})
	},
	//新手攻略列表
	getNovice(params){
    	return axios.request({
			method:'get',
			url:config.baseUrl+'/crossindustry/clientManage/newStrategyList',
			params:params
		})
	},
	//新手攻略添加
	getAddnovice(params){
    	return axios.request({
			method:'get',
			url:config.baseUrl+'/crossindustry/clientManage/addNewStrategy',
			params:params
		})
	},
	//新手攻略修改
	getChangenovice(params){
		return axios.request({
			method:'get',
			url:config.baseUrl+'/crossindustry/clientManage/alterNewStrategy',
			params:params
		})
	},
	//获取七秘钥
	getkey(){
    	return axios.request({
			method:'get',
			url:config.baseUrl+'/crossindustry/userPage/getQiNiuToken'
		})
	},
	//骑牛云请求地址
	getQiun(params){
    	return axios.request({
			method:'post',
			url:'http://pa8vmyrlm.bkt.clouddn.com/',
			params:params
		})
	},
	//获取广告位列表
	getSettingsimage(params){
    	return axios.request({
			method:'get',
			url:config.baseUrl+'/crossindustry/clientManage/getImageList',
			params:params
		})
	},
	// 添加电话广告位
	addphoneImage(params){
		return axios.request({
			method:'get',
			url:config.baseUrl+'/crossindustry/clientManage/addImage',
			params:params
		})
	},
	//商家审核列表
	getStore(params){
		return axios.request({
			method:'get',
			url:config.baseUrl+'/crossindustry/shopManage/queryShopcheck',
			params:params
		})
	},
	// 添加商家类型
	addStoretype(params){
    	return axios.request({
			method:'get',
			url:config.baseUrl+'/crossindustry/shopManage/addShopType',
			params:params
		})
	},
	//修改商家类型
	changeStoretype(params){
    	return axios.request({
			method:'get',
			url:config.baseUrl+'/crossindustry/shopManage/alterShopType',
			params:params
		})
	},
	//添加合伙人
	addParners(params){
    	return axios.request({
			method:'get',
			url:config.baseUrl+'/crossindustry/agentManage/addPartner',
			params:params
		})
	},
	// 获取合伙人列表
	getParnerslist(params){
    	return axios.request({
			method:'get',
			url:config.baseUrl+'/crossindustry/agentManage/queryPartner',
			params:params
		})
	},
	//修改合伙人信息
	changeMg(params){
		return axios.request({
			method:'get',
			url:config.baseUrl+'/crossindustry/agentManage/alterType',
			params:params
		})
	},
	//商家列表添加
	addStorephoto(params){
    	return axios.request({
			method:'get',
			url:config.baseUrl+'/crossindustry/shopManage/addShop',
			params:params
		})
	},
	// 商家折扣设置
	getDiscon(params){
		return axios.request({
			method:'get',
			url:config.baseUrl+'/crossindustry/shopManage/queryDeduction',
			params:params
		})
	},
	// 商家修改
	changediscon(params){
		return axios.request({
			method:'get',
			url:config.baseUrl+'/crossindustry/shopManage/alterShop',
			params:params
		})
	},
	// 电商购头部
	getBeheader(params){
    	return axios.request({
			method:'get',
			url:config.baseUrl+'/crossindustry/purchaseManage/getBigestType',
			params:params
		})
	},
	getPuremane(params){
    	return axios.request({
			method:'get',
			url:config.baseUrl+'/crossindustry/purchaseManage/getBigType',
			params:params
		})
	},

	addBigType(params){
    	return axios.request({
			method:'get',
			url:config.baseUrl+'/crossindustry/purchaseManage/addBigType',
			params:params
		})
	},
	//查询重复订单列表
	getChongfu(params){
    	return axios.request({
			method: 'get',
			url:config.baseUrl+'/crossindustry/purchaseManage/repeatedOrders',
			params:params
		})
	},
	getAlluser(params){
    	return axios.request({
			method:'get',
			url:config.baseUrl+'/crossindustry/userManage/userList',
			params:params
		})
	},
	//导出卡列表
	daochuCardlist(){
    	// return download(config.baseUrl+'/crossindustry/download/card')
		window.location.href=config.baseUrl+'/crossindustry/download/card'
	},
	daochuUserList(){
    	// return download(config.baseUrl+'/crossindustry/download/user')
		window.location.href=config.baseUrl+'/crossindustry/download/user'
	},
	// 用户修改
	changeOneuser(params){
    	return axios.request({
			method:'get',
			url:config.baseUrl+'/crossindustry/userManage/alter',
			params:params
		})
	},
	// 卡充值接口\
	kaChongzhi(params){
    	return axios.request({
			method:'get',
			url:config.baseUrl+'/crossindustry/agentManage/recharge',
			params:params
		})
	},
	// 卡密列表批量修改
	allcardChange(params){
    	return axios.request({
			method:'get',
			url:config.baseUrl+'/crossindustry/cardManage/alter',
			params:params
		})
	},
	//电商购订单列表
	getDianshanglist(params){
		return axios.request({
			method:'get',
			url:config.baseUrl+'/crossindustry/purchaseManage/fylist',
			params:params
		})
	},
	//获取管理人员列表
	getAdm(params){
    	return axios.request({
			method:'get',
			url:config.baseUrl+'/crossindustry/userManage/getAdm',
			params:params
		})
	},
	//修改密码
	changePassword(params){
		return axios.request({
			method:'get',
			url:config.baseUrl+'/crossindustry/userManage/changePassword',
			params:params
		})
	},
	//用户提现接口
	userCash(params) {
        return axios.request({
            method: 'get',
            url: config.baseUrl + '/crossindustry/userManage/yhtx',
            params: params
        })
    },
	//电商购分类列表
	wordList(params){
    	return axios.request({
			method:'get',
			url:config.baseUrl + '/crossindustry/powerPurchaser/wordList',
			params:params
		})
	},
	// 跟新关键字
	updateWord(params){
    	return axios.request({
			method:'get',
			url:config.baseUrl + '/crossindustry/powerPurchaser/updateWord',
			params:params
		})
	},
	// 关键字判断
	judgeWord(params){
		return axios.request({
			method:'get',
			url:config.baseUrl + '/crossindustry/powerPurchaser/judgeWord',
			params:params
		})
	},
	//获取活动列表接口
	getActivety(params){
		return axios.request({
			method:'get',
			url:config.baseUrl+'/crossindustry/findManage/queryActivityNotice',
			params:params
		})
	},
	//获取活动回顾列表接口
	getActiveback(params){
    	return axios.request({
			method:'get',
			url:config.baseUrl + '/crossindustry/findManage/queryActivityReview',
			params:params
		})
	},
	//添加活动接口
	addActivity(params){
    	return axios.request({
			method:'post',
			url:config.baseUrl+'/crossindustry/findManage/addActivityNotice',
			params:params
		})
	},
	bashChange(url){
    	return axios.request({
			method:'get',
			url:'http://api.kuayet.com:8080/crossindustry/image/convert',
			params:{
				url:url
			}
		})
	},
	// 获取淘宝列表接口
	getTaobaoList(params){
    	return axios.request({
			method:'get',
			url:config.baseUrl+'/crossindustry/purchaseManage/queryProduct',
			params:params
		})
	},
	// 电商购合成图编辑
	saveImage(params){
    	return axios.request({
			method:'get',
			url:config.baseUrl+'/crossindustry/findManage/addPublicitty',
			params:params
		})
	},
    //活动回顾添加
    addBack(params){
        return axios.request({
            method:'get',
            url:config.baseUrl+'/crossindustry/findManage/addActivityReview',
            params:params
        })
    },
	// 获取商家动态列表
	getDongtai(params){
    	return axios.request({
			method:'get',
			url:config.baseUrl+'/crossindustry/findManage/selectPublicityMaterial',
			params:params
		})
	},
	// 消息接受接口
	getSavemsg(){
    	return axios.request({
			method:'get',
			url:config.baseUrl+'/crossindustry/userManage/checkShopStatus',
		})
	},
	//添加后台管理人员
	addAddom (params) {
    	return axios.request({
			method: 'get',
			url:config.baseUrl+'/crossindustry/userManage/addAdm',
			params:params
		})
	},
	//修改后台管理人员头像
	changeadMan (params) {
    	return axios.request({
			method: 'get',
			url:config.baseUrl + '/crossindustry/userManage/alterAdm',
			params: params
		})
	}
}

export default class Api {
  static install(Vue) {
    Object.defineProperty(Vue.prototype, '$api', {
      get() { return api }
    })
  }
}
