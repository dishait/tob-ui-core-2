import { computed } from 'vue'
import { simplifyBase } from '../shared/base'

/**
 * 创建圆角
 * @template T
 * @param {import('vue').Prop<T>} props 属性
 * @returns {import('vue').ComputedRef<string>} 圆角
 */
export const createRounded = props => {
	return computed(() => {
		const { rounded } = props
		const inPresets = roundeds.includes(rounded)
		return inPresets
			? simplifyBase('rounded', rounded)
			: rounded
	})
}

/**
 * 圆角集
 */
export const roundeds = [
	'none', // 无
	'sm', // 小
	'base', // 基础
	'md', // 中
	'lg', // 大
	'xl', // 超大
	'2xl', // 超级大
	'3xl', // 无敌大
	'full' // 圆
]
