import { ReqInstance } from "./index"

// 管理员登录
export function postUserLogin(name, password) {
	return ReqInstance.post({
		url: "/sys/login",
		data: {
			name,
			password
		}
	})
}

// 管理员注册
export function postUserRegister(name, password) {
	return ReqInstance.post({
		url: "/sys/register",
		data: {
			name,
			password
		}
	})
}