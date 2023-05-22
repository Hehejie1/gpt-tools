import CryptoJS from 'crypto-js'
import { parse, stringify } from './json'

export const encode = (
  data: string | Record<string, any>,
  key?: string,
  iv?: string
) => {
  const _key = CryptoJS.enc.Base64.parse(key || '1234123412ABCDEF')
  const _iv = CryptoJS.enc.Base64.parse(iv || 'ABCDEF1234123412')
  const _data = typeof data === 'string' ? data : stringify(data)
  const result = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(_data), _key, {
    iv: _iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  })
  const encryptedBase64Data = CryptoJS.enc.Base64.stringify(result.ciphertext)
  return encodeURIComponent(encryptedBase64Data)
}

export const decode = (data: string, key?: string, iv?: string) => {
  const _key = CryptoJS.enc.Base64.parse(key || '1234123412ABCDEF')
  const _iv = CryptoJS.enc.Base64.parse(iv || 'ABCDEF1234123412')
  const encryptedHexStr = CryptoJS.enc.Base64.parse(decodeURIComponent(data))
  const _data = CryptoJS.enc.Base64.stringify(encryptedHexStr)

  const decrypt = CryptoJS.AES.decrypt(_data, _key, {
    iv: _iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  })
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8).toString()
  return parse(decryptedStr, decryptedStr)
}
