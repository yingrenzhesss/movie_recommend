// 获取组件高度，方便轮播图设置
export default function querySelect(selector) {
	return new Promise(resolve => {
		const query = wx.createSelectorQuery()
    query.select(selector).boundingClientRect()
    query.exec(res => {
      resolve(res)
    })
	})
}