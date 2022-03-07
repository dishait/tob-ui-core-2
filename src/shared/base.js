/**
 * @description 杂项
 */
import { is } from './type'

/**
 * 字符串变量替换
 * @param {string} s 源字符串
 * @param {string} n 替换的值
 * @returns {string} 目标字符串
 */
export const variableReplace = (s, n) => {
	if (is('String', s)) {
		return s.replace(/\$/g, n)
	}
	return s
}

/**
 * 空函数
 */
export const noop = () => {}

/**
 * 简化 base
 * @param {string} prefix 前缀
 * @param {string} type 类型
 * @returns {string}
 */
export const simplifyBase = (prefix, type) => {
	const isBase = type === 'base'
	return isBase ? prefix : `${prefix}-${type}`
}

/**
 * 字母表
 */
const urlAlphabet =
	'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'

/**
 *  * nano 唯一id生成器
 * 比传统 uuid 生成快 60%
 *
 * https://github.com/ai/nanoid
 *
 * 默认设置size为21，每秒生成一亿份id，连续工作四个世纪产生一次冲突的概率为 1%。
 * html标签的id属性不能以数字作为前缀，所以以字母作为前缀
 * @param {number} size 尺寸，默认为 21
 * @param {string} prefix 前缀，默认为 T
 * @returns {string} id
 */
export const nanoid = (size = 21, prefix = 'T') => {
	let id = ''
	let i = size
	while (i--) {
		id += urlAlphabet[(Math.random() * 64) | 0]
	}
	return prefix + id
}
