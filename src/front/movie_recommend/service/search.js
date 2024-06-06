import { ReqInstance } from "./index"

// 搜索数据请求
export function getSearchMovies(value) {
	return ReqInstance.get({
		url: "/search",
		data: {
			value
		}
	})
}