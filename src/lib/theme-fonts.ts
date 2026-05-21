import { Cormorant_Garamond, Inter, Playfair_Display } from 'next/font/google'
import type { Theme } from '@/contexts/theme-config'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' })
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

export function themeFontClasses(theme: Theme): { htmlVariables: string; bodyClassName: string } {
  switch (theme) {
    case 'botanical':
      return { htmlVariables: `${cormorant.variable} ${inter.variable}`, bodyClassName: inter.className }
    case 'modern-garden':
    case 'heirloom':
    default:
      return { htmlVariables: `${inter.variable} ${playfair.variable}`, bodyClassName: inter.className }
  }
}
