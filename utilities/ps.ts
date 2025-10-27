import { Ct } from '../assets/themeTypes'

/**
 * Parse styles function - converts space-separated theme keys into React Native style objects
 *
 * @param styleString - Space-separated string of theme keys (e.g., 'bg-1 text-normal f-3')
 * @param ct - Current theme object
 * @returns Merged style object
 *
 * @example
 * ps('bg-1 text-normal f-3 text-md')
 * // Returns: { backgroundColor: "rgb(17, 17, 17)", color: "rgb(185, 185, 185)", fontFamily: 'DM', fontSize: 16 }
 */
export const ps = (styleString: string, ct: Ct) => {
  const styles = styleString
    .split(' ')
    .filter(Boolean)
    .map(className => ct[className as keyof typeof ct])
    .filter(Boolean)

  return Object.assign({}, ...styles)
}
