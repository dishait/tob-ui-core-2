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
