// 解析歌词
// [01:18.26]基于你还爱我 ---歌词样例
// 正则规则
const timeReg = /\[(\d{2}):(\d{2}).(\d{2,3})\]/

export function parseLyric(lrcString) {
	const lyricInfos = []

	const lyricLines = lrcString.split("\n")
	for (const lineString of lyricLines) {
		const results = timeReg.exec(lineString)
		if(!results) continue
		const minute = results[1] *60 * 1000
		const second = results[2] * 1000
		// 毫秒2位数乘以10，3位数不管
		const mSecond = results[3].length === 2 ? results[3] * 10: results[3] * 1

		const time = minute + second + mSecond
		const text = lineString.replace(timeReg, "")//将 [时间] 换成空
		lyricInfos.push({ time, text })
	}
	return lyricInfos
}
