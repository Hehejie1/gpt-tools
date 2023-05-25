import create from "zustand";
import localForage from "localforage";

export type ConfigInfo = Partial<{
  sk: string;
  model: string;
  theme: "dark" | "light";
  /** 代理地址 */
  proxy: string;
}>;

export type UseConfigType = {
  config?: ConfigInfo;
  /** 初始化获取缓存 */
  init: () => void;
  updateConfig: (config: ConfigInfo) => void;
  resetConfig: () => void;
};

const InitConfig: ConfigInfo = {
  model: "gpt-3.5-turbo",
  theme: "dark",
};

const ConfigKey = "__hehejie_local_storage_config";
const saveConfig = (config?: ConfigInfo) => {
  if (!config) {
    return;
  }
  localForage.setItem(ConfigKey, config);
};

export const useConfigStore = create<UseConfigType>((set, get) => ({
  config: InitConfig,
  init: () => {
    localForage.getItem(ConfigKey).then((res) => {
      if (!res) {
        return;
      }
      set({ config: res as ConfigInfo });
    });
  },
  updateConfig: (config: ConfigInfo) => {
    const prevConfig = get().config;
    const newConfig = {
      ...(prevConfig || {}),
      ...(config || {}),
    };

    saveConfig(newConfig);
    set({
      config: newConfig,
    });
  },
  resetConfig: () => {
    saveConfig(InitConfig);
    set({ config: InitConfig });
  },
}));
