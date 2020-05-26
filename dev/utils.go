package main

import (
	"log"
	"os"
	"runtime"
	"strings"
)

// get work dir
// https://gist.github.com/arxdsilva/4f73d6b89c9eac93d4ac887521121120
func getWorkDirV1() (string, error) {
	dir, err := os.Getwd()
	return dir, err
}

// 获取当前 `runtime` 的路径
// https://is.gd/pLyXrX
func getWorkDirV2() string {
	dir, err := os.Getwd()
	if err != nil {
		log.Fatal(err)
	}
	var ss []string
	if runtime.GOOS == "windows" {
		ss = strings.Split(dir, "\\")
	} else {
		ss = strings.Split(dir, "/")
	}
	currentDirName := ss[len(ss)-1]
	return currentDirName
}
