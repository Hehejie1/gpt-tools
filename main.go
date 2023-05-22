package main

import (
	"embed"
	"context"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"

	"github.com/Hehejie1/gpt-tools/backend/gpt"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// Create an instance of the app structure
	app := NewApp()
	gptClient := gpt.NewGPT()

	// Create application with options
	err := wails.Run(&options.App{
		Title:  "gpt-tools",
		Width:  1024,
		Height: 768,
		MinWidth:  600,
		MinHeight: 400,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup: func(ctx context.Context) {
			app.startup(ctx)
			gptClient.Startup(ctx)
		},
		Bind: []interface{}{
			app,
			gptClient,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
