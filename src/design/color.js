import { computed } from 'vue'
import { not, showType } from '../shared/type'
import { variableReplace } from '../shared/base'

/**
 * 创建颜色
 * @template T
 * @param {import('vue').Prop<T>} props 属性
 * @param {{ presets: Record<string, string>, inject: string }} opts 配置
 * @returns {import('vue').ComputedRef<string>} 颜色
 */
export const createColor = (props, opts = {}) => {
	typeIntercept(opts)

	const { presets = null, inject = '' } = opts || {}

	return computed(() => {
		const {
			color = '',
			light = false,
			outline = false
		} = props

		// 无外部预设时，运行设计
		if (!presets) {
			const shouldRunDesign = colors.includes(color)
			const opts = { color, light, outline, inject }
			return shouldRunDesign ? design(opts) : color
		}

		// 有外部预设时，运行外部预设
		const inPresets = Boolean(presets[color])
		return inPresets
			? variableReplace(presets[color], color)
			: color
	})
}

/**
 * 颜色集
 */
export const colors = [
	'primary', // 主要
	'secondary', // 次要
	'accent', // 强调
	'neutral', // 中和
	'base', // 基础
	'info', // 信息
	'success', // 成功
	'warning', // 警告
	'error' // 错误
]

// 内部设计
const design = (opts = {}) => {
	const { color, light, outline, inject } = opts

	// 轮廓
	if (outline) {
		return toOutlineColor(color, inject)
	}

	// 高亮
	if (light) {
		return toLightColor(color, inject)
	}

	// 基础
	return toOriginColor(color, inject)
}

/**
 * 转换为原色
 * @param {string} color 颜色
 * @param {string | undefined} inject 注入
 * @returns {string} 原色
 */
export const toOriginColor = (color, inject) => {
	let prefix = ''
	if (inject) {
		prefix = `${inject}-${color} `
	}
	return prefix + `text-white bg-${color} bg-opacity-100`
}

/**
 * 转换为高亮色
 * @param {string} color 颜色
 * @param {string | undefined} inject 注入
 * @returns {string} 高亮色
 */
export const toLightColor = (color, inject) => {
	let prefix = ''
	if (inject) {
		prefix = `${inject}-${color} ${inject}-light `
	}
	return prefix + `text-${color} bg-${color} bg-opacity-10`
}

/**
 * 转换为轮廓色
 * @param {string} color 颜色
 * @param {string | undefined} inject 注入
 * @returns {string} 轮廓色
 */
export const toOutlineColor = (color, inject) => {
	let prefix = ''
	if (inject) {
		prefix = `${inject}-${color} ${inject}-outline `
	}
	return (
		prefix +
		`text-${color} border border-${color} bg-transparent`
	)
}

// 类型拦截
const typeIntercept = (opts = {}) => {
	const { presets = null } = opts

	if (not('Null', presets) && not('Object', presets)) {
		const type = showType(presets)
		const msg = `createColor 的配置 presets 期望是 Object 类型，但却得到了 ${type} 类型`
		throw new Error(msg)
	}
}

/**
 * 创建带前缀的颜色预设
 * @param {string} prefix 前缀
 * @returns {Record<string, string>} 颜色预设
 */
export const createPresetsWithPrefix = prefix => {
	const presets = {}
	colors.forEach(
		color => (presets[color] = `${prefix}-${color}`)
	)
	return presets
}
