import { reactive } from 'vue'
import {
	createColor,
	toLightColor,
	toOriginColor,
	createShadow,
	createUnrefFn,
	toOutlineColor,
	createPresetsWithPrefix,
	createRounded,
	createSize,
	createFlex
} from '../src'
import { it, describe, expect, beforeEach } from 'vitest'

/**
 * @type {Vi.ExpectStatic}
 */
const unRefExpect = createUnrefFn(expect)

describe('color', () => {
	let props = null
	beforeEach(() => {
		props = reactive({
			color: 'primary'
		})
	})
	it('origin', () => {
		const color = createColor(props)
		unRefExpect(color).toBe(toOriginColor('primary'))
	})

	it('light', () => {
		const color = createColor(props)
		props.light = true
		unRefExpect(color).toBe(toLightColor('primary'))
	})

	it('outline', () => {
		const color = createColor(props)
		props.outline = true
		unRefExpect(color).toBe(toOutlineColor('primary'))
	})

	it('external', () => {
		const color = createColor(props)
		props.color = 'text-white bg-primary'
		unRefExpect(color).toBe('text-white bg-primary')
	})

	it('presets', () => {
		const color = createColor(props, {
			presets: createPresetsWithPrefix('btn')
		})
		unRefExpect(color).toBe('btn-primary')
	})

	it('inject', () => {
		const color = createColor(props, {
			inject: 'btn'
		})
		unRefExpect(color).toBe(toOriginColor('primary', 'btn'))

		props.light = true
		unRefExpect(color).toBe(toLightColor('primary', 'btn'))

		props.outline = true
		unRefExpect(color).toBe(
			toOutlineColor('primary', 'btn')
		)
	})
})

describe('shadow', () => {
	let props = null
	beforeEach(() => {
		props = reactive({
			shadow: 'base'
		})
	})

	it('simplifyBase', () => {
		const shadow = createShadow(props)
		unRefExpect(shadow).toBe('shadow')
	})

	it('origin', () => {
		const shadow = createShadow(props)
		props.shadow = 'sm'
		unRefExpect(shadow).toBe('shadow-sm')
	})
})

describe('rounded', () => {
	let props = null
	beforeEach(() => {
		props = reactive({
			rounded: 'base'
		})
	})

	it('simplifyBase', () => {
		const rounded = createRounded(props)
		unRefExpect(rounded).toBe('rounded')
	})

	it('origin', () => {
		const rounded = createRounded(props)
		props.rounded = 'sm'
		unRefExpect(rounded).toBe('rounded-sm')
	})
})

describe('size', () => {
	let props = null
	beforeEach(() => {
		props = reactive({
			size: 'md'
		})
	})

	it('presets', () => {
		const size = createSize(props, {
			presets: {
				md: 'text-md'
			}
		})
		unRefExpect(size).toBe('text-md')
	})

	it('variableReplace', () => {
		const size = createSize(props, {
			presets: {
				md: 'text-$'
			}
		})
		unRefExpect(size).toBe('text-md')
	})
})

describe('flex', () => {
	let props = null
	beforeEach(() => {
		props = reactive({
			justify: 'start',
			align: 'center',
			direction: 'row-reverse'
		})
	})

	it('origin', () => {
		const { justify, align, direction } = createFlex(props)

		unRefExpect(justify).toBe('justify-start')
		unRefExpect(align).toBe('items-center')
		unRefExpect(direction).toBe('flex-row-reverse')
	})
})
