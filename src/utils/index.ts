import _ from 'lodash'
import { BigNumber } from 'bignumber.js'
import { ethers } from 'ethers'
import dayjs from 'dayjs'

const randomCoding = function (num: number) {
  var arr = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
  ]
  var idvalue = ''
  for (var i = 0; i < num; i++) {
    idvalue += arr[Math.floor(Math.random() * 36)]
  }
  return idvalue
}

const aPush = (push: string) => {
  return push
}

const replaceAllStr = (str: any, find: any, replace: any) => {
  return str.replace(new RegExp(find, 'g'), replace)
}

const whitelistFiltre = (value: any, arr = []) => {
  console.log(value, 'value')
  const valstr = value.join()
  const str = replaceAllStr(
    replaceAllStr(replaceAllStr(valstr, /[(\r\n)\r\n]+/, ','), '，', ','),
    ' ',
    ','
  )
  const maxArr = arr.map((item: any) => {
    return item.slice(0, 2) === '0x' ? _.toLower(item) : '0x' + _.toLower(item)
  })
  const arrList = _.toLower(str)
    .split(',')
    .filter((item: any) => item !== '')
    .map((ele: any) => {
      return ele.slice(0, 2) === '0x' ? ele : '0x' + ele
    })
  const dataList = [...arrList, ...maxArr]
  return _.orderBy(_.uniq(dataList))
  // return _.uniq(arrList);
}

const arrConversion = (val: any[]) => {
  if (!val || val.length === 0) return []
  const arr: any = []
  val.forEach((item) => {
    arr.push([item])
  })
  return arr
}

const oninputNum = (
  val: string | number,
  position: number = 0,
  min: number = 0,
  max: number = Infinity
): number => {
  console.log(min, 'min')
  let numberVal = typeof val === 'string' ? parseFloat(val) : val
  numberVal = isNaN(numberVal) ? min : numberVal
  numberVal = Math.max(min, Math.min(numberVal, max))
  if (numberVal.toString().indexOf('.') > 0) {
    const safePosition = Math.max(0, Math.floor(position))
    const formattedVal = numberVal.toFixed(safePosition)
    numberVal = parseFloat(formattedVal)
  }
  return numberVal
}

const minusOthers = (
  initNum: number,
  aNum: number = 0,
  bNum: number = 0,
  cNum: number = 0
) => {
  return new BigNumber(initNum).minus(aNum).minus(bNum).minus(cNum).toNumber()
}

const plusOthers = (
  initNum: number,
  aNum: number = 0,
  bNum: number = 0,
  cNum: number = 0
) => {
  return new BigNumber(initNum).plus(aNum).plus(bNum).plus(cNum).toNumber()
}

const truncateString = (str: string, maxLength: number = 30) => {
  if (str && str.length > maxLength) {
    return str.slice(0, maxLength) + '...'
  } else {
    return str
  }
}

const formatNumberWithCommas = (number: number, num: number = 0) => {
  let parts = number.toFixed(num).split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.').replace('.0', '')
}

const bigNumFormat = (num: number, fix: number = 2, min: number = 0) => {
  if (!num || Number(num) <= 0) {
    return '0'
  }
  if (new BigNumber(num).lt(min)) {
    return '< ' + min
  }
  const fmt = {
    prefix: '',
    decimalSeparator: '.',
    groupSeparator: ',',
    groupSize: 3,
  }
  return new BigNumber(num).dp(fix).toFormat(fmt)
}

const ellipsis = (val: string, sta: number = 2, end: number = 4): string => {
  if (!val) return ''
  if (val.length > sta + end) {
    return `${val.slice(0, sta)}...${val.slice(-end)}`
  }
  return val
}

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    return false
  }
}

const countdown = (time: number) => {
  const timeObj = {
    h: Math.floor(time / 3600),
    m: Math.floor((time % 3600) / 60),
    s: time % 60,
  }
  return timeObj
}

const filterHash = (val: string) => {
  if (val === '') return ''
  return val.slice(0, 2) === '0x' ? val.toLowerCase() : '0x' + val.toLowerCase()
}

const bigNumTimes = (val: any, num: number = 100) => {
  if (!val) return 0
  return new BigNumber(val).times(num).toString()
}

const objListIsEqual = (
  list: any[],
  key: string,
  value: string,
  itemData: any,
  itemVal: number
) => {
  const processedList = list.map((item) => ({
    key: item[key].toLowerCase().startsWith('0x')
      ? item[key].toLowerCase()
      : '0x' + item[key].toLowerCase(),
    value: item[value],
  }))

  const processedData = {
    key: itemData[key].toLowerCase().startsWith('0x')
      ? itemData[key].toLowerCase()
      : '0x' + itemData[key].toLowerCase(),
    value: itemVal,
  }

  return processedList.some((obj) => _.isEqual(obj, processedData))
}

