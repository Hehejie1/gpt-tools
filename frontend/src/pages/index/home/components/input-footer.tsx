import * as React from "react";
import { Button, Input, message } from "antd";
import dayjs from "dayjs";
import { uniqueId } from "lodash-es";

import { useMessageStore } from "@/store/useMessage";
import { Send } from "@wails/go/gpt/ChatGPT";
import { useConfigStore } from "@/store/useConfig";

export type InputFooterProps = {};

export const InputFooter: React.FC<InputFooterProps> = () => {
  const [text, setText] = React.useState("");
  const { updateMessage } = useMessageStore((state) => state);
  const { config } = useConfigStore((state) => state);

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

    updateMessage({
      id: uniqueId("message"),
      left: false,
      user_key: "user",
      user_name: "用户",
      user_avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=2",
      content: text,
      create_time: dayjs().valueOf(),
    });

    Send(text, { sk: config.sk, model: config.model }).then((res) => {
      setText("");
      updateMessage({
        id: res.id,
        left: true,
        usage: res.usage,
        user_key: "robot",
        user_name: "chatgpt",
        user_avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=1",
        content: res.choices[0].message.content,
        create_time: dayjs().valueOf(),
      });
    });
  }, [text, config]);

  return (
    <div className="flex items-center">
      <Input
        allowClear
        value={text}
        onChange={handleChange}
        placeholder="请输入"
        onPressEnter={handleSend}
      />
      <Button type="primary" onClick={handleSend}>
        提交
      </Button>
    </div>
  );
};
