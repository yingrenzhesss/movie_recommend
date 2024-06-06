import { ReqInstance } from "./index"

// 请求分类电影
export function getCateMovies(title, offset = 0, limit = 10 ) {
	return ReqInstance.get({
		url: "/categories",
		data: {
			title,
			offset,
			limit
		}
	})
}