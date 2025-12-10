import { ref, watch, computed } from 'vue'
import tinycolor from 'tinycolor2'

const REFERENCE_PRIMARY = '#2A947D'

const defaultSemantic = {
  info: '#2080F0',    // 蓝色
  success: '#18a058', // 绿色
  warning: '#f0a020', // 橙色
  error: '#d03050',   // 红色
}

function calculateSLOffset(targetColorStr, baseColorStr) {
  const target = tinycolor(targetColorStr).toHsl()
  const base = tinycolor(baseColorStr).toHsl()
  return {
    s: target.s - base.s,
    l: target.l - base.l
  }
}

const semanticOffsets = {
  info: calculateSLOffset(defaultSemantic.info, REFERENCE_PRIMARY),
  success: calculateSLOffset(defaultSemantic.success, REFERENCE_PRIMARY),
  warning: calculateSLOffset(defaultSemantic.warning, REFERENCE_PRIMARY),
  error: calculateSLOffset(defaultSemantic.error, REFERENCE_PRIMARY),
}

// Custom Naive UI (Color, Hover, Pressed, Suppl)
function generatePalette(name, colorStr) {
  const c = tinycolor(colorStr)
  const actionFactor = 10 
  
  return {
    [`${name}Color`]: colorStr,
    [`${name}ColorHover`]: c.clone().lighten(actionFactor).toString(),
    [`${name}ColorPressed`]: c.clone().darken(actionFactor).toString(),
    [`${name}ColorSuppl`]: c.clone().lighten(actionFactor + 10).toString()
  }
}

const primaryColor = ref(localStorage.getItem('theme-color') || REFERENCE_PRIMARY)

const themeOverrides = computed(() => {
  const currentPrimary = primaryColor.value
  const primaryHsl = tinycolor(currentPrimary).toHsl()

  const createSyncedSemantic = (semType) => {
    const offset = semanticOffsets[semType]
    const originalSemanticHsl = tinycolor(defaultSemantic[semType]).toHsl()

    const newColor = tinycolor({
      h: originalSemanticHsl.h, 
      
      s: Math.min(1, Math.max(0, primaryHsl.s + offset.s)), 
      
      l: Math.min(1, Math.max(0, primaryHsl.l + offset.l))  
    })

    return generatePalette(semType, newColor.toString())
  }

  return {
    common: {
      // 1. generate primary custom color
      ...generatePalette('primary', currentPrimary),

    //   ...createSyncedSemantic('info'),
    //   ...createSyncedSemantic('success'),
    //   ...createSyncedSemantic('warning'),
    //   ...createSyncedSemantic('error'),
    }
  }
})

watch(primaryColor, (val) => {
  localStorage.setItem('theme-color', val)
})


export function customColorTheme() {
  const setPrimaryColor = (val) => {
    primaryColor.value = val
  }

  return { primaryColor, themeOverrides, setPrimaryColor }
}