const keyListEqual = (dataList: any[], key: string, val: string) => {
  const addressList = dataList.map((item: any) => {
    return item[key].toLowerCase().startsWith('0x')
      ? item[key].toLowerCase()
      : '0x' + item[key].toLowerCase()
  })
  const address = val.toLowerCase().startsWith('0x')
    ? val.toLowerCase()
    : '0x' + val.toLowerCase()
  return _.includes(addressList, address)
}

const isErcEq = (arr1: any[], arr2: any[]) => {
  const arr1toLower = arr1.map((item) =>
    _.toLower(item).slice(0, 2) === '0x'
      ? _.toLower(item)
      : '0x' + _.toLower(item)
  )
  const arr2toLower = arr2.map((item) =>
    _.toLower(item).slice(0, 2) === '0x'
      ? _.toLower(item)
      : '0x' + _.toLower(item)
  )
  return _.isEqual(_.sortBy(arr1toLower), _.sortBy(arr2toLower))
}
const isAddress = (address: string) => {
  const strArr = address.match(/^(0x)?[0-9a-fA-F]{40}$/)
  const isAddress = ethers.utils.isAddress(address)
  if (!strArr || !isAddress) {
    return false
  }
  return true
}
const truncateStringCenter = (str: string) => {
  if (str.length > 5) {
    return str.substring(0, 2) + '...' + str.substring(str.length - 3)
  } else {
    return str
  }
}

const splitAddress = (val: string) => {
  if (!val) return ''
  return val.slice(val.length - 4, val.length)
}
const isPositiveIntegerInRange = (
  value: string,
  str: number = 1,
  end: number = 7
) => {
  const isPositiveInteger = /^\d+$/.test(value)
  if (isPositiveInteger) {
    const num = parseInt(value)
    if (num >= str && end <= 7) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}
const addressToLowerCase = (val: string) => {
  if (!val) return ''
  return val.startsWith('0x') ? val.toLowerCase() : '0x' + val.toLowerCase()
}
const timeFormatting = (time: number, type = 0, ms = 0) => {
  if (!time) return ''
  // let utc = require('dayjs/plugin/utc')
  // var timezone = require('dayjs/plugin/timezone')
  // dayjs.extend(utc)
  // dayjs.extend(timezone)
  // dayjs.tz.guess()
  const MyString = new Date().toTimeString()
  const MyOffset = MyString.slice(9, 17)
  if (ms === 0) {
    if (type === 1) {
      return (
        dayjs(Number(time) * 1000).format('DD/MM/YYYY HH:mm:ss ') + MyOffset
      )
    } else {
      return dayjs(Number(time) * 1000).format('DD/MM/YYYY HH:mm:ss ')
    }
  } else {
    if (type === 1) {
      return dayjs(Number(time)).format('DD/MM/YYYY HH:mm:ss ') + MyOffset
    } else {
      return dayjs(Number(time)).format('DD/MM/YYYY HH:mm:ss ')
    }
  }
}

const claimTime = (time: number, type = 1) => {
  const timeNum = type === 1 ? time : Math.floor(time / 1000)
  const h = Math.floor(timeNum / 3600)
  const m = Math.floor((timeNum % 3600) / 60)
  const s = timeNum % 60
  return type === 1 ? h + ' hours:' + m + ' minutes:' + s + ' seconds' : h + ' Hours ' + m + ' Minutes'
}


const itemCompare = (item: number, type = 0, num = 0) => {
  if (type === 0) {
    return item > num
  }
  if (type === 1) {
    return item >= num
  }

  if (type === 2) {
    return item < num
  }
  if (type === 3) {
    return item <= num
  }
  if (type === 4) {
    return item === num
  }
}
const roundToSignificantFigures = (num: number) => {
  if (num === 0) return 1;

  const numDigits = Math.floor(Math.log10(Math.abs(num))) + 1;
  const scale = Math.pow(10, numDigits - 1);
  const result = Math.ceil(num / scale) * scale;

  return result;
}
export {
  randomCoding,
  aPush,
  whitelistFiltre,
  arrConversion,
  oninputNum,
  minusOthers,
  plusOthers,
  truncateString,
  formatNumberWithCommas,
  bigNumFormat,
  ellipsis,
  copyToClipboard,
  countdown,
  filterHash,
  bigNumTimes,
  objListIsEqual,
  keyListEqual,
  isAddress,
  truncateStringCenter,
  splitAddress,
  isPositiveIntegerInRange,
  addressToLowerCase,
  isErcEq,
  timeFormatting,
  claimTime,
  itemCompare,
  roundToSignificantFigures
}
