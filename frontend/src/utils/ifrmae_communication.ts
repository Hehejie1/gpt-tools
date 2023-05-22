/* eslint-disable no-underscore-dangle */
const genCallbackId = (type: string): string =>
  `${type}_${Date.now().toString(16)}-${Math.random()
    .toString()
    .replace('.', '')}`

export interface Options {
  targetWindow: Window
  targetOrigin?: string
  currentWindow?: Window
}

export enum ResponseCodeType {
  SUCCESS = 0,
  FAIL = 1,
  TIMEOUT = 99,
}

interface PostDataType {
  type: string
  params?: Record<string, any>
  callbackId: string
}

interface ResponseDataType {
  code: ResponseCodeType
  message: string
  data: any
}

export type EventListenerType = (event: MessageEvent) => void

export default class IframeCommunication {
  private _listenersCache: Array<EventListenerType>

  private _options: Options

  private _currentWindow: Window

  constructor(options: Options) {
    this._options = options || {}
    this._currentWindow = this._options.currentWindow || window
    this._listenersCache = []
  }

  // 发起一个调用
  call(
    type: string,
    params?: Record<string, any> | undefined,
    options?: { timeout?: number }
  ): Promise<ResponseDataType> {
    return new Promise((resolve) => {
      let timeoutTimer: ReturnType<typeof setTimeout> = setTimeout(() => '', 0)
      const callbackId = genCallbackId(type)
      const postData: PostDataType = { type, callbackId }

      postData.params = {
        isNewVersion: true, // 是否是新版本， 在on函数中需要区分
        ...params,
      }

      // 是否限制目标窗口origin
      const isLimitOrigin = Boolean(this._options.targetOrigin)

      this._options.targetWindow.postMessage(
        postData,
        this._options.targetOrigin || '*'
      )

      const onCallback = (event: MessageEvent<any>): void => {
        const { data, origin } = event
        if (!data || !origin || data.callbackId !== callbackId) {
          return
        }
        // 如果需要限制收到消息的origin
        if (isLimitOrigin && origin !== this._options.targetOrigin) {
          return
        }
        clearTimeout(timeoutTimer)
        resolve(data.result)
        this._removeEvent(onCallback)
      }
      this._addEvent(onCallback)
      // 如果超时了, 响应失败并移除监听
      if (options?.timeout) {
        timeoutTimer = setTimeout(() => {
          resolve({
            code: ResponseCodeType.TIMEOUT,
            data: null,
            message: 'timeout',
          })
          this._removeEvent(onCallback)
        }, options?.timeout)
      }
    })
  }

  // 监听目标window的调用
  on(type: string, handler: (params: Record<string, any>) => any): () => void {
    const messageHandler = async (event: MessageEvent): Promise<void> => {
      const { data, origin } = event
      // 是否限制目标窗口origin
      const isLimitOrigin = Boolean(this._options.targetOrigin)
      if (
        (isLimitOrigin && origin !== this._options.targetOrigin) ||
        data.type !== type
      ) {
        return
      }
      const { params, callbackId } = data

      // 是否新版本，需要兼容旧版本的call
      const isNewVersion = typeof params === 'object' && params.isNewVersion

      let parseParams = params

      try {
        if (!isNewVersion) {
          parseParams = params ? JSON.parse(params) : {}
        }
      } catch (e) {
        console.error('parse params error')
      }

      const send = (result: ResponseDataType): void => {
        this._options.targetWindow.postMessage(
          {
            callbackId,
            result: isNewVersion ? result : JSON.stringify(result),
          },
          origin
        )
      }
      try {
        const result = await handler(parseParams || {})
        send({
          code: ResponseCodeType.SUCCESS,
          data: result,
          message: 'success',
        })
      } catch (e: any) {
        send({
          code: ResponseCodeType.FAIL,
          data: null,
          message: e.message,
        })
      }
    }

    return this._addEvent(messageHandler)
  }

  // 销毁sdk，移除所有监听
  destroy(): void {
    this._listenersCache.forEach((listener) => {
      this._currentWindow.removeEventListener('message', listener)
    })

    this._listenersCache = []
  }

  private _removeEvent(messageHandler: EventListenerType): void {
    this._currentWindow.removeEventListener('message', messageHandler)
    const targetIndex = this._listenersCache.findIndex(
      (listener) => listener === messageHandler
    )
    if (targetIndex >= 0) {
      this._listenersCache.splice(targetIndex, 1)
    }
  }

  private _addEvent(messageHandler: EventListenerType): () => void {
    this._listenersCache.push(messageHandler)
    this._currentWindow.addEventListener('message', messageHandler)
    return (): void => {
      this._removeEvent(messageHandler)
    }
  }
}
