import { ReqInstance } from "./index"
// 电影基本信息
export function getMovieIntro(movie_id, movieType) {
	return ReqInstance.get({
		url: "/movie",
		data: {
			movie_id,
			movieType
		}
	})
}

// 发送收藏
export function getMovieCollect(movie_id, movie_name, user_token, movieType) {
	return ReqInstance.post({
		url: "/movie/collect",
		data: {
			movie_id,
			movie_name,
			user_token,
			movieType
		}
	})
}

// 取消收藏
export function getCancelMovieCollect(movie_id, movie_name, user_token) {
	return ReqInstance.post({
		url: "/movie/cancelcol",
		data: {
			movie_id,
			movie_name,
			user_token
		}
	})
}

// 发送历史记录
export function postMovieHistory(movie_id, movie_name, user_token, movieType) {
	return ReqInstance.post({
		url: "/movie/history",
		data: {
			movie_id,
			movie_name,
			user_token,
			movieType
		}
	})
}

// 评价内容
// 1.发送评价
export function postMovieComment(movie_id, movie_name, content, rating, user_token) {
	return ReqInstance.post({
		url: "/comment",
		data: {
			movie_id,
			movie_name,
			content,
			rating,
			user_token
		}
	})
}
// 获取电影评论
export function getMovieComments(movie_id) {
	return ReqInstance.get({
		url: "/movie/comment",
		data: {
			movie_id
		}
	})
}