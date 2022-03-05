/**
 * @description 类型
 * @typedef {import('vue').Ref<any> | any} maybeAnyRef
 */

import { createUnrefFn } from './composables'

/**
 * 类型判断
 * @param {string} t 类型
 * @param {maybeAnyRef} v 值
 * @returns {boolean} 类型是否相等
 */
export const is = (t, v) => showType(v) === t

/**
 * 类型判断(非)
 * @param {string} t 类型
 * @param {maybeAnyRef} v 值
 * @returns {boolean} 类型是否不相等
 */
export const not = (t, v) => !is(t, v)


/**
 * 类型获取
 * @param {maybeAnyRef} v 值
 * @returns {string} 具体类型
 */
export const showType = createUnrefFn(v => {
    const origin = Object.prototype.toString.call(v)
    return origin.slice(8, -1)
})
