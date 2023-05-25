import * as React from "react";
import { Avatar, List, Space, Tag } from "antd";
import dayjs from "dayjs";
import clsx from "clsx";

import { useMessageStore } from "@/store/useMessage";
import { useTimeout } from "@/utils";

export type UserMessageProps = {};

export const UserMessage: React.FC<UserMessageProps> = () => {
  const { message: allMessage, currentId, getMessage } = useMessageStore((state) => state);

  const listRef = React.useRef<HTMLDivElement>(null);

  const message = React.useMemo(() => {
    useTimeout(() => {
      if (listRef.current) {
        listRef.current.scrollIntoView();
      }
    }, 1000);

    return getMessage?.();
  }, [allMessage, currentId]);

  if (!message) {
    return null;
  }

  return (
    <>
      <List
        className="w-full py-4 px-8"
        itemLayout="horizontal"
        dataSource={message.list}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              className={clsx(
                item?.left
                  ? "text-left bg-slate-100"
                  : "text-right flex-row-reverse"
              )}
              avatar={
                <Avatar
                  src={
                    item.user_avatar ||
                    `https://xsgames.co/randomusers/avatar.php?g=pixel&key=1`
                  }
                />
              }
              title={
                <Space>
                  <div>{item.user_name}</div>
                  <Tag color="warning">
                    {dayjs(item.create_time).format("YYYY-MM-DD HH:mm:ss")}
                  </Tag>
                </Space>
              }
              description={item.content}
            />
          </List.Item>
        )}
      />
      <div id="list-bottom" className="w-full h-[1px]" ref={listRef} />
    </>
  );
};
