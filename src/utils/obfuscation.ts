import { encode, decode } from 'js-base64'

function isPrintable(str:string) {
  // 检查是否为可打印字符
  return /^[\x20-\x7E]*$/.test(str);
}
export const toEncode = (str: string) => {
  if(str === '') return ''
  return encode(str)
}

export const toDecode = (str: string) => {
  if(str === '') return ''
  try {
    const decodedStr = decode(str)
    if (isPrintable(decodedStr)) {
      return decodedStr
    }
    throw new Error("Decoded failed");
  } catch (e) {
    console.error(e)
    throw e
  }
}