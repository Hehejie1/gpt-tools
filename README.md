# GPT-TOOLS

gpt的优点：

显著缩短1年工作经验和3年工作经验的差距

## 功能

1. [ ] 支持chatgpt的聊天功能
2. [ ] 支持语音聊天和语音回复
3. [ ] 支持promote提示语提示
4. [ ] 支持选择模型和设置key

# gpt-tools

```
# -*- coding: utf-8 -*
import openai

openai.api_key =  ""
def chat(prompt):
    completion = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=prompt)
    return completion['choices'][0]['message']['content']

messages=[{"role": "system", "content": "你是一个有用的助手"}]

while 1:
    a = input("请输入你的问题：")
    messages.append({"role": "user", "content":a})
    b = chat(messages)
    b = b.replace("\n","")
    print(b)
    messages.append({"role": "assistant", "content":b})
    time.sleep(2)

```

API返回的completion对象中包含conversation_id属性,

接下来，当您想要继续与同一用户的会话时，可以将上一次请求中返回的conversation_id作为当前请求的参数之一

https://juejin.cn/post/7199456238190673977

https://github.com/sashabaranov/go-openai

声音组件： https://github.com/SheikhAminul/ChatGPT-voice-control

[openAI中文文档](https://openai.xiniushu.com/)

https://github.com/zhayujie/chatgpt-on-wechat/issues/321
