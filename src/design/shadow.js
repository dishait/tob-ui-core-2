import { computed } from 'vue'
import { simplifyBase } from '../shared/base'

/**
 * 创建阴影
 * @template T
 * @param {import('vue').Prop<T>} props 属性
 * @returns {import('vue').ComputedRef<string>}
 */
export const createShadow = props => {
	return computed(() => {
		const { shadow } = props
		const inPresets = shadows.includes(shadow)
		return inPresets
			? simplifyBase('shadow', shadow)
			: shadow
	})
}

/**
 * 阴影集
 */
const shadows = [
	'none', // 无
	'sm', // 小
	'base', // 基础
	'md', // 中
	'lg', // 大
	'xl' // 超大
]
