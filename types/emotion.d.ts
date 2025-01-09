import type { Theme as EmotionTheme } from '@emotion/react'

declare module '@emotion/react' {
  export interface Theme extends EmotionTheme {
    namespace: string
    colors: {
      white: string
      black: string
      primary: string
    }
  }
}
