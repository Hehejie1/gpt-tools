import * as React from "react";
import { Button, Input, message } from "antd";
import dayjs from "dayjs";
import { uniqueId } from "lodash-es";

import { useMessageStore } from "@/store/useMessage";
import { Send } from "@wails/go/gpt/ChatGPT";
import { useConfigStore } from "@/store/useConfig";
import { RoleType } from "@/constant";

export type InputFooterProps = {};

export const InputFooter: React.FC<InputFooterProps> = () => {
  const [text, setText] = React.useState("");
  const { getMessage, updateMessage } = useMessageStore((state) => state);
  const { config } = useConfigStore((state) => state);
  const [loading, setLoading] = React.useState(false);

  const handleChange = React.useCallback((e: any) => {
    setText(e.target.value);
  }, []);

  const handleSend = React.useCallback(() => {
    if (!config?.sk) {
      message.error("请填写sk");
      return;
    }

    if (!text) {
      message.error("请输入内容");
      return;
    }

    const messages = getMessage();
    const len = messages?.list?.length || 0;
    const content = [
      ...(len <= 0
        ? []
        : (messages?.list || []).slice(-1 * 6).map((item) => ({
            role: item.user_key || "",
            content: item.content || "",
          }))),
      {
        role: "user",
        content: text,
      },
    ];

    updateMessage({
      id: uniqueId("message"),
      left: false,
      user_key: RoleType.User,
      user_name: "用户",
      user_avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=2",
      content: text,
      create_time: dayjs().valueOf(),
    });

    setLoading(true);
    console.log("query params:", messages, content, config);
    Send(content, {
      sk: config.sk,
      model: config.model,
      proxy: config.proxy,
    })
      .then((res) => {
        console.log("res", res);
        if (!res?.choices?.[0]?.message?.content) {
          return;
        }

        setText("");
        updateMessage({
          id: res.id,
          left: true,
          usage: res.usage,
          user_key: RoleType.Assistant,
          user_name: "chatgpt",
          user_avatar:
            "https://xsgames.co/randomusers/avatar.php?g=pixel&key=1",
          content: res.choices[0].message.content,
          create_time: dayjs().valueOf(),
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [getMessage, text, config]);

  return (
    <div className="flex items-center">
      <Input
        allowClear
        value={text}
        disabled={loading}
        onChange={handleChange}
        placeholder="请输入"
        onPressEnter={handleSend}
      />
      <Button disabled={loading} type="primary" onClick={handleSend}>
        提交
      </Button>
    </div>
  );
};
