import { computed } from 'vue'
import { variableReplace } from '../shared/base'

/**
 * 创建尺寸
 * @template T
 * @param {import('vue').Prop<T>} props 属性
 * @param {{ presets: Record<string, string>}} opts 配置
 * @returns {import('vue').ComputedRef<string>} 尺寸
 */
export const createSize = (props, opts = {}) => {
	const { presets } = opts
	return computed(() => {
		const { size = 'md' } = props
		return presets[size]
			? variableReplace(presets[size], size)
			: size
	})
}
