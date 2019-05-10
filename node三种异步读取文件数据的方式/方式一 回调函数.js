const fs = require('fs')
const path = require('path')

// 方法一：回调函数
// const fileFullName = path.resolve(__dirname, filename)
// path.resolve() 将路径或路径片段的序列解析为绝对路径。
// __dirname 总是指向被执行 js 文件的绝对路径
const getFileData = (filename,callback) => {
	const fileFullName = path.resolve(__dirname,filename)
	fs.readFile(fileFullName, (err,data) => {
		if (err) {
			return callback(err)
		}
		callback(null,JSON.parse(data))
	})	
}

getFileData('a.json', (err,data) => {
	if (err) {
		console.log("error")
	}
	console.log(data)
	getFileData(data.next, (err,data) => {
		if (err) {
			console.log("error")
		}
		console.log(data)
		getFileData(data.next, (err,data) => {
			if (err) {
				console.log("error")
			}
			console.log(data)
		})
	})
})

