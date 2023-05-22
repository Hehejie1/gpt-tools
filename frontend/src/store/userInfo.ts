import create from "zustand";

export type UserExtraType = Partial<{
  [key: string]: any;
  real_name: string;
  phone: string;
  desc: string;
  score: number;
}>;

export type UserInfo = Partial<{
  id: number;
  open_id: string; // 微信open_id
  union_id: string; // 微信union_id
  name: string;
  avatar: string; // 头像
  phone: string;
  password: string;
  status: number;
  create_time: Date; // 创建时间
  update_time: Date; // 更新时间
  extra: UserExtraType;
}>;

export type UserInfoType = {
  userInfo?: UserInfo;
  updateUser: (user: UserInfo) => void;
  resetUser: () => void;
};

// 通过 create 方法创建一个具有响应式的 store
export const useUserStore = create<UserInfoType>((set) => ({
  userInfo: undefined,
  updateUser: (user: UserInfo) => set({ userInfo: user }),
  resetUser: () => set({}),
}));
