import { ReqInstance } from "./index"

// 请求openid
export function getLoginCode() {
	// 1.获取用户的头像和昵称
	const profile = wx.getUserProfile({
		desc: '获取您的头像和昵称',
		success: (res) => {
			console.log(res);
		},
		fail: (res) => {
			return "登录失败"
		}
	})
	// console.log(profile.userInfo);
	this.setData({ userInfo: profile.userInfo })

	// 2.获取token
	wx.login({
		success (res) {
			if (res.code) {
				const user_name = profile.userInfo.nickName
				const user_avatar = profile.userInfo.avatarUrl
				// console.log(res.code,user_name,user_avatar);
				//发起网络请求
				wx.request({
					url: 'http://localhost:8000/logincode',
					method: "POST",
					data: {
						code: res.code,
						user_avatar: user_avatar,
						user_name: user_name,
						user_role: "普通用户"
					},
					success: (res) => {
						console.log(res);
					}
				})
			} else {
				console.log('登录失败！' + res.errMsg)
			}
		}
	})
}

// 请求我的收藏记录
export function getUserCollectMovies(user_token) {
	return ReqInstance.get({
		url: "/mycollect",
		data: {
			user_token
		}
	})
}
// 请求历史记录
export function getUserHistoryMovies(user_token) {
	return ReqInstance.get({
		url: "/myhistory",
		data: {
			user_token
		}
	})
}

// 请求我的评价
export function getUserComment(user_token) {
	return ReqInstance.get({
		url: "/mycomment",
		data: {
			user_token
		}
	})
}
// 删除评论
export function delectUserComment(user_token, create_at) {
	return ReqInstance.post({
		url: "/mycomment/delect",
		data: {
			user_token,
			create_at
		}
	})
}