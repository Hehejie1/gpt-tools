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
	Proxy  string
}

type ChatGptTool struct {
	Secret string
	Client *openai.Client
}


// 创建gpt对象
func NewChatGptTool(secret string, proxy string) *ChatGptTool {
	config := openai.DefaultConfig(secret);
	if proxy != "" {
		config.BaseURL = proxy
	}
	client := openai.NewClientWithConfig(config)
	return &ChatGptTool{
		Secret: secret,
		Client: client,
	}
}

// 发起请求
func (this *ChatGptTool) ChatGPTModel(message []openai.ChatCompletionMessage, model string) (interface{}, error) {
	if model == "" {
		model = openai.GPT3Dot5Turbo
	}

	resp, err := this.Client.CreateChatCompletion(
		context.Background(),
		openai.ChatCompletionRequest{
			Model: model,
			Messages: message,
		},
	)

	if err != nil {
		return "", err
	}

	return resp, nil
}

type ContentType struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

func (c *ChatGPT) Send(content []ContentType, option SendOption) interface{} {
	sk := option.Sk
	proxy := option.Proxy
	model := option.Model

	if sk == "" {
		return nil
	}

	gpt := NewChatGptTool(sk, proxy)

	reqMessages := make([]openai.ChatCompletionMessage, 0)
	for _, row := range content {
		reqMessage := openai.ChatCompletionMessage{
			Role: row.Role,
			Content: row.Content,
		}
		reqMessages = append(reqMessages, reqMessage)
	}
	resp, err := gpt.ChatGPTModel(reqMessages, model)

	if err != nil {
		fmt.Printf("ChatCompletion error: %v\n", err)
		return err
	}

	return resp
}
