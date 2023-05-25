import create from "zustand";
import localForage from "localforage";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";

export type MessageId = string;

export type MessageItemType = {
  id?: string;
  left?: boolean;
  user_key?: string;
  user_name?: string;
  user_avatar?: string;
  content?: string;
  create_time?: number;
  usage?: Partial<{
    prompt_tokens: number;
    completion_tokens: number;
    ttotal_tokens: number;
  }>;
};

export type MessageType = {
  title: string;
  tag?: string;
  create_time?: number;
  list?: MessageItemType[];
};

export type MessageAttriType = Partial<
  Omit<MessageType, "list" | "create_time">
>;

export type MessageListType = Record<MessageId, MessageType>;

export type UseMessageType = {
  /** 当前对话id */
  currentId?: MessageId;
  /** 会话列表 */
  message?: MessageListType;
  /** 初始化设置 */
  init: () => void;
  /** 创建会话 */
  createMessage: () => MessageId;
  /** 更新创建会话 */
  updateMessage: (message: MessageItemType, messageId?: MessageId) => Boolean;
  /** 更新标题 */
  updateAttribute: (messageId?: MessageId, attr?: MessageAttriType) => Boolean;
  /** 获取所有标题 */
  getTitles: () => {
    label?: string;
    value?: string;
    tag?: string;
    key?: string;
    create_time?: number;
  }[];
  // 获取会话
  getMessage: (messageId?: MessageId) => undefined | MessageType;
  /** 删除绘画 */
  deleteMessage: (messageId?: MessageId) => Boolean;
  /** 设置当前ID */
  updateId: (id?: MessageId) => Boolean;
  /** 全部清空会话 */
  resetMessage: () => void;
};

const MessageKey = "__hehejie_local_storage_message";

const saveMessage = (message?: MessageListType) => {
  if (!message) {
    return;
  }
  localForage.setItem(MessageKey, message);
};

export const useMessageStore = create<UseMessageType>((set, get) => ({
  currentId: undefined,
  message: undefined,
  init: () => {
    // 设置历史的列表和第一个id
    localForage.getItem(MessageKey).then((res) => {
      const currentId = Object.keys(res || {})?.[0];
      set({ currentId, message: res as MessageListType });
    });
  },
  createMessage: () => {
    const { message: prevMessage = {} } = get() || {};
    const _id = uuidv4();

    const newMessage = {
      ...(prevMessage || {}),
      [_id]: {
        title: "新建问题",
        tag: "default",
        create_time: dayjs().valueOf(),
        list: [],
      },
    };
    saveMessage(newMessage);
    set({ currentId: _id, message: newMessage });
    return _id;
  },
  updateMessage: (message: MessageItemType, messageId?: MessageId) => {
    const { currentId, message: prevMessage = {} } = get();
    let _id = messageId || currentId;
    let _currentId = currentId;

    if (!_id) {
      _id = uuidv4();
      _currentId = _id;
    }

    const currentMessage = prevMessage?.[_id] || {
      title: "新建问题",
      tag: "default",
      create_time: dayjs().valueOf(),
      list: [],
    };

    if (!currentMessage.list || currentMessage.list.length <= 0) {
      currentMessage.title = message.content?.slice(0, 20) || "新建问题";
      currentMessage.list = [message];
    } else {
      currentMessage.list.push(message);
    }

    const newMessage = {
      ...(prevMessage || {}),
      [_id]: currentMessage,
    };
    saveMessage(newMessage);
    set({ currentId: _currentId, message: newMessage });
    return true;
  },
  updateAttribute: (messageId?: MessageId, attr?: MessageAttriType) => {
    const { currentId, message: prevMessage = {} } = get();
    const _id = messageId || currentId || "";
    const currentMessage = prevMessage[_id];

    if (!currentMessage) {
      return false;
    }

    const newMessage = {
      ...(prevMessage || {}),
      [_id]: {
        ...currentMessage,
        ...(attr || {}),
      },
    };
    saveMessage(newMessage);
    set({ message: newMessage });
    return true;
  },
  getTitles: () => {
    const prevMessage = get().message || [];

    return Object.entries(prevMessage || {}).map(([key, val]) => ({
      label: val.title,
      value: key,
      key,
      tag: val.tag,
      create_time: val.create_time,
    }));
  },
  getMessage: (messageId?: MessageId) => {
    const { currentId, message: prevMessage } = get();
    const _id = messageId || currentId;
    if (!_id) {
      return;
    }
    return prevMessage?.[_id];
  },
  deleteMessage: (messageId?: MessageId) => {
    const { message: prevMessage } = get();

    if (!messageId || !prevMessage?.[messageId]) {
      return false;
    }

    delete prevMessage?.[messageId];
    saveMessage(prevMessage);
    set({ message: prevMessage });
    return true;
  },
  updateId: (id?: MessageId) => {
    set({ currentId: id });
    return true;
  },
  resetMessage: () => {
    localForage.removeItem(MessageKey);
    set({});
  },
}));
