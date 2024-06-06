import { ReqInstance } from "./index"

// 用户管理
// 查询用户
export function getUserInfo(value) {
	return ReqInstance.get({
		url: "/sys/users",
		data: {
			value
		}
	})
}
// 删除用户
export function deleteUserInfo(id, name) {
	return ReqInstance.post({
		url: "/sys/users/delete",
		data: {
			id,
			name
		}
	})
}

// 电影更管理
// 查询电影
export function getMovieInfo(value) {
	return ReqInstance.get({
		url: "/sys/movie",
		data: {
			value
		}
	})
}

// 删除电影
export function deleteMovieInfo(movie_id, title) {
	return ReqInstance.post({
		url: "/sys/movie/delete",
		data: {
			movie_id,
			title
		}
	})
}
// 修改电影
export function updateMovieInfo(movie_id, title, score, duration, director, types, region, description) {
	return ReqInstance.post({
		url: "/sys/movie/update",
		data: {
			movie_id,
			title,
			score,
			duration,
			director,
			types,
			region,
			description
		}
	})
}

// 评论管理
// 查询评论
export function getCommentInfo(value) {
	return ReqInstance.get({
		url: "/sys/comment",
		data: {
			value
		}
	})
}
// 删除评论
export function deleteCommentInfo(id, name, movie_id) {
	return ReqInstance.post({
		url: "/sys/comment/delete",
		data: {
			id,
			name,
			movie_id
		}
	})
}

// 轮播图
export function getBannersInfo() {
	return ReqInstance.get({
		url: "/sys/banners"
	})
}

export function deleteBannersInfo(movie_id, movie_name) {
	return ReqInstance.post({
		url: "/sys/banners/delete",
		data: {
			movie_id,
			movie_name
		}
	})
}
export function insertBannersInfo(movie_id, movie_name, movie_img) {
	return ReqInstance.post({
		url: "/sys/banners/insert",
		data: {
			movie_id,
			movie_name,
			movie_img
		}
	})
}

// 个人中心
// 查询管理员信息
export function getSystemInfo(user_name) {
	return ReqInstance.get({
		url: "/sys/system",
		data: {
			user_name
		}
	})
}
// 修改管理员资料
export function updateSystemInfo(user_name, status, user_role, user_avatar, origin_name) {
	return ReqInstance.post({
		url: "/sys/info/update",
		data: {
			user_name,
			status,
			user_role,
			user_avatar,
			origin_name
		}
	})
}
// 修改密码
export function updateSystemSecret(user_name, oldPassword, newPassword, confirePassword) {
	return ReqInstance.post({
		url: "/sys/secret/update",
		data: {
			user_name,
			oldPassword,
			newPassword,
			confirePassword
		}
	})
}
