export const models = [
  { label: "gpt-4-32k-0314", value: "GPT432K0314" },
  { label: "gpt-4-32k", value: "GPT432K" },
  { label: "gpt-4-0314", value: "GPT40314" },
  { label: "gpt-4", value: "GPT4" },
  { label: "gpt-4-mobile", value: "GPT4-mobile" },
  { label: "gpt-3.5-turbo-0301", value: "GPT3Dot5Turbo0301" },
  { label: "gpt-3.5-turbo", value: "GPT3Dot5Turbo" },
  { label: "text-davinci-003", value: "GPT3TextDavinci003" },
  { label: "text-davinci-002", value: "GPT3TextDavinci002" },
  { label: "text-curie-001", value: "GPT3TextCurie001" },
  { label: "text-babbage-001", value: "GPT3TextBabbage001" },
  { label: "text-ada-001", value: "GPT3TextAda001" },
  { label: "text-davinci-001", value: "GPT3TextDavinci001" },
  { label: "davinci-instruct-beta", value: "GPT3DavinciInstructBeta" },
  { label: "davinci", value: "GPT3Davinci" },
  { label: "curie-instruct-beta", value: "GPT3CurieInstructBeta" },
  { label: "curie", value: "GPT3Curie" },
  { label: "ada", value: "GPT3Ada" },
  { label: "babbage", value: "GPT3Babbage" },
].map((item) => ({ label: item.value, value: item.label }));

export enum RoleType {
  /** 系统预置的信息，用户不可见 */
  System = 'system',
  /** 用户发送信息 */
  User = 'user',
  /** chatgpt回复信息 */
  Assistant = 'assistant'
}