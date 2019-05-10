//使用ES7提供的async/await语法，异步读取文件内容。
//async/await函数必须成对使用（await必须出现在async函数中）
//关键词await可以让JavaScript进行等待，直到一个promise执行并返回它的结果，JavaScript才会继续往下执行。

const fs = require('fs')
const path = require('path')

async function getFileData (fileName) {
	if (fileName) {
		let fileFullName = path.resolve(__dirname,fileName)
		
		let filePromise = new Promise((resolve,reject) => {
			fs.readFile(fileFullName, (err,data) => {
				if (err) {
					reject(err)
					return
				}
				resolve(JSON.parse(data)) //文件中的数据为字符串格式，JSON.parse将字符串转化为对象
			})
		})
		let fileData = await filePromise
		console.log(fileData)
		arguments.callee(fileData.next)
	}
}

getFileData("a.json")
