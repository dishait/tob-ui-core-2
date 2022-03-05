/**
 * @description 自定义的基础 composition-api
 */

import { unref } from 'vue'

/**
 * 创建解 ref 函数
 * @template T, R
 * @param {(...arg: (T | import('vue').Ref<T>)[]) => R} fn
 * @returns {(...arg: T[]) => R}
 */
export const createUnrefFn = fn => {
	return function (...args) {
		return fn.apply(
			this,
			// 解除所有 ref 的参数
			args.map(v => unref(v))
		)
	}
}
