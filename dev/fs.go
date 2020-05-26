package main

// pages.json 可能存在的位置
var pageJSONFilePath string

// 读取 `pages.json` 文件
// 参考: https://tutorialedge.net/golang/parsing-json-with-golang/
func readPageJSON() string {
	return ""
}


func init() {
	pageJSONFilePath = getWorkDirV2()
}