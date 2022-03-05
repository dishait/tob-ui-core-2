import { computed } from 'vue'

/**
 * @typedef {Object} IFlex
 * @property {import('vue').ComputedRef<string>} justify
 * @property {import('vue').ComputedRef<string>} align
 * @property {import('vue').ComputedRef<string>} direction
 */

/**
 * 创建 flex
 * @template T
 * @param {import('vue').Prop<T>} props 属性
 * @returns {IFlex} flex 对象
 */
export const createFlex = props => {
	const _justify = computed(() => {
		const { justify } = props
		return justifys[justify] || justify
	})

	const align = computed(() => {
		const { align } = props
		return aligns[align] || align
	})

	const _direction = computed(() => {
		const { direction } = props
		return directions[direction] || direction
	})

	return {
		justify: _justify,
		align: align,
		direction: _direction
	}
}

/**
 * 主轴集
 */
export const justifys = {
	end: 'justify-end', // 尾部
	start: 'justify-start', // 头部
	center: 'justify-center', // 中间
	around: 'justify-around', // 等比
	evenly: 'justify-evenly', // 等距
	between: 'justify-between' // 靠两头
}

/**
 * 交叉轴集
 */
export const aligns = {
	end: 'items-flex-end', // 尾部
	center: 'items-center', // 中间
	stretch: 'items-stretch', // 填充
	start: 'items-flex-start', // 头部
	baseline: 'items-baseline' // 基线对齐
}

/**
 * 方向集
 */
export const directions = {
	row: 'flex-row',
	col: 'flex-col',
	'row-reverse': 'flex-row-reverse',
	'col-reverse': 'flex-col-reverse'
}
