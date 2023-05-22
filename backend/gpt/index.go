package gpt

import (
	"context"
	"fmt"
	openai "github.com/sashabaranov/go-openai"
)

type ChatGPT struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewGPT() *ChatGPT {
	return &ChatGPT{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (c *ChatGPT) Startup(ctx context.Context) {
	c.ctx = ctx
}

type SendOption struct {
	Sk     string
	Model  string
}

func (c *ChatGPT) Send(content string, option SendOption) interface{} {
	sk := option.Sk
	model := option.Model

	if sk == "" {
		return nil
	}

	if model == "" {
		model = openai.GPT3Dot5Turbo
	}

	client := openai.NewClient(sk)

	resp, err := client.CreateChatCompletion(
		context.Background(),
		openai.ChatCompletionRequest{
			Model: model,
			Messages: []openai.ChatCompletionMessage{
				{
					Role: openai.ChatMessageRoleUser,
					Content: content,
				},
			},
		},
	)

	if err != nil {
		fmt.Printf("ChatCompletion error: %v\n", err)
		return ""
	}


	return resp
}
