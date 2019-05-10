const fs = require('fs')
const path = require('path')

// 使用Promise。
// 使用Promise方法，解决了回调函数嵌套所形成的回调地狱问题。
// 在一个Promise中返回另一个Promise，通过链式调用拆解回调函数嵌套嵌套。
const getFileData = function(fileName) {
	let promise = new Promise((resolve,reject) => {
		let fileFullName = path.resolve(__dirname,fileName)
		fs.readFile(fileName, (err,data) => {
			if (err) {
				reject(err)
				return
			}
			resolve(JSON.parse(data))
		})
	})
	return promise
}
getFileData("a.json").then(data => {
	let fileFullName = path.resolve(__dirname,data.next)
	console.log(data)
	return getFileData(fileFullName)
}).then(data => {
	let fileFullName = path.resolve(__dirname,data.next)
	console.log(data)
	return getFileData(fileFullName)
}).then(data => {
	console.log(data)
})