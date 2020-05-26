package main

import (
	"io/ioutil"
	"os"

	"github.com/gofiber/fiber"
)

// 创建一个 `http-server`
func createDevAppServer() *fiber.App {
	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) {
		f, e := os.Open("./template/index.app")
		defer f.Close()
		if e != nil {
			c.Send("模板渲染失败")
		} else {
			b, err := ioutil.ReadAll(f)
			r := string(b)
			if err != nil {
				r = ""
			}
			c.Html(r)
		}
	})

	app.Listen(3000)
	return app
}
