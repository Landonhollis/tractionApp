import { Ct, allThemes } from '../assets/themeObjects'

// Global ct singleton - set by AccountProvider
let globalCt: Ct = allThemes['theme1'] as Ct

export const setGlobalCt = (ct: Ct) => {
  globalCt = ct
}

export const ps = (styleString: string) => {
  const styles = styleString
    .split(' ')
    .filter(Boolean)
    .map(className => globalCt[className as keyof typeof globalCt])
    .filter(Boolean)

  return Object.assign({}, ...styles)
}
