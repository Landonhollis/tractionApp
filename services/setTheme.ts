import { updateThemeName } from './accountProviderServices'
import { Ctn } from '../assets/themeTypes'

/**
 * Updates the theme in the database
 *
 * @param themeName - The name of the theme to set
 */
export const setTheme = async (themeName: Ctn) => {
  try {
    await updateThemeName(themeName)
  } catch (error) {
    console.log('Error updating theme name:', error)
  }
}
