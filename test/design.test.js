import { reactive } from "vue"
import { createColor, toLightColor, toOriginColor, toOutlineColor, createPresetsWithPrefix, createUnrefFn } from "../src"
import { it, describe, expect, beforeEach } from "vitest";

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
    });
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
        unRefExpect(color).toBe(toOutlineColor('primary', 'btn'))
    })
})
