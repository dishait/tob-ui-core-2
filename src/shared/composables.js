/**
 * @description 自定义的基础 composition-api
 */

import {
	ref,
	watch,
	unref,
	computed,
	getCurrentInstance
} from 'vue'

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

/**
 * 使用 v-model
 * @template T
 * @param {import('vue').Prop<T>} props 属性
 * @param {string} key 键值
 * @param {any} emit 发射
 * @param {{ eventName: string, deep: boolean, passive: false }} options
 * @returns {import('vue').ComputedRef<R>}
 */
export const useVModel = (
	props,
	key = 'modelValue',
	emit,
	options = {}
) => {
	const {
		eventName,
		deep = false,
		passive = false
	} = options

	const vm = getCurrentInstance()

	// 获取 emit
	const _emit = emit || vm?.emit || vm?.$emit?.bind(vm)

	// 获取事件名
	let event = eventName || `update:${key}`

	if (passive) {
		const proxy = ref(props[key])

		watch(
			() => props[key],
			v => (proxy.value = v)
		)

		watch(
			proxy,
			v => {
				if (v !== props[key] || deep) _emit(event, v)
			},
			{
				deep
			}
		)

		return proxy
	} else {
		return computed({
			get() {
				return props[key]
			},
			set(value) {
				_emit(event, value)
			}
		})
	}
}

/**
 * 使用多个 v-model
 * @template T, R
 * @param {import('vue').Prop<T>} props 属性
 * @param {any} emit 发射
 * @param {{ eventName: string, deep: boolean, passive: false }} options
 * @returns {Record<string, import('vue').ComputedRef<R>>}
 */
export const useVModels = (props, emit, options = {}) => {
	const ret = {}
	for (const key in props) {
		ret[key] = useVModel(props, key, emit, options)
	}
	return ret
}
