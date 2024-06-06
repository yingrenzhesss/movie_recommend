import { ReqInstance } from "./index"

// 轮播图数据请求
export function getHomeBanners() {
	return ReqInstance.get({
		url: "/banners",
	})
}

// 热映数据请求
export function getHotMovies(offset = 0, limit = 10 ) {
	return ReqInstance.get({
		url: "/hotmovie",
		data: {
			limit,
			offset
		}
	})
}

// 即将上映数据请求
export function getLaterMovies(offset = 0, limit = 10 ) {
	return ReqInstance.get({
		url: "/latermovie",
		data: {
			limit,
			offset
		}
	})
}
// 推荐数据请求
export function getRecommendMovies() {
	return ReqInstance.get({
		url: "/recommend"
	})
}
// 专属推荐数据请求
// 未登录推送数据
export function getNomalPushMovies() {
	return ReqInstance.get({
		url: "/exclusive/nomal",
	})
}
// 登录后推送
export function getExclusivePushMovies(user_token) {
	return ReqInstance.get({
		url: "/exclusive",
		data: {
			user_token
		}
	})
}
